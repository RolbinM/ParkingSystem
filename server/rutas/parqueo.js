const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ParqueoSchema = new Schema({
    Numero:{
        type: Number,
        required: true
    },

    Nombre:{
        type: String,
        required: true
    },

    Tipo:{
        type:String,
        requiered:false,
    },

    Ubicacion:{
        type: String,
        required: true
    },

    Encargado:{
        type: String,
        required: true
    },

    NumeroEncargado:{
        type: Number,
        required: true
    },


    Horario:{
        type:[Object],
        requiered:false,
    },

    Espacios:{
        type: Number,
        requiered:false,
    },

    EspaciosVisitantes:{
        type: Number,
        requiered:false,
    },

    EspaciosOficiales:{
        type: Number,
        requiered:false,
    },

    EspaciosReservados:{
        type: Number,
        requiered:false,
    },

    EspaciosDiscapacitados:{
        type: Number,
        requiered:false,
    }

})


const ModeloParqueo = mongoose.model("parqueo", ParqueoSchema)
module.exports = ModeloParqueo
module.exports = router


//agregar parqueos
router.post ('/agregarparqueo', async(req,res)=>{
    //console.log(req.body);
    const newParqueo = new ModeloParqueo ({
        Numero: req.body.Numero,
        Nombre: req.body.Nombre,
        Tipo: req.body.Tipo,
        Ubicacion: req.body.Ubicacion,
        Encargado : req.body.Encargado,
        NumeroEncargado : req.body.NumeroEncargado,
        Horario:req.body.Horario,
        Espacios: req.body.Espacios,
        EspaciosDiscapacitados: req.body.EspaciosDiscapacitados,
        EspaciosOficiales: req.body.EspaciosOficiales,
        EspaciosReservados: req.body.EspaciosReservados,
        EspaciosVisitantes: req.body.EspaciosVisitantes
    });

    newParqueo.save(function(err){
        if(!err){
            res.send('Parqueo agregado correctamente')
        }else{
            res.send(err)
        }
    })
})


//obtener todos los parqueos
router.get ('/obtenerparqueos', async(req,res)=>{
    ModeloParqueo.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener todos los parqueos
router.post ('/obtenerparqueo', async(req,res)=>{
    ModeloParqueo.find({Numero:req.body.Numero}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


//obtener todos los parqueos por operador
router.post ('/obtenerparqueooperador', async(req,res)=>{
    ModeloParqueo.find({Encargado:req.body.operador}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



//obtener datos de un parqueo
router.post ('/obtenerdatosparqueo', async(req,res)=>{
    ModeloParqueo.find({Numero:req.body.idNumero}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



//Actualizar parqueo
router.post ('/actualizarparqueo', async(req,res)=>{
    ModeloParqueo.findOneAndUpdate({Numero:req.body.Numero},{
        Nombre: req.body.Nombre,
        Tipo: req.body.Tipo,
        Ubicacion: req.body.Ubicacion,
        Encargado : req.body.Encargado,
        NumeroEncargado : req.body.NumeroEncargado,
        Horario:req.body.Horario,
        Espacios: req.body.Espacios,
        EspaciosDiscapacitados: req.body.EspaciosDiscapacitados,
        EspaciosOficiales: req.body.EspaciosOficiales,
        EspaciosReservados: req.body.EspaciosReservados,
        EspaciosVisitantes: req.body.EspaciosVisitantes
        
    }, (err) => {
        if(!err){
            res.send("Parqueo actualizado correctamente")
        }else{
            res.send(err)
        }
    })
    console.log(req);
})


//eliminar parqueo
router.post ('/borrarparqueo', async(req,res)=>{
    ModeloParqueo.findOneAndDelete({Numero:req.body.idNumero}, (err) => {
        if(!err){
            res.send("Parqueo eliminado correctamente")
        }else{
            console.log(req)
            res.send(err) 
        }
    })
})


//obtener horario parqueo
router.post ('/obtenerhorarioparqueo', async(req,res)=>{
    ModeloParqueo.find({Numero:req.body.idNumero}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



//obtener espacios parqueo
router.post ('/obtenerespaciosparqueo', async(req,res)=>{
    ModeloParqueo.find({Numero:req.body.idNumero}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})




//actualiza horario funcionarios
router.post ('/editarhorarioparqueo', async(req,res)=>{
    ModeloParqueo.findOneAndUpdate({Numero:req.body.idNumero}, {
        $pull:{Horario : {day:req.body.iddia}}
        },
        (err) => {
        if(!err){
            console.log(req)
            res.send("Horario actualizado correctamente")
        }else{
            console.log(req.body)
            res.send(err) 
        }
    })
})


//actualiza horario funcionarios
router.post ('/editarhorarioparqueo2', async(req,res)=>{
    ModeloParqueo.findOneAndUpdate({Numero:req.body.idNumero},
        {
        $push:{Horario : {
            day:req.body.iddia,
            start_time:req.body.actualizardia.start_time,
            end_time:req.body.actualizardia.end_time
        }}
        },
        (err) => {
        if(!err){
            console.log(req)
            res.send("Horario actualizado correctamente")
        }else{
            console.log(req.body)
            res.send(err) 
        }
    })
})
