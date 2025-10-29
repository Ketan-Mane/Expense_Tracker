import AddTransactionCard from '~/features/transaction/components/AddTransactionCard';
import { RecentTransactions } from '~/features/transaction/components/RecentTransactions';

const Dashboard = () => {
	return (
		<>
			<RecentTransactions />
			<AddTransactionCard />
		</>
	);
};
export default Dashboard;
