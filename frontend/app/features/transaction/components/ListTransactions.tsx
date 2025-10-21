import { Archive, Edit } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { formatDate } from 'date-fns';
import Modal from '~/components/common/modal';
import TransactionForm from './TransactionForm';
import ConfirmModal from '~/components/common/confirm-modal';
import useDeleteTransaction from '../hooks/use-delete-transaction';
import useUpdateTransaction from '../hooks/use-update-transaction';
import type { Transaction } from '../types/transaction';
import useFormatCurrency from '~/hooks/use-format-currency';

const ListTransactions = ({ transactions }: { transactions: Transaction[] }) => {
	const { mutateAsync: deleteTransaction } = useDeleteTransaction();
	const { mutateAsync: updateTransaction } = useUpdateTransaction();
	const formatCurrency = useFormatCurrency();

	const handleDelete = async (id: string) => {
		await deleteTransaction(id);
	};

	const handelArchive = async (transaction: Transaction) => {
		await updateTransaction({ ...transaction, isArchived: true });
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Description</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Date</TableHead>
					<TableHead className="text-right">Amount</TableHead>
					<TableHead className="w-[50px]"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{transactions.length === 0 ? (
					<TableRow>
						<TableCell colSpan={5} className="text-center text-neutral-500 italic">
							No transactions found
						</TableCell>
					</TableRow>
				) : (
					transactions.map((transaction) => (
						<TableRow key={transaction.id}>
							<TableCell className="font-medium">{transaction.description}</TableCell>
							<TableCell>
								<Badge style={{ backgroundColor: transaction.category?.color }}>
									{transaction.category?.name}
								</Badge>
							</TableCell>
							<TableCell className="text-muted-foreground">
								{formatDate(transaction.date!, 'dd MMM yyyy')}
							</TableCell>
							<TableCell
								className={`text-right font-medium ${
									transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
								}`}
							>
								{transaction.type === 'Income' ? '+' : '-'}
								{formatCurrency(transaction.amount)}
							</TableCell>
							<TableCell>
								<Modal
									title="Edit Transaction"
									button={
										<Button variant="ghost" size="sm">
											<Edit />
										</Button>
									}
									render={(close) => <TransactionForm transaction={transaction} close={close} />}
								/>

								<Button variant="ghost" size="sm" onClick={() => handelArchive(transaction)}>
									<Archive />
								</Button>
								<ConfirmModal
									title="Delete Transaction"
									description={`Are you sure you want to delete "${transaction.description}"? This action cannot be undone.`}
									onConfirm={() => handleDelete(transaction.id!)}
								/>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
export default ListTransactions;
