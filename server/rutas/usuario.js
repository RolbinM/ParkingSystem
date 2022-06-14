const express = require ('express')
const router = express.Router()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaFuncionario = Schema ({

    Identificacion:{
        type:Number,
        requiered:false,
    },
    Nombre:{
        type:String,
        requiered:false,
    },
    Celular:{
        type:Number,
        requiered:false,
    },
    Correo:{
        type:String,
        requiered:false,
    },
    Placas:{
        type:[String],
        requiered:false,
    },
    Horario:{
        type:[Object],
        requiered:false,
    },
    Sede:{
        type:String,
        requiered:false,
    },
    Departamento:{
        type:String,
        requiered:false,
    },
    Puesto:{
        type:String,
        requiered:false,
    },
    Usuario:{
        type:String,
        requiered:false,
    },
    Passwrd:{
        type:String,
        requiered:false,
    }

});

const ModeloFuncionario = mongoose.model('funcionarios',schemaFuncionario)
module.exports = router

//agregar usuarios
router.post ('/agregarfuncionario', async(req,res)=>{
    //console.log(req.body);
    const newFuncionario = new ModeloFuncionario ({
        Identificacion: req.body.Identificacion,
        Nombre: req.body.Nombre,
        Celular: req.body.Celular,
        Correo: req.body.Correo,
        Placas:req.body.Placas,
        Sede: req.body.Sede,
        Departamento:req.body.Departamento,
        Puesto:req.body.Puesto,
        Usuario: req.body.Usuario,
        Passwrd: req.body.Passwrd,
        Horario: req.body.Horario

    });

    //const newFuncionario = req.body;
    //newFuncionario['Placas'] = []
    //newFuncionario['Horario'] = {}
    //console.log(newFuncionario.Horario);
    newFuncionario.save(function(err){
        if(!err){
            res.send('Usuario agregado correctamente')
        }else{
            res.send(err)
        }
    })
})


//obtener todos los funcionarios
router.get ('/obtenerfuncionarios', async(req,res)=>{
    ModeloFuncionario.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener data funcionario
router.post ('/obtenerdatafuncionario', async(req,res)=>{
    ModeloFuncionario.find({Identificacion:req.body.idfuncionario}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//obtener data funcionario
router.post ('/obtenerdatafuncionario2', async(req,res)=>{
    ModeloFuncionario.find({Usuario:req.body.user}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


//actualizar funcionarios
router.post ('/actualizafuncionario', async(req,res)=>{
    ModeloFuncionario.findOneAndUpdate({Identificacion:req.body.Identificacion},{
        Nombre: req.body.Nombre,
        Celular: req.body.Celular,
        Correo: req.body.Correo,
        Escuela:req.body.Escuela,
        Placas:req.body.Placas,
        Sede: req.body.Sede,
        Departamento:req.body.Departamento,
        Puesto:req.body.Puesto,
        Usuario: req.body.Usuario,
        Passwrd: req.body.Passwrd,
        Horario: req.body.Horario
        
    }, (err) => {
        if(!err){
            res.send("usuario actualizado correctamente")
        }else{
            res.send(err)
        }
    })
    console.log(req);
})


//eliminar funcionarios
router.post ('/borrarfuncionario', async(req,res)=>{
    
    ModeloFuncionario.findOneAndDelete({Identificacion:req.body.idfuncionario}, (err) => {
        if(!err){
            res.send("usuario eliminado correctamente")
        }else{
            console.log(req)
            res.send(err) 
        }
    })
})

//obtener horario funcionario
router.post ('/obtenerhorariofuncionario', async(req,res)=>{
    ModeloFuncionario.find({Identificacion:req.body.idfuncionario}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//eliminar placas funcionarios
router.post ('/borrarplacafuncionario', async(req,res)=>{

    ModeloFuncionario.findOneAndUpdate({Identificacion:req.body.idfuncionario}, 
        { $pull: { Placas: req.body.idplaca}},
        (err) => {
        if(!err){
            console.log(req)
            res.send("Placa eliminada correctamente")
        }else{
            console.log(req.body.idplaca)
            res.send(err) 
        }
    })
    

})

//eliminar placas funcionarios
router.post ('/agregarplacafuncionario', async(req,res)=>{

    ModeloFuncionario.findOneAndUpdate({Identificacion:req.body.idfuncionario}, 
        { $addToSet: { Placas: req.body.idplaca}},
        (err) => {
        if(!err){
            console.log(req)
            res.send("Placa agregada correctamente")
        }else{
            console.log(req.body.idplaca) 
            res.send(err) 
        }
    })
    

})


//actualiza horario funcionarios
router.post ('/editarhorariofuncionario', async(req,res)=>{
    ModeloFuncionario.findOneAndUpdate({Identificacion:req.body.idfuncionario}, {
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
router.post ('/editarhorariofuncionario2', async(req,res)=>{

    ModeloFuncionario.findOneAndUpdate({Identificacion:req.body.idfuncionario},
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
