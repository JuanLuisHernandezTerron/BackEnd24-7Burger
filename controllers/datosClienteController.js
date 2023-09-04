const nodemailer = require('nodemailer')


const sendConsulta = async function(req,res){
    console.log('holaaa');
    let config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '247burgeralixar@gmail.com',
            pass: process.env.passwdAplication
        }
    })
    try {
        await config.sendMail({
            from: req.body.email,
            to: '247burgeralixar@gmail.com',
            subject: req.body.asunto,
            text: `El usuario ${req.body.nombre}, nos comunica: ${req.body.descipcion} \n \n 24/7 BURGER | LAS MEJORES HAMBURGUESAS DE SEVILLA`
        })
        res.status(200).json({ status: 'Consulta Enviada Correctamente' })
    } catch (error) {
        res.status(401).json({ status: 'Consulta No Enviada Correctamente' })
    }
}

module.exports = {
    sendConsulta
};