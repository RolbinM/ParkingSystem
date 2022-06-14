import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {MenuFuncionario} from "../MenuFuncionario"
import {useParams } from "react-router-dom";


export function Reserva(){
        const params = useParams()
        //hooks
        //const [idReserva, setIdReserva]=useState('')
        //const [usuario, setUsuario]=useState('')
        //const [idParqueo, setIdParqueo]=useState('')
        const [placa, setPlaca]=useState('')
        //const [fecha, setFecha]=useState(null)
        const [diaReserva, setdia]=useState("sunday")
        const [horaEntrada, setHoraEntrada]=useState(null)
        //const [horaSalida, setHoraSalida]=useState(null)
        const [placasList, setPlacas]=useState([])
        const [cantidadEspacios, setEspacios]=useState(null)
        const [parqueo, setParqueo]=useState(null)
        //const navegar = useNavigate()

        useEffect(() => {
                axios.post('http://localhost:3001/api/funcionario/obtenerdatafuncionario2', 
                {user: params.user}).then(res => {
                        setPlacas(res.data[0].Placas)
                })
                axios.post("http://localhost:3001/api/parqueo/obtenerparqueo", {Numero: params.idparqueo})
                .then(res => {
                        setParqueo(res.data[0])
                        setEspacios(res.data[0].Espacios)
                })
            }, [])
        
        
        function parqueoAbierto(){
                const dias = parqueo.Horario
                for (var dia of dias){
                        if (dia.day === diaReserva){
                                var cierre = document.getElementById("horaCierre")
                                cierre.value = dia.end_time

                        }
                }
        }
        async function agregarReserva(){
                parqueoAbierto()
                console.log(parqueo)
                console.log(cantidadEspacios)

                var cierre = document.getElementById("horaCierre")
                //console.log(cierre.value)
                
                // const current = new Date();
                // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

                // var reserva = {
                //         IdReserva: 1,
                //         Usuario: params.user,
                //         IdParqueo: params.Numero,
                //         Placa: placa,
                //         Dia: diaReserva,
                //         Fecha: date,
                //         HoraEntrada: horaEntrada,
                //         HoraSalida: cierre.value
                // }

                // axios.post("http://localhost:3001/api/reserva/agregarreserva", reserva)
                // .then (res => {
                //         console.log(res.data)
                //         //alert(res.data)
                //         //Swal.fire('Correcto', 'El usuario ha sido creado')
                //         //navegar('/listafuncionarios')
                // }).catch(err => {
                //         console.log(err)
                //     })

              
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
                                <input type="text" id="horaApertura" hidden className="form-control" value=""></input>
                        </div>

                        <button onClick={agregarReserva} className="btn btn-success">Reservar</button>
                        </div>
                </div>
                </div>
        </div>
        )


}