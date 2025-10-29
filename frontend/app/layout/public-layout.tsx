import { ArrowRight, LogIn, Wallet } from 'lucide-react';
import { Link, Navigate, Outlet } from 'react-router';
import { Button } from '~/components/ui/button';
import Loading from '~/components/ui/loading';
import useAuth from '~/features/auth/hooks/useAuth';

const PublicLayout = () => {
	const { isLoggedIn, isLoading } = useAuth();

	if (isLoading) {
		return <Loading size="screen" />;
	}

	return isLoggedIn ? (
		<Navigate to="/dashboard" />
	) : (
		<>
			<header className="z-50 border-b backdrop-blur-sm sticky top-0">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
								<Wallet className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl">Expense Tracker</h1>
								<p className="text-xs text-gray-500">Smart Finance Management</p>
							</div>
						</div>

						{/* Navigation */}
						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								size="sm"
								className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all"
								asChild
							>
								<Link to="/login">
									<LogIn className="w-4 h-4 mr-2" />
									Login
								</Link>
							</Button>
							<Button
								size="sm"
								className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
								asChild
							>
								<Link to="/signup">
									Get Started
									<ArrowRight className="ml-2 w-4 h-4" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default PublicLayout;
