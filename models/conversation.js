'use strict';
module.exports = function(sequelize, DataTypes) {
  var CONVERSATION = sequelize.define('CONVERSATION', {
 conversationId: {
            type:DataTypes.UUID,
            unique: true,
            allowNull: false
          }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CONVERSATION;
};