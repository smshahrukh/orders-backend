const OrderSchema = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize
  const { STRING, INTEGER } = DataTypes

const Order = sequelize.define('order', { 
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

const OrderItem = sequelize.define('orderItem', { 
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
  orderId: {
      type: INTEGER,
  },
  orderItemId: {
      type: INTEGER,
  },
  quantity: {
      type: INTEGER,
  }
});

const Status = sequelize.define('Status', {
  label: {
    type: STRING,
    allowNull: false
  },
  value: {
    type: INTEGER,
    allowNull: false
  }
});

// Order.hasOne(Status)
Order.belongsToMany(OrderItem, { through: 'order_items_bridge', constraints: false });

return { Order, OrderItem, orderItemsBridge, Status }

}
 
module.exports = OrderSchema;
