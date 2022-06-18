const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservaInvitadoSchema = new Schema({
    IdReserva:{
        type: String,
        required: true
    },
    IdUsuario:{
        type: Number,
        required: true
    },
    IdVisitante:{
        type: Number,
        required: true
    },
    IdParqueo:{
        type: Number,
        required: true
    },
    NombreV:{
        type: String,
        required: true
    },
    PlacaV:{
        type: String,
        required: true
    },
    TipoReserva:{
        type: String,
        required: true
    },
    Motivo:{
        type:String,
        requiered:false,
    },
    SitioVisita:{
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


const ModeloReservaInvitado = mongoose.model("reservainvitado", ReservaInvitadoSchema)
module.exports = router


//agregar parqueos
router.post ('/agregarreservainvitado', async(req,res)=>{
    console.log(req.body);
    const newReservaInvitado = new ModeloReservaInvitado ({
        IdReserva: req.body.IdReserva,
        IdUsuario: req.body.Usuario,
        IdVisitante: req.body.Visitante,
        IdParqueo: req.body.IdParqueo,
        NombreV: req.body.NombreV,
        PlacaV: req.body.PlacaV,
        TipoReserva: req.body.TipoReserva,
        Motivo: req.body.Motivo,
        SitioVisita: req.body.SitioVisita,
        Dia: req.body.Dia,
        Fecha : req.body.Fecha,
        FechaReserva: req.body.FechaReserva,
        HoraEntrada : req.body.HoraEntrada,
        HoraSalida:req.body.HoraSalida
    });

    newReservaInvitado.save(function(err){
        if(!err){
            res.send('Reserva agregada correctamente')
        }else{
            res.send(err)
        }
    })
})

//obtener data funcionario
router.post ('/obtenerreservasinvitado', async(req,res)=>{
    ModeloReservaInvitado.find({IdParqueo: req.body.IdParqueo}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener data funcionario
router.post ('/obtenerreservasinvitadoId', async(req,res)=>{
    ModeloReservaInvitado.find({IdUsuario:req.body.identificacion}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



//obtener data reserva por tipo 
router.post ('/obtenerreservasinvitadoporparqueo', async(req,res)=>{
    ModeloReserva.find({IdParqueo:req.body.TipoReserva,FechaReserva:req.body.FechaReserva}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener data reservas oficiales
router.post ('/obtenerreservasinvitadosvigentes', async(req,res)=>{
    ModeloReservaOficial.find({FechaReserva: req.body.FechaReserva, IdParqueo: req.body.IdParqueo}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})