import Transaction, { TransactionCreationAttributes } from "@models/transaction.model";
import User from "@models/user.model";

interface PaginatedResult<T> {
	transactions: T[];
	metadata: {
		count: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

const getTransactions = async ({
	userId,
	page = 1,
	limit = 10,
}: {
	userId: string;
	page?: number;
	limit?: number;
}): Promise<PaginatedResult<Transaction>> => {
	const { count, rows: transactions } = await Transaction.findAndCountAll({
		include: { model: User, as: "user", attributes: ["id", "name"] },
		where: { userId },
		limit,
		offset: (page - 1) * limit,
	});

	const metadata = { count: transactions.length, page, limit, totalPages: Math.ceil(count / limit) };
	return { transactions, metadata };
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
