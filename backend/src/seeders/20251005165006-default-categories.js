"use strict";

const { v4: UUIDV4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Categories", [
			{
				id: UUIDV4(),
				name: "Food & Dining",
				color: "#6366F1",
				isDefault: true,
			},
			{
				id: UUIDV4(),
				name: "Entertainment",
				color: "#3B82F6",
				isDefault: true,
			},
			{
				id: UUIDV4(),
				name: "Bills & Utilities",
				color: "#EC4899",
				isDefault: true,
			},
			{
				id: UUIDV4(),
				name: "Transportation",
				color: "#f54a00",
				isDefault: true,
			},
			{
				id: UUIDV4(),
				name: "Shopping",
				color: "#009689",
				isDefault: true,
			},
			{
				id: UUIDV4(),
				name: "Groceries",
				color: "#104e64",
				isDefault: true,
			},
			{
				id: UUIDV4(),
				name: "Work",
				color: "#fe9a00",
				isDefault: true,
			},
			{
				id: UUIDV4(),
				name: "Personal",
				color: "#8B5CF6",
				isDefault: true,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Categories", null, {});
	},
};
