"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.addColumn("Transactions", "date", {
			type: Sequelize.DATEONLY,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.removeColumn("Transactions", "date");
	},
};
