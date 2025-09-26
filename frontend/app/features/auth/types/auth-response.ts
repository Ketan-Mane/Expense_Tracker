import type { User } from "~/schemas/auth/user";
import type { ApiResponse } from "~/types/api-response";

export type LoginResponse = ApiResponse<{ user: User; accessToken: string }>;

export type SignupResponse = ApiResponse<{ user: User }>;
