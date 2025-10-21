import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '~/features/auth/hooks/useAuth';

const ProtectedLayout = () => {
	const { isLoggedIn } = useAuth();
	const location = useLocation();

	return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} />;
};

export default ProtectedLayout;
