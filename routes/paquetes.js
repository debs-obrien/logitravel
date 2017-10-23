const express = require('express');
const router = express.Router();
const { data } = require('../public/data/data.json');
const { cards } = data;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('paquetes', data);
});

module.exports = router;
