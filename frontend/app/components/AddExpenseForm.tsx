import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import useCategories from "~/features/category/hooks/use-categories";
import type { Category } from "~/features/category/types/category";
import TransactionForm from "~/features/transaction/components/TransactionForm";

export function AddExpenseForm() {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState<Category[]>([]);

	const { data } = useCategories();

	useEffect(() => {
		if (data?.data) {
			setCategories(data?.data);
		}
	}, [data]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!description || !amount || !category) {
			toast.error("Please fill in all fields");
			return;
		}

		// Here you would typically save the expense to your database
		toast.success(`Added expense: ${description} - $${amount}`);

		// Reset form
		setDescription("");
		setAmount("");
		setCategory("");
	};

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
