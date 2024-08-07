var express = require('express');
var router = express.Router();
const controller = require('../controller/addqueue')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/add',controller.addqueue)
module.exports = router;
