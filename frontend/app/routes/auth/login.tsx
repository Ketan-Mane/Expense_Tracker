import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Login from "~/features/auth/components/login";
import type { RootState } from "~/store/store";

const page = () => {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}

	return <Login />;
};

export default page;
