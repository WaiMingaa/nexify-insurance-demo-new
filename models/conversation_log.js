'use strict';
module.exports = function(sequelize, DataTypes) {
    var CONVERSATION_LOG = sequelize.define('CONVERSATION_LOG', {
          conversationId: {
            type:DataTypes.UUID
          },
          request: DataTypes.JSON,
              response: DataTypes.JSON,
                intent: DataTypes.JSON,
					entity: DataTypes.JSON},
                  {
                    classMethods: {
                      associate: function(models) {
                        // associations can be defined here
                      }
                    }
                  });
                return CONVERSATION_LOG;
              };