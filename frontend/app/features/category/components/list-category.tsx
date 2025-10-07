import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import useCategories from "../hooks/useCategories";
import useDeleteCategory from "../hooks/useDeleteCategory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Edit } from "lucide-react";
import Modal from "~/components/common/modal";
import { Button } from "~/components/ui/button";
import CategoryForm from "./category-form";
import ConfirmModal from "~/components/common/confirm-modal";
import { Badge } from "~/components/ui/badge";

const ListCategory = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const { data } = useCategories();
	const { mutateAsync: deleteCategory } = useDeleteCategory();

	useEffect(() => {
		if (data?.data) {
			setCategories(data?.data);
		}
	}, [data]);

	const handleDeleteCategory = async (categoryId: string) => {
		await deleteCategory(categoryId);
	};

	return (
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
								<div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
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
										render={(close) => <CategoryForm category={category} close={close} />}
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
	);
};
export default ListCategory;
