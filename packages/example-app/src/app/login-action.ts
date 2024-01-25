"use server";

import { action } from "@/lib/safe-action";
import { z } from "zod";

const input = z.object({
	username: z.string().min(3).max(10),
	password: z.string().min(8).max(100),
});

export const loginUser = action(input, async ({ username, password }, _ctx, { throwServerValidationError }) => {
	if (username === "johndoe") {
		throwServerValidationError({
			username: ['user_suspended'],
		});
	}

	if (username === "user" && password === "password") {
		return {
			success: true,
		};
	}

	throwServerValidationError({
		username: ['incorrect_credentials'],
    });
});
