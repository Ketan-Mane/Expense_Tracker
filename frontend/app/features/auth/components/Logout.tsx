import { Button } from '~/components/ui/button';
import useLogout from '~/features/auth/hooks/use-logout';

const LogoutButton = () => {
	const { mutateAsync: logout, isPending } = useLogout();

	const handleLogout = () => {
		window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/logout`;
	};

	return (
		<Button variant="destructive" onClick={handleLogout} isProcessing={isPending}>
			Logout
		</Button>
	);
};

export default LogoutButton;
