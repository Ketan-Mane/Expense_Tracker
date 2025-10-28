import { Navigate, Outlet } from 'react-router';
import Loading from '~/components/ui/loading';
import useAuth from '~/features/auth/hooks/useAuth';

const PublicLayout = () => {
	const { isLoggedIn, isLoading } = useAuth();

	if (isLoading) {
		return <Loading size="screen" />;
	}

	return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicLayout;
