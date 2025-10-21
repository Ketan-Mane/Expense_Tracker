import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { TransactionSchema, type Transaction } from '../types/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import useCategories from '~/features/category/hooks/use-categories';
import { Button } from '~/components/ui/button';
import useCreateTransaction from '../hooks/use-create-transaction';
import DatePicker from '~/components/ui/date-picker';
import Modal from '~/components/common/modal';
import CategoryForm from '~/features/category/components/CategoryForm';
import { PAYMENT_MODES, TRANSACTION_TYPES } from '~/lib/constant';
import useUpdateTransaction from '../hooks/use-update-transaction';
import { useUserSettings } from '~/features/user/hooks/use-user-settings';

interface TransactionFormProps {
	transaction?: Transaction;
	close?: () => void;
}

const TransactionForm = ({ transaction, close }: TransactionFormProps) => {
	const { data } = useCategories();
	const { mutateAsync: createTransaction, isPending: isCreating } = useCreateTransaction();
	const { mutateAsync: updateTransaction, isPending: isUpdating } = useUpdateTransaction();
	const { data: settings } = useUserSettings();

	const categories = data?.categories || [];

	const schema = transaction ? TransactionSchema : TransactionSchema.omit({ id: true });
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			...(transaction && { id: transaction?.id }),
			amount: transaction?.amount || 0,
			description: transaction?.description || '',
			date: new Date(transaction?.date || new Date()),
			paymentMethod: transaction?.paymentMethod || settings?.defaultPaymentMethod || 'UPI',
			isRecurring: transaction?.isRecurring || false,
			type: transaction?.type || 'Expense',
			category: transaction?.category || {
				id: '',
				name: '',
			},
		},
	});

	const onSubmit = async (data: Transaction) => {
		const payload = {
			...data,
			categoryId: data.category.id,
		};
		if (transaction) {
			await updateTransaction(payload, {
				onSuccess: () => {
					if (close) close();
				},
			});
			return;
		}

		await createTransaction(payload, {
			onSuccess: () => {
				form.reset();
				if (close) close();
			},
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					name="description"
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
							<FormDescription className="text-xs text-end">
								Not found?{'  '}
								<Modal
									title="Add New Category"
									button={
										<Button
											type="button"
											variant="link"
											size="sm"
											className="text-xs h-max w-max p-0"
										>
											Add New
										</Button>
									}
									render={(close) => <CategoryForm close={close} />}
								/>
							</FormDescription>
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

				<FormField
					name="paymentMethod"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payment Method</FormLabel>
							<FormControl>
								<Select name={field.name} value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a Payment Method" />
									</SelectTrigger>

									<SelectContent>
										{PAYMENT_MODES.map((payment) => (
											<SelectItem key={payment} value={payment}>
												{payment}
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
					name="type"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
							<FormControl>
								<Select name={field.name} value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a type" />
									</SelectTrigger>

									<SelectContent>
										{TRANSACTION_TYPES.map((expense) => (
											<SelectItem key={expense} value={expense}>
												{expense}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" isProcessing={isCreating || isUpdating}>
					{transaction ? 'Update' : 'Create'}
				</Button>
			</form>
		</Form>
	);
};
export default TransactionForm;
