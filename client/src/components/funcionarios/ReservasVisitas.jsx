import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {MenuAdmin} from "../MenuAdmin"
import {useParams } from "react-router-dom";
const { v4: uuidv4 } = require('uuid');


export function ReservaVisitas(){
        const params = useParams()
        //hooks

        const [horaEntrada, setHoraEntrada]=useState('')
        const [horaSalida, setHoraSalida]=useState('')
        const [idVisita, setIdVisita]=useState('')
        const [nombreVisita, setNombreVisita]=useState('')
        const [placaVisita, setPlacaVisita]=useState('')
        const [motivo, setMotivo]=useState('')
        const [sitioVisita, setSitioVisita]=useState('')
        const [cantidadEspacios, setEspacios]=useState(null)
        const [parqueo, setParqueo]=useState(null)
        //const [funcionario, setFuncionario]=useState(null)
        const [fechaReserva, setFechaReserva]=useState(null)
        const [cantidadReservasUsuario, setCantidadReservasUsuario]=useState(null)
        const [espaciosOcupados, setEspaciosOcupados]=useState(null)
        const [show, setShow] = useState(true);
        const navegar = useNavigate()


        useEffect(() => {
                axios.post("http://localhost:3001/api/parqueo/obtenerparqueo", {Numero: params.idparqueo})
                .then(res => {
                        setParqueo(res.data[0])
                        setEspacios(res.data[0].EspaciosVisitantes)
                })
            }, [])

        

        function cambiarDatosParqueo(fecha){
                const dias = parqueo.Horario

                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                var dia = new Date(fecha);
                var nombredia = nombresdias[dia.getDay()];

                for (dia of dias){
                        if (dia.day === nombredia){
                                var horaEntradaParqueo = document.getElementById("horaEntradaParqueo")
                                horaEntradaParqueo.value = dia.start_time

                                var horaSalidaParqueo = document.getElementById("horaSalidaParqueo")
                                horaSalidaParqueo.value = dia.end_time
                        }
                }
        }

        async function espaciosDisponibles(){
                await axios.post("http://localhost:3001/api/reservaInvitado/obtenerreservasinvitadoporparqueo", {IdParqueo: parqueo.Numero, FechaReserva: fechaReserva})
                .then(res => {
                        var cierre = document.getElementById("horaCierre")
                        var hEntrada = horaEntrada
                        var hSalida = cierre.value

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

                                if(listaReservas[reserva].PlacaV == placaVisita){
                                        contador2 = contador2 + 1
                                }
                        }

                        setCantidadReservasUsuario(contador2)
                        setEspaciosOcupados(contador)

                } )
        }
        
        function parqueoAbierto(){
                const dias = parqueo.Horario
                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                var dia2 = new Date(fechaReserva);
                var nombredia = nombresdias[dia2.getDay()];
                for (var dia of dias){
                        if (dia.day === nombredia){
                                var cierre = document.getElementById("horaCierre")
                                cierre.value = dia.end_time 
                                
                                if(horaSalida <= dia.end_time && horaEntrada >= dia.start_time ){
                                        return true;
                                }
                                else{
                                        return false;
                                }

                        }
                }
               

        }
        async function agregarReserva(){
                if(parqueoAbierto()){
                        espaciosDisponibles()
                        if(espaciosOcupados < cantidadEspacios && cantidadReservasUsuario < 1){

                                const current = new Date();
                                const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
                                
                                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                                var dia = new Date(fechaReserva);
                                var nombredia = nombresdias[dia.getDay()];

                                var reserva = {

                                         IdReserva: uuidv4(),
                                         Usuario: 0,
                                         Visitante: idVisita,
                                         IdParqueo: params.idparqueo,
                                         NombreV: nombreVisita,
                                         PlacaV: placaVisita,
                                         TipoReserva: "Visita",
                                         Motivo: motivo,
                                         SitioVisita: sitioVisita,
                                         Dia: nombredia,
                                         Fecha: date,
                                         FechaReserva: fechaReserva,    
                                         HoraEntrada: horaEntrada,
                                         HoraSalida: horaSalida
                                 }
                
                                 axios.post("http://localhost:3001/api/reservaInvitado/agregarreservainvitado", reserva)
                                 .then (res => {
                                         console.log(res.data)
                                         Swal.fire('Correcto', 'La reserva ha sido creado')
                                         const ruta = "/historialreservasinvitado"
                                         navegar(ruta)
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
                <MenuAdmin/>
                <div className="container">
                <div className="row">
                        <h2 className="mt-4"> Generar reserva</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">

                        <div className="mb-3">
                                <label htmlFor="idVisita" className="form-label">Cedula Visitante</label>
                                <input type="number" className="form-control" required value={idVisita} 
                                        onChange={(e)=> {setIdVisita(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="placaVisita" className="form-label">Placa Visitante</label>
                                <input type="text" className="form-control" required value={placaVisita} 
                                        onChange={(e)=> {setPlacaVisita(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="nombreVisita" className="form-label">Nombre Visitante</label>
                                <input type="text" className="form-control" required value={nombreVisita} 
                                        onChange={(e)=> {setNombreVisita(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="motivo" className="form-label">Motivo de la visita</label>
                                <select className="form-select" name="select" value={motivo} onChange={(e)=> {setMotivo(e.target.value)}}>
                                        <option value="Oficial" >Oficial</option>
                                        <option value="Recreativa">Recreativa</option>
                                        <option value="Reunion">Reunion</option>
                                        <option value="Evento oficial">Evento oficial</option>
                                        <option value="Otro">Otro</option>
                                </select>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="sitioVisita" className="form-label">Sitio de la visita</label>
                                <input type="text" className="form-control" required value={sitioVisita} 
                                        onChange={(e)=> {setSitioVisita(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="fechaReserva" className="form-label">Fecha de la Reserva</label>
                                <input required  type="date" className="form-control"  min={new Date().toISOString().split("T")[0]} defaultValue={fechaReserva} 
                                        onChange={(e)=> {
                                                setFechaReserva(e.target.value)
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

                        <div className="mb-3">
                                <label htmlFor="horaSalida" className="form-label">Hora de Salida</label>
                                <input type="time" className="form-control" value={horaSalida} 
                                        onChange={(e)=> {setHoraSalida(e.target.value)}}></input>
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
                                <label htmlFor="horaSalidaParqueo" className="form-label">Hora de Salida</label>
                                <input type="time" className="form-control" id="horaSalidaParqueo" readOnly></input>
                        </div>

                        {show ? (
                                <button onClick={()=> {changeState();espaciosDisponibles()}} className="btn btn-success">Reservar</button>
                        ) : (
                                <button onClick={()=> {changeState();agregarReserva()}} className="btn btn-success">Reservar</button>
                        )}
                                        
                        {/* <button onClick={()=> {espaciosDisponibles(); agregarReserva()}} className="btn btn-success">Reservar</button> */}
                        </div>
                </div>
                </div>
        </div>
        )


}