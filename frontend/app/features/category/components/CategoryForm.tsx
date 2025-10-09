import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { CategorySchema, type Category } from '../types/category';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { CATEGORY_COLORS } from '~/lib/constant';
import useCreateCategory from '../hooks/use-create-category';
import { toast } from 'sonner';
import useUpdateCategory from '../hooks/use-update-category';

interface CategoryFormProps {
	category?: Category;
	close?: () => void;
}

const CategoryForm = ({ category, close }: CategoryFormProps) => {
	const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory();
	const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategory();

	const form = useForm({
		resolver: zodResolver(CategorySchema),
		defaultValues: {
			id: category?.id || '',
			name: category?.name || '',
			color: category?.color || CATEGORY_COLORS[0],
		},
	});

	// console.log("id", form.getFieldState("id"));
	// console.log("userId", form.getFieldState("userId"));
	// console.log("name", form.getFieldState("name"));
	// console.log("color", form.getFieldState("color"));
	// console.log("isDefault", form.getFieldState("isDefault"));
	// console.log("icon", form.getFieldState("icon"));
	// console.log("createdAt", form.getFieldState("createdAt"));
	// console.log("updatedAt", form.getFieldState("updatedAt"));

	const handleSubmit = async (data: Category) => {
		if (category) {
			await updateCategory(
				{ id: category.id, payload: data },
				{
					onSuccess: () => {
						toast.success('Category updated successfully');
						if (close) close();
					},
					onError: (error) => {
						toast.error(error.message);
					},
				},
			);
			return;
		}
		await createCategory(data, {
			onSuccess: () => {
				toast.success('Category added successfully');
				if (close) close();
			},
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.stopPropagation();
					form.handleSubmit(handleSubmit)(e);
				}}
				className="space-y-6"
			>
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <FormField
					name="budget"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Budget</FormLabel>
							<FormControl>
								<Input placeholder="Budget" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}

				<FormField
					name="color"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Color</FormLabel>
							<FormControl>
								<div className="flex flex-wrap gap-2">
									{CATEGORY_COLORS.map((color) => (
										<button
											key={color}
											type="button"
											className={`w-8 h-8 rounded-full border-2 ${
												form.getValues('color') === color
													? 'border-foreground'
													: 'border-border'
											}`}
											style={{ backgroundColor: color }}
											onClick={() => field.onChange(color)}
										/>
									))}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button> */}
				<div className="flex justify-end">
					<Button type="submit" isProcessing={isCreating || isUpdating}>
						{category ? 'Update Category' : 'Create Category'}
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default CategoryForm;
