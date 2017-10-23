var express = require('express');
var router = express.Router();
const { data } = require('../public/data/data.json');
const { cards } = data;

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(cards);
  res.render('index', data);
});

module.exports = router;
