import { MoreHorizontal } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import useTransactions from "../hooks/use-transactions";
import { formatCurrency } from "~/lib/utils";
import { formatDate } from "date-fns";

const ListTransactions = () => {
	const { data } = useTransactions();
	const transactions = data?.transactions || [];

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Description</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Date</TableHead>
					<TableHead className="text-right">Amount</TableHead>
					<TableHead className="w-[50px]"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{transactions.map((transaction) => (
					<TableRow key={transaction.id}>
						<TableCell className="font-medium">{transaction.item}</TableCell>
						<TableCell>
							<Badge style={{ backgroundColor: transaction.category?.color }}>
								{transaction.category?.name}
							</Badge>
						</TableCell>
						<TableCell className="text-muted-foreground">
							{formatDate(transaction.date!, "dd/MM/yyyy")}
						</TableCell>
						<TableCell
							className={`text-right font-medium ${
								transaction.type === "income" ? "text-green-600" : "text-red-600"
							}`}
						>
							{transaction.type === "income" ? "+" : "-"}
							{formatCurrency(transaction.amount, "INR")}
						</TableCell>
						<TableCell>
							<Button variant="ghost" size="sm">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default ListTransactions;
