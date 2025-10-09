import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import TransactionForm from "./TransactionForm";

const AddTransactionCard = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<PlusCircle className="h-5 w-5" />
					Add New Expense
				</CardTitle>
				<CardDescription>Quickly add a new expense to track your spending</CardDescription>
			</CardHeader>
			<CardContent>
				<TransactionForm />
			</CardContent>
		</Card>
	);
};
export default AddTransactionCard;
