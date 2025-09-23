import Transaction, { TransactionCreationAttributes } from "@models/transaction.model";
import User from "@models/user.model";
import PaginatedResult from "types/pagination";

const getTransactions = async ({
	monthId = null,
	page = 1,
	limit = 10,
}: {
	monthId?: string | null;
	page?: number;
	limit?: number;
}): Promise<PaginatedResult<Transaction>> => {
	const { count, rows: data } = await Transaction.findAndCountAll({
		...(monthId ? { where: { monthId } } : {}),
		limit,
		offset: (page - 1) * limit,
	});

	const metadata = { count: data.length, page, limit, totalPages: Math.ceil(count / limit) };
	return { data: data, metadata };
};

const createTransaction = async (data: TransactionCreationAttributes): Promise<Transaction> => {
	const transaction = await Transaction.create({ ...data });
	return transaction;
};

const updateTransaction = async (id: string, updates: Partial<TransactionCreationAttributes>): Promise<Transaction> => {
	const transaction = await Transaction.findByPk(id);
	if (!transaction) {
		throw new Error("Transaction not found");
	}
	await transaction.update(updates);
	return transaction;
};

const deleteTransaction = async (id: string): Promise<void> => {
	const transaction = await Transaction.findByPk(id);
	if (!transaction) {
		throw new Error("Transaction not found");
	}
	await transaction.destroy();
};

export default { getTransactions, createTransaction, updateTransaction, deleteTransaction };
