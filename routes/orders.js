var express = require('express');
var router = express.Router();

const db = require('../models/index.model')

/* GET orders listing. */
router.get('/', async function (req, res, next) {
  try {

    const _orders = await db.Order.findAll({ raw: true })
    const statuses = await db.Status.findAll()

    const orders = _orders.map(order => {
      console.log({ order })
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
      order_id: order.id,
      order_item_id: Number(items[i].name),
      quantity: items[i].quantity,
    })
  }

  const order_items = await db.orderItemsBridge.bulkCreate(order_items_array, {
    returning: true
  })

  console.log({ order_items })

  try {

    res.status(200).json({
      data: req.body
    })

  }
  catch (e) {
    res.status(404).json({
      msg: "Something went wrong"
    })
  }
})

module.exports = router;
