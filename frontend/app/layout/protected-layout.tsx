import { Navigate, Outlet, useLocation } from 'react-router';
import Loading from '~/components/ui/loading';
import useAuth from '~/features/auth/hooks/useAuth';

const ProtectedLayout = () => {
	const { isLoggedIn, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return <Loading size="screen" />;
	}

	return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} />;
};

export default ProtectedLayout;
