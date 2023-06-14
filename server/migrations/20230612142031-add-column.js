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
    await queryInterface.addColumn('Users', 'soft_delete', {
      type: Sequelize.BOOLEAN
    });

    await queryInterface.addColumn('Expenses', 'soft_delete', {
      type: Sequelize.BOOLEAN
    });

    await queryInterface.addColumn('Expenses', 'archived', {
      type: Sequelize.BOOLEAN
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Users', 'soft_delete');
    await queryInterface.removeColumn('Expenses', 'soft_delete');
    await queryInterface.removeColumn('Expenses', 'archived');
  }
};