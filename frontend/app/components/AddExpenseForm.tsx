import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { PlusCircle } from "lucide-react";
import TransactionForm from "~/features/transaction/components/TransactionForm";

export function AddExpenseForm() {
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
}
