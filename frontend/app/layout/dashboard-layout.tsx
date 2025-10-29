import { Outlet } from 'react-router';
import { Navigation } from '~/components/Navigation';

const DashboardLayout = () => {
	return (
		<div className="container mx-auto px-4 py-4 space-y-4">
			<Navigation />
			<Outlet />
		</div>
	);
};
export default DashboardLayout;
