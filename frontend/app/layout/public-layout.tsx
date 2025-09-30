import { Navigate, Outlet } from "react-router";
import useAuth from "~/features/auth/hooks/useAuth";

const PublicLayout = () => {
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicLayout;
