const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema



const OperadorSchema = new Schema({
    Identificacion:{
        type: String,
        required: true
    },
    Nombre:{
        type: String,
        required: true
    },
    Usuario:{
        type: String,
        required: true
    },
    Contra:{
        type: String,
        required: true
    }
})


const ModeloOperador = mongoose.model("operador", OperadorSchema)
module.exports = router

// Login operador
router.post ('/login', async(req,res)=>{
    ModeloOperador.find({Usuario:req.body.usuario, Contra: req.body.contra}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


//agregar operador
router.post ('/agregaroperador', async(req,res)=>{
    const newOperador = new ModeloOperador ({
        Identificacion: req.body.Identificacion,
        Nombre: req.body.Nombre,
        Usuario: req.body.Usuario,
        Contra: req.body.Contra
    });

    newOperador.save(function(err){
        if(!err){
            res.send('Operador Agregado correctamente')
        }else{
            res.send(err)
        }
    })
})


//obtener todos los operadores
router.get ('/obteneroperadores', async(req,res)=>{
    ModeloOperador.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//eliminar operador
router.post ('/borraroperador', async(req,res)=>{
    ModeloOperador.findOneAndDelete({Identificacion:req.body.idoperador}, (err) => {
        if(!err){
            res.send("usuario eliminado correctamente")
        }else{
            console.log(req)
            res.send(err) 
        }
    })
})

//obtener data operador
router.post ('/obtenerdataoperador', async(req,res)=>{
    ModeloOperador.find({Identificacion:req.body.idoperador}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener data operador por usuario
router.post ('/obtenerdataoperador2', async(req,res)=>{
    ModeloOperador.find({Usuario:req.body.user}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



//actualizar operador
router.post ('/actualizaroperador', async(req,res)=>{
    ModeloOperador.findOneAndUpdate({Identificacion:req.body.Identificacion},{
        Nombre: req.body.Nombre,
        Usuario: req.body.Usuario,
        Contra: req.body.Contra
        
    }, (err) => {
        if(!err){
            res.send("usuario actualizado correctamente")
        }else{
            res.send(err)
        }
    })
    console.log(req);
})


