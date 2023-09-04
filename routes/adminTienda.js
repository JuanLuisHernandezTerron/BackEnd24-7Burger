var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { newTienda, loginTienda } = require('./../controllers/adminTiendaController');
const validatorToken = require('../../24-7Burger/middleware/tokenValidator')

router.post('/newTienda', newTienda);
router.post('/loginTienda', loginTienda);

module.exports = router;