import z from 'zod';
import type { MetaData } from '../metadata';

export const UserSchema = z.object({
	id: z.uuidv4(),
	name: z.string().min(2).max(100),
	email: z.email(),
	avatarUrl: z.url().optional(),
	createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
	updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date format' }),
});

export type User = z.infer<typeof UserSchema>;

export type UsersResponse = {
	users: User[];
	metadata: MetaData;
};
