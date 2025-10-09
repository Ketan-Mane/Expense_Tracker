import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authService";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "~/features/auth/slices/authSlice";

const useLogout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			dispatch(logoutAction());
			console.log("Logout successful");
			navigate("/login", { replace: true });
		},
		onError: (error: any) => {
			if (error?.response?.status === 401) {
				dispatch(logoutAction());
				console.log("Logout successful");
				navigate("/login", { replace: true });
			}
		},
	});
};
export default useLogout;
