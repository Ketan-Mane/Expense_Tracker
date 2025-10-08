import { useQuery } from "@tanstack/react-query";
import { verifyAuth } from "../services/authService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
import { useNavigate } from "react-router";

const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data: user } = useQuery({
		queryKey: ["auth"],
		queryFn: verifyAuth,
		retry: false,
	});

	useEffect(() => {
		if (!user) return;

		dispatch(setUser(user));
		navigate("/");
	}, [user]);

	return { isLoggedIn: !!user, user };
};

export default useAuth;
