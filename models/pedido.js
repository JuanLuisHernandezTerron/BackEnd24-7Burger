
autoIncrement = require('@alec016/mongoose-autoincrement');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const connection = mongoose.connection

autoIncrement.initialize(connection);

var pedidoSchema = new Schema({
    datos_pedido: [{
        id_alimento: {type: Schema.ObjectId, required: true, ref:'alimento'},
        cantidad:{type: Number, required:true},
        extras:[{
            nombre: String,
            precio: Number
        }]
    }],
    datos_cliente:{
        nombre: {type: String, required: true},
        telefono: {type:Number,required: true},
        direccion: {type:String,required: false},
        dni: {type:String,required:true}
    },
    recogida_envio: {type:String,required: true},
    estado_pedido: {type:String,enum:['En espera','En proceso'], default:'En espera'},
    id_tienda: {type: Schema.ObjectId, required: true, ref:'adminTienda'},
});


pedidoSchema.plugin(autoIncrement.plugin, 'pedido');
module.exports = mongoose.model('pedido', pedidoSchema);