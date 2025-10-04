import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import useCategories from "~/features/category/hooks/useCategories";
import type { Category } from "~/features/category/types/category";

const categories = [
	"Food & Dining",
	"Transportation",
	"Shopping",
	"Entertainment",
	"Bills & Utilities",
	"Healthcare",
	"Education",
	"Travel",
	"Other",
];

export function AddExpenseForm() {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState<Category[]>([]);

	const { data } = useCategories();

	useEffect(() => {
		if (data?.categories) {
			setCategories(data?.categories);
		}
	}, [data]);

	console.log(data);

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
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Input
							id="description"
							placeholder="Enter expense description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="amount">Amount</Label>
						<Input
							id="amount"
							type="number"
							step="0.01"
							placeholder="0.00"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger>
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((cat) => (
									<SelectItem key={cat.id} value={cat.name}>
										{cat.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Button type="submit" className="w-full">
						Add Expense
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
