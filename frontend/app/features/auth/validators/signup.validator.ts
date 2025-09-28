import z from "zod";

export const SignupSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
	email: z.email("Enter valid email").trim(),
	password: z
		.string()
		.min(
			6,
			"Use a strong password with at least 6 characters, including uppercase, lowercase, a number, and a special symbol.",
		)
		.trim()
		.refine(
			(value) => {
				return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(value);
			},
			{
				message:
					"Use a strong password with at least 6 characters, including uppercase, lowercase, a number, and a special symbol.",
			},
		),
});

export type SignupForm = z.infer<typeof SignupSchema>;
