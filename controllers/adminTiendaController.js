const adminTienda = require('./../models/tiendaAdmin')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { response } = require('express');

const newTienda = async function (req, res) {
    try{
        const tienda = req.body;
        let consulta = await adminTienda.findOne({correoElectronico: tienda.correoElectronico}).exec();
        if(consulta){
            res.status(401).json({status: "Tienda ya registrada"})
        }else{
            await adminTienda.create(tienda);
            res.status(200).json('Tienda Ingresada Correctamente');
        }
    }catch(e){
        console.log(e);
    }
}


const loginTienda = async function (req, res) {
    try{
        const { correoElectronico, contrasena } = req.body;
        console.log(correoElectronico, contrasena);
        let tienda = await adminTienda.findOne({correoElectronico: correoElectronico}).exec();

        if(tienda && contrasena != null){
            const checkContrasena = await bcrypt.compare(contrasena, tienda.contrasena)
            if(checkContrasena){
                const token = jwt.sign({ id: tienda._id }, process.env.JWT_SECRET, {
                    expiresIn: '1d'
                  });
                  res.status(200).json({token})
            }else{
                res.status(401).json({ status: "error", error: "Email incorrecto o contraseña incorrecta" })
            }
        }else{
            res.status(401).json({ status: "error", error: "Email incorrecto o contraseña incorrecta" })
        }
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    newTienda,
    loginTienda
}