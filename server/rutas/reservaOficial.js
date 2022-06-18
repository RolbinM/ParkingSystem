const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservaOficialSchema = new Schema({
    IdReserva:{
        type: String,
        required: true
    },
    IdOperador:{
        type: Number,
        required: true
    },
    IdParqueo:{
        type: Number,
        required: true
    },
    Placa:{
        type: String,
        required: true
    },
    Modelo:{
        type: String,
        required: true
    },
    Color:{
        type: String,
        required: true
    },
    Chofer:{
        type: String,
        required: true
    },
    Dia:{
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


const ModeloReservaOficial = mongoose.model("reservaoficial", ReservaOficialSchema)
module.exports = router


//agregar parqueos
router.post ('/agregarreservaoficial', async(req,res)=>{
    const newReservaOficial = new ModeloReservaOficial ({
        IdReserva: req.body.IdReserva,
        IdOperador: req.body.IdOperador,
        IdParqueo: req.body.IdParqueo,
        Placa: req.body.Placa,
        Modelo: req.body.Modelo,
        Color: req.body.Color,
        Chofer: req.body.Chofer,
        Dia: req.body.Dia,
        FechaReserva: req.body.FechaReserva,
        HoraEntrada : req.body.HoraEntrada,
        HoraSalida:req.body.HoraSalida
    });

    newReservaOficial.save(function(err){
        if(!err){
            res.send('Reserva agregada correctamente')
        }else{
            res.send(err)
        }
    })
})

//obtener data reservas oficiales
router.post ('/obtenerreservasoficiales', async(req,res)=>{
    ModeloReservaOficial.find({IdParqueo: req.body.IdParqueo}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener data reservas oficiales
router.post ('/obtenerreservasoficialesvigentes', async(req,res)=>{
    ModeloReservaOficial.find({FechaReserva: req.body.FechaReserva, IdParqueo: req.body.IdParqueo}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})
