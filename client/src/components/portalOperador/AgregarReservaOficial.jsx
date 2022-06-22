import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {MenuOperador} from "../MenuOperador"
import {useParams } from "react-router-dom";
const { v4: uuidv4 } = require('uuid');


export function AgregarReservaOficial(){
        const params = useParams()

        const [parqueo, setParqueo]=useState(null)

        const [placa, setPlaca]=useState('')
        const [color, setColor]=useState('')
        const [modelo, setModelo]=useState('')
        const [chofer, setChofer]=useState('')

        const [horaEntrada, setHoraEntrada]=useState('')

        const [cantidadEspacios, setEspacios]=useState(null)
        const [cantidadReservasUsuario, setCantidadReservasUsuario]=useState(null)
        const [espaciosOcupados, setEspaciosOcupados]=useState(null)
        const [show, setShow] = useState(true);

        const navegar = useNavigate()


        useEffect(() => {
                axios.post("http://localhost:3001/api/parqueo/obtenerparqueo", {Numero: params.idparqueo})
                .then(res => {
                        setParqueo(res.data[0])
                        setEspacios(res.data[0].EspaciosOficiales)
                })

            }, [])

        function cambiarDatosParqueo(){
                const dias = parqueo.Horario

                var nombresdias = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                var dia = new Date();
                var nombredia = nombresdias[dia.getDay()];

                for (var dia of dias){
                        if (dia.day === nombredia){
                                var horaEntradaParqueo = document.getElementById("horaEntradaParqueo")
                                horaEntradaParqueo.value = dia.start_time

                                var horaSalidaParqueo = document.getElementById("horaSalidaParqueo")
                                horaSalidaParqueo.value = dia.end_time
                        }
                }
        }

        async function espaciosDisponibles(){
                var dia = new Date();
                var date = `${dia.getFullYear()}-${dia.getMonth()+1}-${dia.getDate()}`;
                await axios.post("http://localhost:3001/api/reservaoficial/obtenerreservasoficialesvigentes", {IdParqueo: params.idparqueo, FechaReserva: date})
                .then(res => {

                        var cierre = document.getElementById("horaCierre")
                        var hEntrada = horaEntrada
                        var hSalida = cierre.value
                        console.log(hEntrada + "   " + hSalida)
                        const listaReservas = res.data;
                        var contador = 0;
                        var contador2 = 0;

                        for(var reserva in listaReservas){
                                var reservaEntrada = listaReservas[reserva].HoraEntrada
                                var reservaSalida = listaReservas[reserva].HoraSalida

                                if((reservaEntrada >= hEntrada && reservaSalida > hEntrada) || (reservaEntrada < hSalida && reservaSalida >= hSalida )){
                                        contador = contador + 1
                                } else {
                                        if((reservaEntrada > hEntrada) && (reservaSalida > hSalida)){
                                                contador = contador + 1
                                        }
                                }

                                if(listaReservas[reserva].Placa == placa){
                                        contador2 = contador2 + 1
                                }
                        }

                        setCantidadReservasUsuario(contador2)
                        setEspaciosOcupados(contador)

                } )
        }
        
        function parqueoAbierto(){
                const dias = parqueo.Horario

                var nombresdias = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                var dia = new Date();
                var nombredia = nombresdias[dia.getDay()];

                for (var dia of dias){
                        if (dia.day === nombredia){
                                var cierre = document.getElementById("horaCierre")
                                cierre.value = dia.end_time 

                                if(horaEntrada < dia.end_time  && horaEntrada > dia.start_time){
                                        return true;
                                }
                                else {
                                        return false;
                                }
                        }
                }
                return false;
        }

        
        async function agregarReserva(){
                if(parqueoAbierto()){
                        espaciosDisponibles()
                        if(espaciosOcupados < cantidadEspacios && cantidadReservasUsuario < 1){
                                var cierre = document.getElementById("horaCierre")
                                
                                var nombresdias = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                                var dia = new Date();
                                var date = `${dia.getFullYear()}-0${dia.getMonth()+1}-${dia.getDate()}`;
                                var nombredia = nombresdias[dia.getDay()];

                                var reserva = {
                                         IdReserva: uuidv4(),
                                         IdOperador: params.user,
                                         IdParqueo: params.idparqueo,
                                         Placa: placa,
                                         Modelo: modelo,
                                         Color: color,
                                         Chofer: chofer,
                                         Dia: nombredia,
                                         FechaReserva: date,    
                                         HoraEntrada: horaEntrada,
                                         HoraSalida: cierre.value
                                 }

                                 axios.post("http://localhost:3001/api/reservaoficial/agregarreservaoficial", reserva)
                                 .then (res => {
                                         Swal.fire('Correcto', 'La reserva ha sido creado')
                                         const ruta = "/parqueosoperador/"
                                         navegar(ruta.concat(params.user))

                                 }).catch(err => {
                                         console.log(err)
                                })  
                        }
                        else {
                                Swal.fire('Incorrecto', 'No hay espacios disponibles para la reserva')
                        }
                
                }
                else {

                        Swal.fire('Incorrecto', 'El horario indicado no es aceptado por el sistema')
                }          
        }

        function changeState() {
                setShow(!show);
         }        

        return(
        <div className="App" align="Center">
                <MenuOperador/>
                <div className="container">
                <div className="row">
                        <h2 className="mt-4"> Generar reserva</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">

                        <div className="mb-3">
                                <label htmlFor="operador" className="form-label">Operador a Cargo</label>
                                <input type="text" className="form-control" value={params.user} readOnly></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="placa" className="form-label">Placa</label>
                                <input type="text" className="form-control" value={placa} 
                                        onChange={(e)=> {setPlaca(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="modelo" className="form-label">Modelo</label>
                                <input type="text" className="form-control" value={modelo} 
                                        onChange={(e)=> {setModelo(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="color" className="form-label">Color</label>
                                <input type="text" className="form-control" value={color} 
                                        onChange={(e)=> {setColor(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="chofer" className="form-label">Chofer</label>
                                <input type="text" className="form-control" value={chofer} 
                                        onChange={(e)=> {setChofer(e.target.value)}}></input>
                        </div>


                        <div className="mb-3">
                                <label htmlFor="horaEntrada" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" value={horaEntrada} 
                                        onChange={(e)=> {setHoraEntrada(e.target.value)}}></input>

                                <input type="text" id="horaCierre" hidden className="form-control" value=""></input>
                                <input type="text" id="finJornada" hidden className="form-control" value=""></input>
                        </div>

                        <br /><br />
                        <div className="mb-3">
                                <h4>Horario del Parqueo para el día seleccionado</h4>
                                <br />
                                <button onClick={()=> {cambiarDatosParqueo()}} className="btn btn-success">Cargar Horario</button>    
                        </div>
                        <div className="mb-3">
                                <label htmlFor="horaEntradaParqueo" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" id="horaEntradaParqueo" readOnly></input>
                        </div>
                        <div className="mb-3">
                                <label htmlFor="horaSalidaParqueo" className="form-label">Hora de Salida</label>
                                <input type="time" className="form-control" id="horaSalidaParqueo" readOnly></input>
                        </div>

                        {show ? (
                                <button onClick={()=> {changeState();espaciosDisponibles()}} className="btn btn-success">Reservar</button>
                        ) : (
                                <button onClick={()=> {changeState();agregarReserva()}} className="btn btn-success">Reservar</button>
                        )}

                        </div>
                </div>
                </div>
        </div>
        )


}