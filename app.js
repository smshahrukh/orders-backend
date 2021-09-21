var express = require('express');
var path = require('path');
var cors = require('cors')
var indexRouter = require('./routes/index');
const db = require('./models/index.model')

// db.sequelize.sync();
db.sequelize.sync({ force: false })
  .then(function() {
    console.log(`Database & tables created! `);
    console.log("orderItemss sc: ")
    db.OrderItem.bulkCreate([
        { id: 1, name: "Water Bottle 1 Liter", price: 10},
        { id: 2, name: "Pepsi 200ML", price: 20},
        { id: 3, name: "Sprite 300ML", price: 30},
        { id: 4, name: "Mountain Dew 500ML", price: 40},
        { id: 5, name: "Sting 500 ML", price: 50},
        { id: 6, name: "Pepsi 1 Liter", price: 90}
    ]).then(function() {
        db.Status.bulkCreate([
            { id: 1, value: 0, label: "Pending"},
            { id: 2, value: 1, label: "In-Preparation"},
            { id: 3, value: 2, label: "Ready-To-Ship"},
            { id: 4, value: 3, label: "In-Transit"},
            { id: 5, value: 4, label: "Delivered"},
            { id: 6, value: 5, label: "Closed"},
            { id: 7, value: 6, label: "Cancelled"},
        ])
    })    
    .then(function() {
      console.log("DB created with seed data")
    });
  });


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())



app.use('/', indexRouter);

module.exports = app;
