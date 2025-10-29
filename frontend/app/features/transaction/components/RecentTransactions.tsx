import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import ListTransactions from './ListTransactions';
import useRecentTransactions from '../hooks/use-recent-transactions';

export function RecentTransactions() {
	const { data } = useRecentTransactions();
	const transactions = data?.transactions || [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Transactions</CardTitle>
				<CardDescription>Your latest financial activity</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="w-full overflow-x-auto rounded-md border">
					<ListTransactions transactions={transactions} />
				</div>
			</CardContent>
		</Card>
	);
}
