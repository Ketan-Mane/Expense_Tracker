"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Users", "auth0Id", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("Users", "avatarUrl", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "auth0Id");
    await queryInterface.removeColumn("Users", "avatarUrl");
	},
};
