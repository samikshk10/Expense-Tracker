'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM("admin", "user")
    });

    await queryInterface.addColumn('Users', 'status', {
      type: Sequelize.ENUM("verified", "pending", "blocked")
    });


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'status');


  }
};