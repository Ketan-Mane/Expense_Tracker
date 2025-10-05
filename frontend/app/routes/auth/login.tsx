import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Login from "~/features/auth/components/login";
import type { RootState } from "~/store/store";

export const meta = () => {
	return [
		{ title: "Login - Expense Tracker" },
		{ name: "description", content: "Welcome to React Router! Hello React" },
	];
};

const page = () => {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}

	return <Login />;
};

export default page;
