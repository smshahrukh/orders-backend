var express = require('express');
var router = express.Router();

var ordersRouter = require('./orders');
var orderItemsRouter = require('./orderItems');
var authRouter = require('./auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    msg: "Expreess"
  })
});

router.use('/orders', ordersRouter);
router.use('/orderItems', orderItemsRouter);
router.use('/auth', authRouter);

module.exports = router;
