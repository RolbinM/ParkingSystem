const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema



const ReservaSchema = new Schema({
    IdReserva:{
        type: String,
        required: true
    },
    IdUsuario:{
        type: Number,
        required: true
    },
    IdParqueo:{
        type: Number,
        required: true
    },
    Placa:{
        type:String,
        requiered:false,
    },
    TipoReserva:{
        type: String,
        required: true
    },
    Dia:{
        type: String,
        required: true
    },
    Fecha:{
        type: String,
        required: true
    },
    FechaReserva:{
        type: String,
        required: true
    },
    HoraEntrada:{
        type: String,
        required: true
    },
    HoraSalida:{
        type: String,
        required: true
    }
})


const ModeloReserva = mongoose.model("reserva", ReservaSchema)
module.exports = router


//agregar parqueos
router.post ('/agregarreserva', async(req,res)=>{
    console.log(req.body);
    const newReserva = new ModeloReserva ({
        IdReserva: req.body.IdReserva,
        IdUsuario: req.body.Usuario,
        IdParqueo: req.body.IdParqueo,
        Placa: req.body.Placa,
        TipoReserva: req.body.TipoReserva,
        Dia: req.body.Dia,
        Fecha : req.body.Fecha,
        FechaReserva: req.body.FechaReserva,
        HoraEntrada : req.body.HoraEntrada,
        HoraSalida:req.body.HoraSalida,
    });

    newReserva.save(function(err){
        if(!err){
            res.send('Reserva agregada correctamente')
        }else{
            res.send(err)
        }
    })
})

router.post ('/obtenertodaslasreservas', async(req,res)=>{
    ModeloReserva.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener data funcionario
router.post ('/obtenerreservasfuncionario', async(req,res)=>{
    ModeloReserva.find({IdUsuario:req.body.identificacion}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



//obtener data funcionario
router.post ('/obtenerreservasportipo', async(req,res)=>{
    ModeloReserva.find({TipoReserva:req.body.TipoReserva,FechaReserva:req.body.FechaReserva, IdParqueo: req.body.IdParqueo}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener data funcionario
router.post ('/obtenerreservasparametrizadas', async(req,res)=>{
    ModeloReserva.find({IdUsuario:req.body.Identificacion, IdParqueo: req.body.IdParqueo}, 
        function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


//obtener data funcionario
router.post ('/obtenerreservasEsimulador', async(req,res)=>{
    ModeloReserva.find({FechaReserva:req.body.fechaEntrada}, 
        function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


//obtener data funcionario
router.post ('/obtenerreservasportiporeserva', async(req,res)=>{
    ModeloReserva.find({TipoReserva:req.body.TipoReserva,IdParqueo: req.body.IdParqueo}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



router.post ('/obtenerreservasporparqueoreserva', async(req,res)=>{
    ModeloReserva.find({IdParqueo: req.body.IdParqueo}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})