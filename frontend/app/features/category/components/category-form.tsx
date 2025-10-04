import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { CategorySchema, type Category } from "../types/category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

interface CategoryFormProps {
	category?: Category;
	onSave: (category: Omit<Category, "id">) => void;
	onCancel: () => void;
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

const CategoryForm = ({ category,  onCancel }: CategoryFormProps) => {
	const form = useForm({
		resolver: zodResolver(CategorySchema),
	});

	const handleSubmit = (data: Category) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
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
								{colorOptions.map((color) => (
									<button
										key={color}
										type="button"
										className={`w-8 h-8 rounded-full border-2 ${
											form.getValues("color") === color ? "border-foreground" : "border-border"
										}`}
										style={{ backgroundColor: color }}
										onClick={() => field.onChange(color)}
									/>
								))}
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">{category ? "Update Category" : "Create Category"}</Button>
			</form>
		</Form>
	);
};
export default CategoryForm;
