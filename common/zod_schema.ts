import { z } from "zod";

const zRegisterUser = z.object({
	name: z.object({
		first: z.string().min(2).max(10),
		last: z.string().min(2).max(10),
	}),
	username: z.string().min(3).max(10),
	email: z.string().email(),
	password: z.string().min(8).max(20),
});

const zLoginUser = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(20),
});

export { zRegisterUser, zLoginUser };
