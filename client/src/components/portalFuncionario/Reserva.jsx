import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {MenuFuncionario} from "../MenuFuncionario"
import {useParams } from "react-router-dom";
const { v4: uuidv4 } = require('uuid');


export function Reserva(){
        const params = useParams()
        //hooks

        const [placa, setPlaca]=useState('')
        const [diaReserva, setdia]=useState("sunday")
        const [horaEntrada, setHoraEntrada]=useState('')
        const [placasList, setPlacas]=useState([])
        const [cantidadEspacios, setEspacios]=useState(null)
        const [parqueo, setParqueo]=useState(null)
        const [funcionario, setFuncionario]=useState(null)
        const [fechaReserva, setFechaReserva]=useState(null)

        const [espaciosOcupados, setEspaciosOcupados]=useState(null)
        //const navegar = useNavigate()

        useEffect(() => {
                axios.post('http://localhost:3001/api/funcionario/obtenerdatafuncionario2', 
                {user: params.user}).then(res => {
                        setPlacas(res.data[0].Placas)
                        setFuncionario(res.data[0])
                        
                })
                axios.post("http://localhost:3001/api/parqueo/obtenerparqueo", {Numero: params.idparqueo})
                .then(res => {
                        setParqueo(res.data[0])
                        setEspacios(res.data[0].Espacios)
                })
            }, [])
        
        function cambiarDatosFuncionario(fecha){
                const diasFuncionario = funcionario.Horario

                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                var dia = new Date(fecha);
                var nombredia = nombresdias[dia.getDay()];

                for (var diaF of diasFuncionario){
                        if (diaF.day === nombredia){
                                var horaEntradaFuncionario = document.getElementById("horaEntradaFuncionario")
                                horaEntradaFuncionario.value = diaF.start_time

                                var horaSalidaFuncionario = document.getElementById("horaSalidaFuncionario")
                                horaSalidaFuncionario.value = diaF.end_time
                        }
                }
        }

        function cambiarDatosParqueo(fecha){
                const dias = parqueo.Horario

                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                var dia = new Date(fecha);
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

        function espaciosDisponibles(){
                
                axios.post("http://localhost:3001/api/reserva/obtenerreservasportipo", {TipoReserva: "Estandar", FechaReserva: fechaReserva})
                .then(res => {
                        var cierre = document.getElementById("horaCierre")

                        var hEntrada = horaEntrada
                        var hSalida = cierre.value

                        const listaReservas = res.data;
                        var contador = 0;

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
                        }

                        console.log(res.data)
                        console.log("El contador es: " + contador)

                        setEspaciosOcupados(contador)
                } )
        }
        
        function parqueoAbierto(){
                const dias = parqueo.Horario
                const diasFuncionario = funcionario.Horario

                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                var dia = new Date(fechaReserva);
                var nombredia = nombresdias[dia.getDay()];

                console.log("Nombre Dia: " + nombredia)

                for (var dia of dias){
                        if (dia.day === nombredia){
                                var cierre = document.getElementById("horaCierre")
                                cierre.value = dia.end_time

                        }
                }
                for (var diaF of diasFuncionario){
                        if (diaF.day === nombredia){
                                var finJornada = document.getElementById("finJornada")
                                finJornada.value = diaF.end_time
                                if(diaF.end_time <= dia.end_time && horaEntrada >= dia.start_time ){
                                        if(horaEntrada >= diaF.start_time){
                                                return true;      
                                        }
                                        else{
                                                return false;

                                        }
                                }
                                else{
                                        return false;
                                }

                        }
                }

        }
        async function agregarReserva(){
                console.log(params.idparqueo)
                if(parqueoAbierto()){
                        espaciosDisponibles()

                        if(espaciosOcupados < cantidadEspacios){
                                var cierre = document.getElementById("horaCierre")
                                console.log(cierre.value)
                
                                var finJornada = document.getElementById("finJornada")
                                console.log(finJornada.value)
                                
                                const current = new Date();
                                const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
                                
                                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                                var dia = new Date(fechaReserva);
                                var nombredia = nombresdias[dia.getDay()];

                                var reserva = {
                                         IdReserva: uuidv4(),
                                         Usuario: funcionario.Identificacion,
                                         IdParqueo: params.idparqueo,
                                         Placa: placa,
                                         TipoReserva: "Estandar",
                                         Dia: nombredia,
                                         Fecha: date,
                                         FechaReserva: fechaReserva,    
                                         HoraEntrada: horaEntrada,
                                         HoraSalida: finJornada.value
                                 }
                
                                 axios.post("http://localhost:3001/api/reserva/agregarreserva", reserva)
                                 .then (res => {
                                         console.log(res.data)
                                         //alert(res.data)
                                         Swal.fire('Correcto', 'La reserva ha sido creado')
                                         //navegar('/listafuncionarios')
                                 }).catch(err => {
                                         console.log(err)
                                     })  
                        }
                        else {
                                Swal.fire('Incorrecto', 'No hay espacios disponibles para la reserva')
                        }
                
                }
                else {
                        Swal.fire('Incorrecto', 'El parqueo no se encuentra abierto en ese rango de horas')
                }
                //console.log(parqueo)
                //console.log(cantidadEspacios)
                //console.log(funcionario.Identificacion)

              
        }

        return(
        <div className="App" align="Center">
                <MenuFuncionario/>
                <div className="container">
                <div className="row">
                        <h2 className="mt-4"> Generar reserva</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">

                        <div className="mb-3">
                                <label htmlFor="placa" className="form-label">Placa</label>

                                        <select className="form-select" defaultValue={'DEFAULT'} onChange={(e)=> {setPlaca(e.target.value)}}>
                                                <option value="DEFAULT" disabled>Placas Disponibles</option>
                                                {placasList.map((placa) =>{
                                                return (
                                                        <option  value={placa}> {placa} </option>
                                                );
                                                })}
                                        </select>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="fechaReserva" className="form-label">Fecha de la Reserva</label>
                                <input type="date" className="form-control" defaultValue={fechaReserva} 
                                        onChange={(e)=> {
                                                setFechaReserva(e.target.value)
                                                cambiarDatosFuncionario(e.target.value)
                                                cambiarDatosParqueo(e.target.value)
                                                }}></input>
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
                                <h4>Horario del Funcionario para el día seleccionado</h4>
                        </div>
                        <div className="mb-3">
                                <label htmlFor="horaEntradaFuncionario" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" id="horaEntradaFuncionario" readOnly></input>
                        </div>
                        <div className="mb-3">
                                <label htmlFor="horaSalidaFuncionario" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" id="horaSalidaFuncionario" readOnly></input>
                        </div>
                        <br />
                        <div className="mb-3">
                                <h4>Horario del Parqueo para el día seleccionado</h4>
                        </div>
                        <div className="mb-3">
                                <label htmlFor="horaEntradaParqueo" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" id="horaEntradaParqueo" readOnly></input>
                        </div>
                        <div className="mb-3">
                                <label htmlFor="horaSalidaParqueo" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" id="horaSalidaParqueo" readOnly></input>
                        </div>



                        <button onClick={agregarReserva} className="btn btn-success">Reservar</button>
                        </div>
                </div>
                </div>
        </div>
        )


}