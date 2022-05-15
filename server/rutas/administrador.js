const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdministradorSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },

    usuario:{
        type: String,
        required: true
    },

    contraseña:{
        type: String,
        required: true
    },
})


const ModeloAdministrador = mongoose.model("Administrador", AdministradorSchema)
module.exports = router


router.get('/crearAdministrador', async (req, res)=>{
    const administrador = new ModeloAdministrador({nombre: "SAADMIN", usuario: "sa", contraseña: "sa"});

    try {
        await administrador.save();
        res.send("Insercion exitosa")
    } catch (err) {
        console.log(err);
    }
});


router.post ('/login', async(req,res)=>{
    ModeloAdministrador.find({usuario:req.body.usuario, contraseña: req.body.contra}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


