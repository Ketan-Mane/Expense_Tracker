import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
import type { User } from "~/schemas/auth/user";

const useLogin = () => {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: login,
		onSuccess: (responseData) => {
			const { data } = responseData;
			if (data?.user === null) return;
			dispatch(setUser(data?.user));
		},
		onError: (error) => {
			console.error("Login failed", error);
		},
	});
};

export default useLogin;
