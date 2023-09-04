var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { newPedido,enProceso,pedidoFinalizado, getPedidos } = require('./../controllers/pedidoClienteController');


router.post('/newPedido', newPedido);
router.put('/pedidoEnProceso', enProceso);
router.put('/pedidoFinalizado', pedidoFinalizado);
router.get('/getPedidos', getPedidos);


module.exports = router;