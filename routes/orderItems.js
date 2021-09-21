var express = require('express');
var router = express.Router();

const db = require('../models/index.model')

/* GET order items listing. */
router.get('/', async function(req, res, next) {
  try {

    const orderItems = await db.OrderItem.findAll()
    res.status(200).json({
      orderItems
    })
  }
  catch(e) {
    res.status(404).json({
      msg: "Order Items not found"
    })
  }
});

router.post('/create', function(req, res) {

  const { name, price } = req.body;

  db.OrderItem.create({
    name,
    price
  })

  
  try {

    res.status(200).json({
      data: req.body
    })

  }
  catch(e) {
    res.status(404).json({
      msg: "Something went wrong"
    })
  }
})

module.exports = router;
