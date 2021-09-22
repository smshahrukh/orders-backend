var express = require('express');
var router = express.Router();

const db = require('../models/index.model')

/* GET orders listing. */
router.get('/', async function (req, res, next) {
  try {

    const _orders = await db.Order.findAll({ raw: true })
    const statuses = await db.Status.findAll()

    const orders = _orders.map(order => {
      const status = statuses.find(s => s.value == order.status);
      return {
        ...order,
        status: status.label

      }

    })


    res.status(200).json({
      orders
    })
  }
  catch (e) {
    res.status(404).json({
      msg: "Orders not found"
    })
  }
});

router.post('/create', async function (req, res) {
  const { customerName, phoneNum, items } = req.body;

  const order = await db.Order.create({
    customerName,
    phoneNum
  })

  const order_items_array = [];
  for (let i = 0; i < items.length; i++) {
    order_items_array.push({
      OrderId: order.id,
      OrderItemId: Number(items[i].name),
      quantity: items[i].quantity,
    })
  }

  await db.orderItemsBridge.bulkCreate(order_items_array, {
    returning: true
  })

  const statuses = await db.Status.findAll()
  const status = statuses.find(s => s.value == order.status);
  try {

    res.status(200).json({
      data: {
        id: order.id,
        customerName: order.customerName,
        status: status.label
      }
    })

  }
  catch (e) {
    res.status(404).json({
      msg: "Something went wrong"
    })
  }
})

router.get("/:id", async function (req, res) {
  const { params } = req;
  const { id } = params;

  try {
    const order = await db.Order.findOne({
      where: { id: Number(id)},
        include: [{
            model: db.OrderItem,
            through: {
              model: db.orderItemsBridge,
              attributes: [],
            }
        }]  
    });
  
    res.status(200).json(order)
  }
  catch(e) {
    console.log({ e })
    res.status(404).json({ msg: "Order not found"})
  }

  
})

module.exports = router;
