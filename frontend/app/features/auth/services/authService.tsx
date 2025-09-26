import axiosInstance from "~/axios/axiosInstance";
import type { LoginResponse, SignupResponse } from "../types/auth-response";
import type { LoginForm } from "../validators/login";
import type { SignupForm } from "../validators/signup";

export const login = async (payload: LoginForm) => {
	const { data } = await axiosInstance.post<LoginResponse>("/auth/login", payload);
	return data;
};

export const signup = async (payload: SignupForm) => {
	const { data } = await axiosInstance.post<SignupResponse>("/auth/signup", payload);
	return data;
};
