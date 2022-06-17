import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import {MenuAdmin} from "../MenuAdmin"

export function EditarParqueo(){

    const params = useParams()

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
    const [horario, sethorario]=useState('')

    const [operadores, setOperadores]=useState([])


    const navegar = useNavigate()

    useEffect(() => {
        axios.post('http://localhost:3001/api/parqueo/obtenerdatosparqueo', 
        {idNumero: params.idparqueo}).then(res => {
            //console.log(res.data[0])
            const dataParqueo = res.data[0]
            setNombre(dataParqueo.Nombre)
            setTipo(dataParqueo.Tipo)
            setUbicacion(dataParqueo.Ubicacion)
            setEncargado(dataParqueo.Encargado)
            setNumeroEncargado(dataParqueo.NumeroEncargado)
            setEspacios(dataParqueo.Espacios)
            setEspaciosDisca(dataParqueo.EspaciosDiscapacitados)
            setEspaciosOfi(dataParqueo.EspaciosOficiales)
            setEspaciosReser(dataParqueo.EspaciosReservados)
            setEspaciosVisit(dataParqueo.EspaciosVisitantes)
            sethorario(dataParqueo.Horario)
        }) 

        axios.get('http://localhost:3001/api/operador/obteneroperadores').then((response) => {
                setOperadores(response.data)
        })
    }, [])
    
    //funcion de actualizar
    function editarparqueo(){

        const actualizarParqueo = {
            Numero: params.idparqueo,
            Nombre: nombre,
            Tipo: tipo,
            Ubicacion: ubicacion,
            Encargado: encargado,
            NumeroEncargado: numeroEncargado,
            Horario: horario,
            Espacios: espacios,
            EspaciosDiscapacitados: espaciosDisca,
            EspaciosOficiales: espaciosOfi,
            EspaciosReservados: espaciosReser,
            EspaciosVisitantes: espaciosVisit
        }

        //hacer la peticion de update
        axios.post("http://localhost:3001/api/parqueo/actualizarparqueo", actualizarParqueo)
        .then (res => {
                console.log(res.data)
                Swal.fire('Correcto', 'El parqueo ha sido actualizado')
                navegar('/listaparqueos')

        })
        .then (err => {console.log(err.response.data)})

    }

    return(
        <div className="App" align="Center">
        <MenuAdmin/>
        <div className="container">
            <div className="row">
                        <h2 className="mt-4"> Editar Parqueo</h2>
            </div>

            <div className="row">
                    <div className="col-sm-6 offset-3">
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
                    <button onClick={editarparqueo} className="btn btn-success">Editar Parqueo</button>
                    </div>
                </div>
        </div>
        </div>
    )


}