import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { Plus, Edit, Trash2, Settings2 } from "lucide-react";
import { toast } from "sonner";
// import type { Category } from "~/features/category/types/category";

interface Category {
	id: string;
	name: string;
	budget: number;
	color: string;
	isDefault: boolean;
}

const colorOptions = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)",
	"#8B5CF6",
	"#F59E0B",
	"#10B981",
	"#EF4444",
	"#3B82F6",
	"#EC4899",
	"#6366F1",
];

const defaultCategories: Category[] = [
	{ id: "1", name: "Food & Dining", budget: 1500, color: "var(--color-chart-1)", isDefault: true },
	{ id: "2", name: "Transportation", budget: 800, color: "var(--color-chart-2)", isDefault: true },
	{ id: "3", name: "Shopping", budget: 1000, color: "var(--color-chart-3)", isDefault: true },
	{ id: "4", name: "Entertainment", budget: 600, color: "var(--color-chart-4)", isDefault: true },
	{ id: "5", name: "Bills & Utilities", budget: 400, color: "var(--color-chart-5)", isDefault: true },
	{ id: "6", name: "Healthcare", budget: 300, color: "#8B5CF6", isDefault: false },
	{ id: "7", name: "Education", budget: 500, color: "#F59E0B", isDefault: false },
	{ id: "8", name: "Travel", budget: 2000, color: "#10B981", isDefault: false },
];

function formatCurrency(amount: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
}

interface CategoryFormProps {
	category?: Category;
	onSave: (category: Omit<Category, "id">) => void;
	onCancel: () => void;
}

function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
	const [name, setName] = useState(category?.name || "");
	const [budget, setBudget] = useState(category?.budget?.toString() || "");
	const [selectedColor, setSelectedColor] = useState(category?.color || colorOptions[0]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim() || !budget) {
			toast.error("Please fill in all fields");
			return;
		}

		const budgetNum = parseFloat(budget);
		if (budgetNum <= 0) {
			toast.error("Budget must be greater than 0");
			return;
		}

		onSave({
			name: name.trim(),
			budget: budgetNum,
			color: selectedColor,
			isDefault: category?.isDefault || false,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="category-name">Category Name</Label>
				<Input
					id="category-name"
					placeholder="Enter category name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="category-budget">Monthly Budget</Label>
				<Input
					id="category-budget"
					type="number"
					step="0.01"
					placeholder="0.00"
					value={budget}
					onChange={(e) => setBudget(e.target.value)}
				/>
			</div>

			<div className="space-y-2">
				<Label>Color</Label>
				<div className="flex flex-wrap gap-2">
					{colorOptions.map((color) => (
						<button
							key={color}
							type="button"
							className={`w-8 h-8 rounded-full border-2 ${
								selectedColor === color ? "border-foreground" : "border-border"
							}`}
							style={{ backgroundColor: color }}
							onClick={() => setSelectedColor(color)}
						/>
					))}
				</div>
			</div>

			<DialogFooter>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">{category ? "Update Category" : "Create Category"}</Button>
			</DialogFooter>
		</form>
	);
}

export function CategoryManager() {
	const [categories, setCategories] = useState<Category[]>(defaultCategories);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const handleAddCategory = (categoryData: Omit<Category, "id">) => {
		const newCategory: Category = {
			...categoryData,
			id: Date.now().toString(),
		};

		setCategories([...categories, newCategory]);
		setIsAddDialogOpen(false);
		toast.success(`Added category: ${categoryData.name}`);
	};

	const handleEditCategory = (categoryData: Omit<Category, "id">) => {
		if (!editingCategory) return;

		const updatedCategories = categories.map((cat) =>
			cat.id === editingCategory.id ? { ...cat, ...categoryData } : cat,
		);

		setCategories(updatedCategories);
		setEditingCategory(null);
		setIsEditDialogOpen(false);
		toast.success(`Updated category: ${categoryData.name}`);
	};

	const handleDeleteCategory = (categoryId: string) => {
		const category = categories.find((cat) => cat.id === categoryId);
		if (!category) return;

		if (category.isDefault) {
			toast.error("Cannot delete default categories");
			return;
		}

		setCategories(categories.filter((cat) => cat.id !== categoryId));
		toast.success(`Deleted category: ${category.name}`);
	};

	const startEdit = (category: Category) => {
		setEditingCategory(category);
		setIsEditDialogOpen(true);
	};

	const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="flex items-center gap-2">
							<Settings2 className="h-5 w-5" />
							Category Management
						</CardTitle>
						<CardDescription>
							Manage your expense categories and budgets • Total Budget: {formatCurrency(totalBudget)}
						</CardDescription>
					</div>

					<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className="h-4 w-4 mr-2" />
								Add Category
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New Category</DialogTitle>
								<DialogDescription>
									Create a new expense category with a monthly budget.
								</DialogDescription>
							</DialogHeader>
							<CategoryForm onSave={handleAddCategory} onCancel={() => setIsAddDialogOpen(false)} />
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Category</TableHead>
							<TableHead>Budget</TableHead>
							<TableHead>Type</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories.map((category) => (
							<TableRow key={category.id}>
								<TableCell>
									<div className="flex items-center gap-3">
										<div
											className="w-4 h-4 rounded-full"
											style={{ backgroundColor: category.color }}
										/>
										<span className="font-medium">{category.name}</span>
									</div>
								</TableCell>
								<TableCell>{formatCurrency(category.budget)}</TableCell>
								<TableCell>
									<Badge variant={category.isDefault ? "default" : "secondary"}>
										{category.isDefault ? "Default" : "Custom"}
									</Badge>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex items-center justify-end gap-2">
										<Button variant="ghost" size="sm" onClick={() => startEdit(category)}>
											<Edit className="h-4 w-4" />
										</Button>

										{!category.isDefault && (
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button variant="ghost" size="sm">
														<Trash2 className="h-4 w-4" />
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>Delete Category</AlertDialogTitle>
														<AlertDialogDescription>
															Are you sure you want to delete "{category.name}"? This
															action cannot be undone.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => handleDeleteCategory(category.id)}
															className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
														>
															Delete
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{/* Edit Dialog */}
				<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Category</DialogTitle>
							<DialogDescription>Update the category details and budget.</DialogDescription>
						</DialogHeader>
						{editingCategory && (
							<CategoryForm
								category={editingCategory}
								onSave={handleEditCategory}
								onCancel={() => {
									setIsEditDialogOpen(false);
									setEditingCategory(null);
								}}
							/>
						)}
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
}
