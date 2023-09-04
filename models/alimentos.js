var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var alimentosSchema = new Schema({
    id_alimentos: {type: Schema.ObjectId},
    nombre: {type: String,required:true},
    descripcion: {type:String},
    alergenos:[],
    tipoAlimento:{type:String,required:true,enum:['Hamburguesa','Bebida','Postre']},
    precio:{type:Number,required:true},
    imagen:{type:String,required:true},
    extras:[],
});

module.exports = mongoose.model('alimento', alimentosSchema);