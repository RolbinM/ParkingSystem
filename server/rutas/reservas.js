const express = require ('express')
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema



const ReservaSchema = new Schema({
    IdReserva:{
        type: Number,
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
    Dia:{
        type: String,
        required: true
    },
    Fecha:{
        type: Date,
        required: true
    },
    HoraEntrada:{
        type: Date,
        required: true
    },
    HoraSalida:{
        type: Date,
        required: true
    }
})


const ModeloReserva = mongoose.model("reserva", ReservaSchema)
module.exports = router


//agregar parqueos
router.post ('/agregarreserva', async(req,res)=>{
    //console.log(req.body);

    collection.find({Numero:req.body.IdParqueo}, function(docs, err){
        if(!err){
            //const cantidadEspacios = docs.data.Espacios
            res.send(docs)
        }else{
            res.send(err)
        }
    })

    // const newReserva = new ModeloReserva ({
    //     IdReserva: req.body.Numero,
    //     IdUsuario: req.body.Nombre,
    //     IdParqueo: req.body.Tipo,
    //     Placa: req.body.Ubicacion,
    //     Fecha : req.body.Encargado,
    //     HoraEntrada : req.body.NumeroEncargado,
    //     HoraSalida:req.body.Horario,
    // });

    // newParqueo.save(function(err){
    //     if(!err){
    //         res.send('Parqueo agregado correctamente')
    //     }else{
    //         res.send(err)
    //     }
    // })
})