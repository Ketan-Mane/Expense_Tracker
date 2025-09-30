import axiosInstance from "~/axios/axiosInstance";
import type { LoginResponse, SignupResponse } from "../types/auth-response";
import type { LoginForm } from "../validators/login.validator";
import type { SignupForm } from "../validators/signup.validator";

export const login = async (payload: LoginForm) => {
	const { data } = await axiosInstance.post<LoginResponse>("/auth/login", payload);
	return data;
};

export const signup = async (payload: SignupForm) => {
	const { data } = await axiosInstance.post<SignupResponse>("/auth/signup", payload);
	return data;
};

export const verifyAuth = async () => {
	const { data } = await axiosInstance.get<LoginResponse>("/auth/me");
	return data.data?.user;
};
