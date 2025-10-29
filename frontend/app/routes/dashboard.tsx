import AddTransactionCard from '~/features/transaction/components/AddTransactionCard';
import { RecentTransactions } from '~/features/transaction/components/RecentTransactions';

const Dashboard = () => {
	return (
		<div className="grid gap-6 lg:grid-cols-3">
			<div className="lg:col-span-2">
				<RecentTransactions />
			</div>
			<div className="space-y-6">
				<AddTransactionCard />
			</div>
		</div>
	);
};
export default Dashboard;
