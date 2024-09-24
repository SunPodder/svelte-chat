import { db } from "./db";
import type e from "express";
import { Sessions, Users } from "./schema";
import { eq } from "drizzle-orm";

export async function VerifySession(
	req: e.Request,
	res: e.Response,
	next: e.NextFunction,
) {
	if (req.url === "/login" || req.url === "/register") {
		next();
		return;
	}

	const token = req.cookies["session"];
	if (!token) {
		res.status(401).send("Unauthorized");
		return;
	}
	const session = (
		await db.select().from(Sessions).where(eq(Sessions.id, token))
	)[0];

	if (!session) {
		res.status(401).send("Unauthorized");
		return;
	}
	// @ts-ignore
	req.user = (
		await db.select().from(Users).where(eq(Users.id, session.user_id))
	)[0];
	next();
}
