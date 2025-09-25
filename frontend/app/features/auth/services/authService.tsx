import axiosInstance from "~/axios/axiosInstance";

export const login = async ({ email, password }: { email: string; password: string }) => {
	const { data } = await axiosInstance.post("/auth/login", {
		email,
		password,
	});
	return data;
};
