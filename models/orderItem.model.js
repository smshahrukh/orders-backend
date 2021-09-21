
const OrderItemSchema = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize

const OrderItem = sequelize.define('OrderItem', { 
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: true
  }
});

return { OrderItem }

}

module.exports = OrderItemSchema;
