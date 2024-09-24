import express from "express";
import { zLoginUser, zRegisterUser } from "../../common/zod_schema";
import { db } from "./db";
import {
	ConversationUsers,
	Conversations,
	Messages,
	Sessions,
	Users,
} from "./schema";
import { and, eq, not } from "drizzle-orm";
const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		zRegisterUser.parse(req.body);

		let user = (await db.insert(Users).values(req.body).returning())[0];
		let session = (
			await db.insert(Sessions).values({ user_id: user.id }).returning()
		)[0];
		delete (user as { password?: string }).password;

		res.cookie("session", session.id, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		res.status(200).send(user);
	} catch (err: any) {
		res.status(400).send(err.errors);
		return;
	}
});

router.post("/login", async (req, res) => {
	try {
		zLoginUser.parse(req.body);

		let user = await db
			.select()
			.from(Users)
			.where(
				and(
					eq(Users.email, req.body.email),
					eq(Users.password, req.body.password),
				),
			);

		if (user.length === 0) {
			throw new Error("Invalid email or password");
		}

		let session = (
			await db
				.insert(Sessions)
				.values({ user_id: user[0].id })
				.returning()
		)[0];

		delete (user[0] as { password?: string }).password;

		res.cookie("session", session.id, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		res.status(200).send(user[0]);
	} catch (error: any) {
		res.status(400).send(error.errors);
	}
});

router.post("/logout", async (req, res) => {
	try {
		await db.delete(Sessions).where(eq(Sessions.id, req.cookies.session));
		res.clearCookie("session");
		res.status(200).send("Logged out");
	} catch (error: any) {
		res.status(400).send(error.errors);
	}
});

router.get("/@:username", async (req, res) => {
	let users = await db
		.select()
		.from(Users)
		.where(eq(Users.username, req.params.username));

	if (users.length === 0) {
		res.status(404).send("User not found");
		return;
	}
	let user = users[0] as { password?: string; email?: string };
	delete user.password;
	delete user.email;

	res.status(200).send(user);
});

router.get("/me", async (req, res) => {
	let user = await db.select().from(Users).where(eq(Users.id, req.user.id));

	if (user.length === 0) {
		res.status(404).send("User not found");
		return;
	}

	delete (user[0] as { password?: string }).password;

	res.status(200).send(user[0]);
});

router.get("/contacts", async (req, res) => {
	let contacts = await db
		.select()
		.from(Users)
		.where(not(eq(Users.id, req.user.id)))
		.limit(10);

	contacts.forEach((contact) => {
		delete (contact as { password?: string }).password;
		delete (contact as { email?: string }).email;
	});

	res.status(200).send(contacts);
});

router.get("/conversations", async (req, res) => {

});

router.post("/conversations/create", async (req, res) => {
	let conversation = (
		await db.insert(Conversations).values({}).returning()
	)[0];

	console.log(conversation.id, req.user.id, req.body.recipient_id);

	let conversationUser = await db.insert(ConversationUsers).values([
		{ conversation_id: conversation.id, user_id: req.user.id },
		{ conversation_id: conversation.id, user_id: req.body.recipient_id },
	]);

	res.status(200).send(conversation);
});

router.get("/messages/:id", async (req, res) => {
	let messages = await db
		.select()
		.from(Messages)
		.where(eq(Messages.conversation_id, req.params.id))
		.limit(20);

	res.status(200).send(messages);
});

export default router;
