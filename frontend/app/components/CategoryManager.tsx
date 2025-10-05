import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Plus, Edit, Settings2 } from "lucide-react";
import { toast } from "sonner";
import Modal from "./common/modal";
import CategoryForm from "~/features/category/components/category-form";
import ConfirmModal from "./common/confirm-modal";
import { formatCurrency } from "~/lib/utils";
import type { Category } from "~/features/category/types/category";
import useCategories from "~/features/category/hooks/useCategories";

export function CategoryManager() {
	const [categories, setCategories] = useState<Category[]>([]);

	const { data } = useCategories();

	useEffect(() => {
		if (data?.data) {
			setCategories(data?.data);
		}
	}, [data]);

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

	const totalBudget = 10000;

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

					<Modal
						title="Add New Category"
						button={
							<Button>
								<Plus />
								Add Category
							</Button>
						}
						render={<CategoryForm />}
					/>
				</div>
			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Category</TableHead>
							{/* <TableHead>Budget</TableHead> */}
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
								{/* <TableCell>{formatCurrency(category.budget)}</TableCell> */}
								<TableCell>
									<Badge variant={category.isDefault ? "default" : "secondary"}>
										{category.isDefault ? "Default" : "Custom"}
									</Badge>
								</TableCell>
								{!category.isDefault && (
									<TableCell className="text-right">
										<div className="flex items-center justify-end gap-2">
											<Modal
												title="Edit Category"
												button={
													<Button variant="ghost" size="sm">
														<Edit className="h-4 w-4" />
													</Button>
												}
												render={<CategoryForm category={category} />}
											/>
											<ConfirmModal
												title="Delete Category"
												description={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
												onConfirm={() => handleDeleteCategory(category.id)}
											/>
										</div>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
