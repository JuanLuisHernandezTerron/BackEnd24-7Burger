var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { sendConsulta } = require('./../controllers/datosClienteController')

router.post('/consulta',sendConsulta);

module.exports = router;