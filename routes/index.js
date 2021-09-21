var express = require('express');
var router = express.Router();

var ordersRouter = require('./orders');
var orderItemsRouter = require('./orderItems');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    msg: "Expreess"
  })
});

router.use('/orders', ordersRouter);

router.use('/orderItems', orderItemsRouter);

module.exports = router;
