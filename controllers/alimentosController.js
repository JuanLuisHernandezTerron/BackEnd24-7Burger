const modelAlimento = require ('./../models/alimentos');
const { response, json } = require('express');

const updateAlimento = async function (req,res){
    try {
        var alimento = {};
        const searchProduct = await modelAlimento.findById({_id: req.params.id}).exec();
        let arrayExtras = [];
        let arrayAlergenos = [];
        if (req.body.tipoAlimento === "Hamburguesa" || req.body.tipoAlimento === "Postre") {
            const Extras= JSON.parse(req.body.extras);
                arrayExtras = [];
                const Alergenos= JSON.parse(req.body.alergenos);
            for (let i = 0; i < Extras.length; i++) {
                arrayExtras.push({nombre:Extras[i].nombre,precio:Extras[i].precio});
                boolean = true;
            }
            for (let i = 0; i < Alergenos.length; i++) {
                console.log(Alergenos[i].nombre);
                arrayAlergenos.push({
                    nombre:Alergenos[i].nombre,
                    imagen:Alergenos[i].imagen               
                });
    
            }
        }

        if (searchProduct){
            console.log(req.file);
            if (req.file === undefined) {
                alimento = {
                    nombre:req.body.nombre,
                    descripcion:req.body.descripcion,
                    ingredientes:req.body.ingredientes,
                    alergenos:arrayAlergenos,
                    tipoAlimento:req.body.tipoAlimento,
                    precio:req.body.precio,
                    extras:arrayExtras
                };
            }else{
                alimento = {
                    nombre:req.body.nombre,
                    descripcion:req.body.descripcion,
                    ingredientes:req.body.ingredientes,
                    alergenos:arrayAlergenos,
                    tipoAlimento:req.body.tipoAlimento,
                    precio:req.body.precio,
                    imagen:'http://localhost:3000/uploads/' + req.file.filename,
                    extras:arrayExtras
                };
            }
            await modelAlimento.findByIdAndUpdate({_id:req.params.id},alimento).exec();
            let alimentos = await modelAlimento.find().exec();
            res.status(200).json({status:"Actualizado Correctamente",alimentos});
        }else{
            res.status(401).json("Producto no encontrado");
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllAlimentos = async function(req,res){
    try{
        const consulta = await modelAlimento.find().exec();
        if (consulta) {
            res.status(200).json(consulta);
        }else{
            res.status(401).json("Productos No encontrados correctamente");
        }
    }catch(e){
        console.log(e);
    }
}

const newAlimento = async function (req,res){
    let arrayExtras = [];
    let arrayAlergenos = [];
    if (req.body.tipoAlimento === "Hamburguesa" || req.body.tipoAlimento === "Postre") {
        const Extras= JSON.parse(req.body.extras);
        const Alergenos= JSON.parse(req.body.alergenos);
        for (let i = 0; i < Extras.length; i++) {
            arrayExtras.push({nombre:Extras[i].nombre,precio:Extras[i].precio});
        }
        for (let i = 0; i < Alergenos.length; i++) {
            console.log(Alergenos[i].nombre);
            arrayAlergenos.push({
                nombre:Alergenos[i].nombre,
                imagen:Alergenos[i].imagen               
            });

        }
    }

    try{
        const alimento = {
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            ingredientes:req.body.ingredientes,
            alergenos:arrayAlergenos,
            tipoAlimento:req.body.tipoAlimento,
            precio:req.body.precio,
            imagen:'http://localhost:3000/uploads/' + req.file.filename,
            extras:arrayExtras
        };
        console.log(alimento);
        let filterAlimento = await modelAlimento.findOne({nombre:alimento.nombre}).exec();
        if (filterAlimento) {
            res.status(401).json("Alimento mal Introducido o ya existente")
        }else{
            await modelAlimento.create(alimento);
            const products = await modelAlimento.find().exec();
            res.status(200).json(products);
        }
    }catch(e){
        console.log(e);
    }
}

const deleteAlimento = async function (req,res){
    console.log(req.params.id);

    try{
        const borrarAlimento = await modelAlimento.deleteOne({_id:req.params.id}).exec();
        console.log(borrarAlimento.deletedCount);
        if(borrarAlimento.deletedCount == 0){
            res.status(401).json("No existe ningun alimento para borrar")
        }else{
            let alimentos = await modelAlimento.find().exec();
            console.log(alimentos);
            res.status(200).json({status: "Alimento Eliminado Correctamente", alimentos});
        }
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    newAlimento,
    deleteAlimento,
    getAllAlimentos,
    updateAlimento
}