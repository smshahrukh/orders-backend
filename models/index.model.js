

const OrderSchema = require("./order.model") 
const StatusSchema = require("./status.model") 

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const {Order, OrderItem, orderItemsBridge} = OrderSchema(sequelize, Sequelize)
const { Status } = StatusSchema(sequelize, Sequelize)

const db = {
    Sequelize,
    sequelize, 
    Order,
    OrderItem,
    orderItemsBridge,
    Status
};

module.exports = db;