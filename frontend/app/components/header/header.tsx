import { Button } from '../ui/button';
import { Settings } from 'lucide-react';
import LogoutButton from '~/features/auth/components/Logout';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store/store';
import { Link } from 'react-router';

const Header = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	if (!isLoggedIn) return null;

	return (
		<header className="border-b bg-card">
			<div className="container mx-auto px-4 py-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">
							<Link to="/">
								Expense <span className="text-purple-600">Tracker</span>
							</Link>
						</h1>
						<p className="text-muted-foreground">Manage your finances with ease</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" asChild>
							<Link to="settings">
								<Settings className="h-4 w-4 mr-2" />
								Settings
							</Link>
						</Button>
						{user && (
							<Avatar>
								<AvatarImage src={user?.avatarUrl} />
								<AvatarFallback>{user.name[0]}</AvatarFallback>
							</Avatar>
						)}
						<LogoutButton />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
