var express = require('express');
var router = express.Router();

const db = require('../models/index.model')

/* Post Login */
router.post('/login', async function (req, res, next) {
  try {

    const { body } = req;
    const { username, password } = body;

    const user = await db.User.findOne({ where: { username }})
    if (user.password === password) {
        res.status(200).json({
            data: {
                username: user.username,
                isAdmin: user.isAdmin,
                status: true
            }
        })
    } else {
        res.status(401).json({
            data: {
                status: false
            }
        })
    }

  }
  catch(e) {
      console.log(e)
      res.status(401).json({
        data: {
            status: false
        }
    })
  }

})

module.exports = router;