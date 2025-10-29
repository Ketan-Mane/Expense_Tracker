import { Home, Settings, Wallet } from 'lucide-react';
import LogoutButton from '~/features/auth/components/Logout';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store/store';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

const Header = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	if (!isLoggedIn) return null;

	return (
		<header className="border-b bg-card">
			<div className="container mx-auto px-4 py-6">
				<div className="flex items-center justify-between">
					<Link to="/">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
								<Wallet className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl">Expense Tracker</h1>
								<p className="text-xs text-gray-500">Smart Finance Management</p>
							</div>
						</div>
					</Link>

					{/* <div>
						<h1 className="text-3xl font-bold">
							<Link to="/">
								Expense <span className="text-purple-600">Tracker</span>
							</Link>
						</h1>
						<p className="text-muted-foreground">Manage your finances with ease</p>
					</div> */}
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" asChild>
							<Link to="/">
								<Home className="h-4 w-4" />
							</Link>
						</Button>
						<Button variant="outline" size="sm" asChild>
							<Link to="settings">
								<Settings className="h-4 w-4" />
								{/* Settings */}
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
