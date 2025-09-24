"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Transactions", "categoryId", {
			type: Sequelize.UUID,
			references: {
				model: "Categories",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Transactions", "categoryId");
	},
};
