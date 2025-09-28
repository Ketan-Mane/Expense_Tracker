import { Navigate, Outlet } from "react-router";
import useAuth from "~/features/auth/hooks/useAuth";

const ProtectedLayout = () => {
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedLayout;
