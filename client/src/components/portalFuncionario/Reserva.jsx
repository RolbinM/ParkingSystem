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
        
        
        function parqueoAbierto(){
                const dias = parqueo.Horario
                const diasFuncionario = funcionario.Horario
                for (var dia of dias){
                        if (dia.day === diaReserva){
                                var cierre = document.getElementById("horaCierre")
                                cierre.value = dia.end_time

                        }
                }
                for (var diaF of diasFuncionario){
                        if (diaF.day === diaReserva){
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
                if(!parqueoAbierto()){
                //aca va la comprobacion de haya campo
                var cierre = document.getElementById("horaCierre")
                console.log(cierre.value)

                var finJornada = document.getElementById("finJornada")
                console.log(finJornada.value)
                
                const current = new Date();
                const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

                var reserva = {
                         IdReserva: uuidv4(),
                         Usuario: funcionario.Identificacion,
                         IdParqueo: params.idparqueo,
                         Placa: placa,
                         TipoReserva: "Estandar",
                         Dia: diaReserva,
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
                                        onChange={(e)=> {setFechaReserva(e.target.value)}}></input>
                        </div>


                        <div className="mb-3">
                                <label htmlFor="diaReserva" className="form-label"> Dia de reserva <br/>
                                        <select className="form-select" name="select" value={diaReserva} onChange={(e)=> {setdia(e.target.value)}}>
                                        <br/>
                                        <option value="sunday" >Domingo</option>
                                        <option value="monday">Lunes</option>
                                        <option value="tuesday">Martes</option>
                                        <option value="wednesday">Miercoles</option>
                                        <option value="thursday" >Jueves</option>
                                        <option value="friday">Viernes</option>
                                        <option value="saturday">Sabado</option>
                                        </select>
                                </label>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="horaEntrada" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" value={horaEntrada} 
                                        onChange={(e)=> {setHoraEntrada(e.target.value)}}></input>

                                <input type="text" id="horaCierre" hidden className="form-control" value=""></input>
                                <input type="text" id="finJornada" hidden className="form-control" value=""></input>
                        </div>

                        <button onClick={agregarReserva} className="btn btn-success">Reservar</button>
                        </div>
                </div>
                </div>
        </div>
        )


}