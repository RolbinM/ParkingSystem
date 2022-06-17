const express = require('express')
var bodyParser = require('body-parser')

const app = express()

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

// create application/json parser
var jsonParser = bodyParser.json()
app.use(jsonParser)

 // create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

app.use(cors(corsOptions)) // Use this after the variable declaration

//Conexion a la BD
const archivoBD = require('./conexion')

//importar rutas y modelos de los usuarios
const rutafuncionario = require('./rutas/usuario')
app.use('/api/funcionario', rutafuncionario)

//importar rutas y modelos de los operadores
const rutaoperador = require('./rutas/operadorParqueo')
app.use('/api/operador', rutaoperador)

//importar rutas y modelos de los administrador
const rutaadmin = require('./rutas/administrador')
app.use('/api/administrador', rutaadmin)

//importar rutas y modelos de los parqueo
const rutaparqueo = require('./rutas/parqueo')
app.use('/api/parqueo', rutaparqueo)

//importar reservas y modelos de las reservas
const rutareserva = require('./rutas/reservas')
app.use('/api/reserva', rutareserva)

//importar reservasVisitas y modelos de las reservas
const rutareservainvitado = require('./rutas/reservaInvitado')
app.use('/api/reservaInvitado', rutareservainvitado)

app.get('/', (req, res)=>{
    res.end('Bienvenidos al servidor, ejecutandose...')
})

//configuracion 
app.set('port', process.env.PORT || 3001);


// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});