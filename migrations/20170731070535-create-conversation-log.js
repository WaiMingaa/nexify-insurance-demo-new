'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('CONVERSATION_LOGs', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              id: {
                type: Sequelize. {
                  TYPE
                },
                unique: {
                  type: Sequelize.
                  'TRUE'
                },
                allowNull: {
                  type: Sequelize.
                  'FALSE'
                }
              },
              request: {
                type: Sequelize. {
                  TYPE
                },
                response: {
                  type: Sequelize. {
                    TYPE
                  },
                  intent: {
                    type: Sequelize. {
                      TYPE
                    },
                    entity: {
                      type: Sequelize. {
                        TYPE
                      },
                      createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                      },
                      updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                      }
                    });
                },
                down: function(queryInterface, Sequelize) {
                  return queryInterface.dropTable('CONVERSATION_LOGs');
                }
              };