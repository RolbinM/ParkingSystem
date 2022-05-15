import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'

import AOS from 'aos'
import 'aos/dist/aos.css'


export function ParqueoEspecifico({parqueo}){

    const navegar = useNavigate()

    //Para animacion
    useEffect(()=>{
        AOS.init()
    }, [])


    //Funcion para borrar usuario
    function borrarparqueo(numero) {
        axios.post('http://localhost:3001/api/parqueo/borrarparqueo', 
        {idNumero: numero}).then(res => {
            //console.log(res.data)
            alert(res.data)
            navegar(0)
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-10 offset-1" data-aos="zoom-in">
                    <ul className="list-group">
                        <li className="list-group-item">
                            Numero: {parqueo.Numero}
                        </li>
                        <li className="list-group-item">
                            Nombre: {parqueo.Nombre}
                        </li>
                        <li className="list-group-item">
                            Tipo: {parqueo.Tipo}
                        </li>
                        <li className="list-group-item">
                            Ubicacion: {parqueo.Ubicacion}
                        </li>
                        <li className="list-group-item">
                            Encargado: {parqueo.Encargado}
                        </li>
                        <li className="list-group-item">
                            Numero del Encargado: {parqueo.NumeroEncargado}
                        </li>
                        <li className="list-group-item">
                            Espacios Disponibles: {parqueo.Espacios}
                        </li>
                        <li className="list-group-item">
                            Espacios para Visitantes: {parqueo.EspaciosVisitantes}
                        </li>
                        <li className="list-group-item">
                            Espacios para uso Oficial: {parqueo.EspaciosOficiales}
                        </li>
                        <li className="list-group-item">
                            Espacios Reservados: {parqueo.EspaciosReservados}
                        </li>
                        <li className="list-group-item">
                            Espacios para Discapacitados: {parqueo.EspaciosDiscapacitados}
                        </li>
                    </ul>
                    <br />
                    <Link to={`/horarioparqueo/${parqueo.Numero}`}><li className="btn btn-outline-dark">Horario</li></Link>
                    &nbsp;
                    <Link to={`/editarparqueo/${parqueo.Numero}`}><li className="btn btn-outline-warning">Editar</li></Link>
                    &nbsp;
                    <button className="btn btn-outline-danger" onClick={()=>{borrarparqueo(parqueo.Numero)}}>Borrar</button>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
            {/* <ListaPlacas/> */}
        </div>
    )


}