import ApiError from "@helper/ApiError";
import Month, { MonthAttributes, MonthCreationAttributes } from "@models/month.model";
import { type PaginatedResult } from "types/pagination";

const getMonths = async ({
	userId,
	page = 1,
	limit = 10,
}: {
	userId: string;
	page?: number;
	limit?: number;
}): Promise<PaginatedResult<"months", MonthAttributes>> => {
	try {
		const { count, rows: months } = await Month.findAndCountAll({
			where: { userId },
			limit,
			offset: (page - 1) * limit,
			// order: [["createdAt", "DESC"]],
		});
		const metadata = { count: months.length, page: 1, limit: count, totalPages: Math.ceil(count / 10) };
		return { months, metadata };
	} catch (error: any) {
		throw new ApiError(error?.message || "Failed to fetch months", 500);
	}
};

const getMonth = async (id: string): Promise<MonthAttributes | null> => {
	try {
		const month = await Month.findByPk(id, {
			include: [{ all: true, nested: true }],
		});
		return month;
	} catch (error: any) {
		throw new ApiError(error?.message || "Failed to fetch month", 500);
	}
};

const createMonth = async (data: MonthCreationAttributes): Promise<MonthAttributes> => {
	try {
		const month = await Month.create(data);
		return month;
	} catch (error: any) {
		throw new ApiError(error?.message || "Failed to create month", 500);
	}
};

const updateMonth = async (id: string, updates: Partial<MonthCreationAttributes>): Promise<MonthAttributes> => {
	try {
		const month = await Month.findByPk(id);
		if (!month) {
			throw new ApiError("Month not found", 404);
		}
		await month.update(updates);
		return month;
	} catch (error) {
		throw new ApiError("Failed to update month", 500);
	}
};

const deleteMonth = async (id: string): Promise<void> => {
	try {
		const month = await Month.findByPk(id);
		if (!month) {
			throw new ApiError("Month not found", 404);
		}
		await month.destroy();
	} catch (error) {
		throw new ApiError("Failed to delete month", 500);
	}
};

// const archiveMonth = async (id: string): Promise<MonthAttributes> => {
// 	try {
// 		const month = await Month.findByPk(id);
// 		if (!month) {
// 			throw new Error("Month not found");
// 		}
// 		await month.update({});
// 		return month;
// 	} catch (error) {
// 		throw new ApiError("Failed to archive month", 500);
// 	}
// };

// const unarchiveMonth = async (id: string): Promise<MonthAttributes> => {
// 	try {
// 		const month = await Month.findByPk(id);
// 		if (!month) {
// 			throw new Error("Month not found");
// 		}
// 		await month.update({ archived: false });
// 		return month;
// 	} catch (error) {
// 		throw new ApiError("Failed to unarchive month", 500);
// 	}
// };

export default { getMonths, getMonth, createMonth, updateMonth, deleteMonth };
