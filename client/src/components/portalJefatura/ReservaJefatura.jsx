import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { MenuJefatura } from "../MenuJefatura";
import {useParams } from "react-router-dom";
const { v4: uuidv4 } = require('uuid');


export function ReservaJefatura(){
        const params = useParams()
        //hooks

        const [placa, setPlaca]=useState('')
        const [horaEntrada, setHoraEntrada]=useState('')
        const [placasList, setPlacas]=useState([])
        const [cantidadEspacios, setEspacios]=useState(null)
        const [parqueo, setParqueo]=useState(null)
        const [funcionario, setFuncionario]=useState(null)
        const [fechaReserva, setFechaReserva]=useState(null)
        const [cantidadReservasUsuario, setCantidadReservasUsuario]=useState(null)
        const [espaciosOcupados, setEspaciosOcupados]=useState(null)
        const [show, setShow] = useState(true);
        const navegar = useNavigate()


        useEffect(() => {
                axios.post('http://localhost:3001/api/funcionario/obtenerdatafuncionario2', 
                {user: params.user}).then(res => {
                        setPlacas(res.data[0].Placas)
                        setFuncionario(res.data[0])


                        if (res.data[0].Discapacitado == "Si"){
                                console.log("Es discapacitado")

                                axios.post("http://localhost:3001/api/parqueo/obtenerparqueo", {Numero: params.idparqueo})
                                .then(resParqueo => {
                                        setParqueo(resParqueo.data[0])
                                        setEspacios(resParqueo.data[0].EspaciosDiscapacitados)
                                })

                        } else {
                                console.log("No es discapacitado")

                                axios.post("http://localhost:3001/api/parqueo/obtenerparqueo", {Numero: params.idparqueo})
                                .then(res => {
                                        setParqueo(res.data[0])
                                        setEspacios(res.data[0].Espacios)
                                })
                        }
                        
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

                        }
                }
        }

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
                var tipoReserva = "Jefatura"
                if(funcionario.Discapacitado == "Si"){
                        tipoReserva = "Discapacitado"
                }

                await axios.post("http://localhost:3001/api/reserva/obtenerreservasportipo", {TipoReserva: tipoReserva, FechaReserva: fechaReserva, IdParqueo: params.idparqueo})
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

                                if(listaReservas[reserva].IdUsuario === funcionario.Identificacion){
                                        contador2 = contador2 + 1
                                }
                        }

                        setCantidadReservasUsuario(contador2)
                        setEspaciosOcupados(contador)

                } )
        }
        
        function parqueoAbierto(){
                const dias = parqueo.Horario
                const diasFuncionario = funcionario.Horario

                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                var dia = new Date(fechaReserva);
                var nombredia = nombresdias[dia.getDay()];

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
                                if(horaEntrada >= dia.start_time ){
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
                                var cierre = document.getElementById("horaCierre")
                                console.log(cierre.value)
                
                                var finJornada = document.getElementById("finJornada")
                                console.log(finJornada.value)
                                
                                const current = new Date();
                                const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
                                
                                var nombresdias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                                var dia = new Date(fechaReserva);
                                var nombredia = nombresdias[dia.getDay()];

                                var horaSalidaParqueo = document.getElementById("horaSalidaParqueo")

                                var tipoReserva = "Jefatura"
                                if(funcionario.Discapacitado == "Si"){
                                        tipoReserva = "Discapacitado"
                                }
                                
                                var reserva = {
                                         IdReserva: uuidv4(),
                                         Usuario: funcionario.Identificacion,
                                         IdParqueo: params.idparqueo,
                                         Placa: placa,
                                         TipoReserva: tipoReserva,
                                         Dia: nombredia,
                                         Fecha: date,
                                         FechaReserva: fechaReserva,    
                                         HoraEntrada: horaEntrada,
                                         HoraSalida: horaSalidaParqueo.value
                                 }
                
                                 axios.post("http://localhost:3001/api/reserva/agregarreserva", reserva)
                                 .then (res => {
                                         console.log(res.data)
                                         Swal.fire('Correcto', 'La reserva ha sido creado')
                                         const ruta = "/listadirector/"
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
                <MenuJefatura/>
                <div className="container">
                <div className="row">
                        <h2 className="mt-4"> Generar reserva</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">

                        <div className="mb-3">
                                <label htmlFor="placa" className="form-label">Placa</label>

                                        <select className="form-select" defaultValue={'DEFAULT'} onChange={(e)=> {setPlaca(e.target.value)}}>
                                                {placasList.map((placa) =>{
                                                return (
                                                        <option  value={placa}> {placa} </option>
                                                );
                                                })}
                                        </select>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="fechaReserva" className="form-label">Fecha de la Reserva</label>
                                <input required  type="date" className="form-control"  min={new Date().toISOString().split("T")[0]} defaultValue={fechaReserva} 
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
                                <h4>Horario del Funcionario para el d??a seleccionado</h4>
                        </div>
                        <div className="mb-3">
                                <label htmlFor="horaEntradaFuncionario" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" id="horaEntradaFuncionario" readOnly></input>
                        </div>
                        <br />
                        <div className="mb-3">
                                <h4>Horario del Parqueo para el d??a seleccionado</h4>
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