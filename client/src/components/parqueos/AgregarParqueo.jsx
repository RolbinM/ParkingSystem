import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {MenuAdmin} from "../MenuAdmin"


export function AgregarParqueo(){

        const [numero, setNumero]=useState('')
        const [nombre, setNombre]=useState('')
        const [tipo, setTipo]=useState('')
        const [ubicacion, setUbicacion]=useState('')
        const [encargado, setEncargado]=useState('')
        const [numeroEncargado, setNumeroEncargado]=useState('')
        const [espacios, setEspacios]=useState('')
        const [espaciosDisca, setEspaciosDisca]=useState('')
        const [espaciosOfi, setEspaciosOfi]=useState('')
        const [espaciosReser, setEspaciosReser]=useState('')
        const [espaciosVisit, setEspaciosVisit]=useState('')

        const [operadores, setOperadores]=useState([])
  
        useEffect(() => {
                axios.get('http://localhost:3001/api/operador/obteneroperadores').then((response) => {
                        setOperadores(response.data)
                })
        },[]);
    

        const navegar = useNavigate()

        function agregarparqueo(){
                var parqueo = {
                        Numero: numero,
                        Nombre: nombre,
                        Tipo: tipo,
                        Ubicacion: ubicacion,
                        Encargado: encargado,
                        NumeroEncargado: numeroEncargado,
                        Espacios: espacios,
                        EspaciosDiscapacitados: espaciosDisca,
                        EspaciosOficiales: espaciosOfi,
                        EspaciosReservados: espaciosReser,
                        EspaciosVisitantes: espaciosVisit,
                        Horario: [
                                {
                                        "day":"sunday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                },  
                                {
                                        "day":"monday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                {
                                        "day":"tuesday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                {
                                        "day":"wednesday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                {
                                        "day":"thursday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                },  
                                {
                                        "day":"friday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                {
                                        "day":"saturday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                ]
                }

                console.log(parqueo)

                axios.post("http://localhost:3001/api/parqueo/agregarparqueo", parqueo)
                .then (res => {
                        //alert(res.data)
                        Swal.fire('Correcto', 'El parqueo fue creado exitosamente')
                        navegar('/listaparqueos')
                })
                .then (err => {console.log(err.response.data)})
        }

        return(
        <div className="App" align="Center">
                <MenuAdmin/>
                <div className="container">
                <div className="row">
                        <h2 className="mt-4"> Insertar un nuevo Parqueo</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                                <label htmlFor="numero" className="form-label">Numero</label>
                                <input type="number" className="form-control" required value={numero} 
                                        onChange={(e)=> {setNumero(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" required value={nombre} 
                                        onChange={(e)=> {setNombre(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="tipo" className="form-label">Tipo</label>
                                <input type="text" className="form-control" required value={tipo} 
                                        onChange={(e)=> {setTipo(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="ubicacion" className="form-label">Ubicacion</label>
                                <input type="text" className="form-control" value={ubicacion} 
                                        onChange={(e)=> {setUbicacion(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="encargado" className="form-label">Encargado</label>

                                <select className="form-select" name="select" value={encargado} onChange={(e)=> {setEncargado(e.target.value)}}>
                                <option value="DEFAULT" disabled>Operadores Registrados</option>
                                {operadores.map((operador) =>{
                                        return (
                                                <option key={operador.Identificacion} value={operador.Identificacion}> {operador.Identificacion +" - "+ operador.Nombre} </option>
                                                
                                        );        
                                })}
                                </select>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="numeroEncargado" className="form-label">Numero Encargado</label>
                                <input type="number" className="form-control" value={numeroEncargado} 
                                        onChange={(e)=> {setNumeroEncargado(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="espacios" className="form-label">Espacios</label>
                                <input type="number" className="form-control" value={espacios} 
                                        onChange={(e)=> {setEspacios(e.target.value)}}></input>
                        </div>
                        
                        <div className="mb-3">
                                <label htmlFor="espaciosDisca" className="form-label">Espacios para personas Discapacitadas</label>
                                <input type="number" className="form-control" value={espaciosDisca} 
                                        onChange={(e)=> {setEspaciosDisca(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="espaciosOfi" className="form-label">Espacios de uso Oficial</label>
                                <input type="number" className="form-control" value={espaciosOfi} 
                                        onChange={(e)=> {setEspaciosOfi(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="espaciosReser" className="form-label">Espacios Reservados</label>
                                <input type="number" className="form-control" value={espaciosReser} 
                                        onChange={(e)=> {setEspaciosReser(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="espaciosVisit" className="form-label">Espacios para Visitantes</label>
                                <input type="number" className="form-control" value={espaciosVisit} 
                                        onChange={(e)=> {setEspaciosVisit(e.target.value)}}></input>
                        </div>


                        <button onClick={agregarparqueo} className="btn btn-success">Guardar Usuario</button>
                        </div>
                </div>
                </div>
        </div>
        )


}