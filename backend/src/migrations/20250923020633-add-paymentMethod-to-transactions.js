"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Transactions", "paymentMethod", {
			type: Sequelize.ENUM("Cash", "Credit Card", "Debit Card", "UPI", "Net Banking", "Other"),
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Transactions", "paymentMethod");
	},
};
