const pedido = require('./../models/pedido');
const alimento = require('./../models/alimentos');

const newPedido = async function (req, res) {
    try{
        const pedidoAux = req.body;
        await pedido.create(pedidoAux);
        res.status(200).json('Pedido realizado con éxito');
    }catch(e){
        console.log(e);
    }
}
const enProceso = async function (req, res) {
    try{
        await pedido.updateOne({_id: req.body._id},{estado_pedido: "En proceso"});
        res.status(200).json('Estado cambiado con éxito');
        
    }catch(e){
        console.log(e);
    }
}
const pedidoFinalizado = async function (req, res) {
    try{
        await pedido.updateOne({_id: req.body._id},{estado_pedido: "Finalizado"});
        res.status(200).json('Estado cambiado con éxito');
        
    }catch(e){
        console.log(e);
    }
}

const getPedidos = async function (req, res) {
    try{
        const pedidos = await pedido.find().populate('datos_pedido.id_alimento').exec();
        if (pedidos) {
            res.status(200).json(pedidos);
        }else{
            res.status(401).json("Productos No encontrados correctamente");
        }
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    newPedido,
    enProceso,
    pedidoFinalizado,
    getPedidos
}