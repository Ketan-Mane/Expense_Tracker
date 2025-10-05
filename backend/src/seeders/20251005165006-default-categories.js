"use strict";

const { v4: UUIDV4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Categories", [
			{
				id: UUIDV4(),
				name: "Transportation",
				color: "#f54a00",
				isDefault: true,
			},
			{
				id : UUIDV4(),
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
				name: "Entertainment",
				color: "#ffb900",
				isDefault: true,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Categories", null, {});
	},
};
