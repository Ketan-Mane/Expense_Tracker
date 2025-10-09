"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Transactions", "type", {
			type: Sequelize.ENUM("Expense", "Income"),
			allowNull: false,
			defaultValue: "Expense",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Transactions", "type");
	},
};
