import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { TransactionSchema, type Transaction } from "../types/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import useCategories from "~/features/category/hooks/use-categories";
import { Button } from "~/components/ui/button";
import useCreateTransaction from "../hooks/use-create-transaction";
import DatePicker from "~/components/ui/date-picker";

interface TransactionFormProps {
	transaction?: Transaction;
	close?: () => void;
}

const TransactionForm = ({ transaction }: TransactionFormProps) => {
	const { data } = useCategories();
	const { mutateAsync: createTransaction, isPending: isCreating } = useCreateTransaction();

	const categories = data?.categories || [];

	const schema = transaction ? TransactionSchema : TransactionSchema.omit({ id: true });
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			...(transaction && { id: transaction?.id }),
			amount: transaction?.amount || 0,
			item: transaction?.item || "",
			date: transaction?.date || new Date(),
			paymentMethod: transaction?.paymentMethod || "",
			isRecurring: transaction?.isRecurring || false,
			category: transaction?.category || {},
		},
	});

	const onSubmit = async (data: Transaction) => {
		const payload = {
			...data,
			categoryId: data.category.id,
		};
		await createTransaction(payload);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					name="item"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripton</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="amount"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									type="number"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="category"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Select
									name={field.name}
									value={field.value.id}
									onValueChange={(id) => {
										const category = categories.find((category) => category.id === id);
										field.onChange(category);
									}}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>

									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="date"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date</FormLabel>
							<FormControl>
								<DatePicker value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" isProcessing={isCreating}>
					Submit
				</Button>
			</form>
		</Form>
	);
};
export default TransactionForm;
