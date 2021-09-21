const StatusSchema = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize
  const { STRING, NUMBER } = DataTypes

const Status = sequelize.define('Status', {
  label: {
    type: STRING,
    allowNull: false
  },
  value: {
    type: NUMBER,
    allowNull: false
  }
});

return { Status }

}
 
module.exports = StatusSchema;

