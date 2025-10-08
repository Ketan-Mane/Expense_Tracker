import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import ListTransactions from "./ListTransactions";

export function RecentTransactions() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Transactions</CardTitle>
				<CardDescription>Your latest financial activity</CardDescription>
			</CardHeader>
			<CardContent>
				<ListTransactions />
			</CardContent>
		</Card>
	);
}
