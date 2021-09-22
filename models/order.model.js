const OrderSchema = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize
  const { STRING, INTEGER } = DataTypes

const Order = sequelize.define('Order', { 
  customerName: {
    type: STRING,
    allowNull: false
  },
  phoneNum: {
    type: STRING,
    allowNull: true
  },
  status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
  }
});

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

const orderItemsBridge = sequelize.define("order_items_bridge", {
  OrderId: {
      type: INTEGER,
  },
  OrderItemId: {
      type: INTEGER,
  },
  quantity: {
      type: INTEGER,
  }
});

Order.belongsToMany(OrderItem, { through: 'order_items_bridge' });

return { Order, OrderItem, orderItemsBridge }

}
 
module.exports = OrderSchema;
