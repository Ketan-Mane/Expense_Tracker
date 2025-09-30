import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
import { useNavigate } from "react-router";

const useLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: login,
		onSuccess: (responseData) => {
			const { data } = responseData;
			if (data?.user === null) return;
			dispatch(setUser(data?.user));
			navigate("/");
		},
		onError: (error) => {
			console.error("Login failed", error);
		},
	});
};

export default useLogin;
