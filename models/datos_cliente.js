var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datosClienteSchema = new Schema({
    nombre: {type: String, required: true},
    telefono: {type:Number,required: true},
    ubicacion: {type:String,required: true},
});

module.exports = mongoose.model('datosCliente', datosClienteSchema);