var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

var adminTiendaSchema = new Schema({
    id_tienda: { type: Schema.ObjectId },
    correoElectronico: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
});


adminTiendaSchema.pre('save', function (next) {
    var adminTienda = this;
    // solo aplica una función hash al password si ha sido modificado (o es nuevo)
    if (!adminTienda.isModified('contrasena')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // aplica una función hash al password usando la nueva salt
        bcrypt.hash(adminTienda.contrasena, salt, function (err, hash) {
            if (err) return next(err);
            // sobrescribe el password escrito con el “hasheado”
            adminTienda.contrasena = hash;
            next();
        });
    });
});

adminTiendaSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword,
        this.contrasena,
        function (err,
            isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
};


module.exports = mongoose.model('adminTienda', adminTiendaSchema);