import React, { useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function Parqueo({parqueo}){
    const params = useParams()

    //Para animacion
    useEffect(()=>{
        AOS.init()
    }, [])

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
                    <Link to={`/horarioparqueooperador/${params.user},${parqueo.Numero}`}><li className="btn btn-outline-dark">Horario</li></Link>
                    &nbsp;
                    <Link to={`/reservasoficiales/${params.user},${parqueo.Numero}`}><li className="btn btn-outline-warning">Reservas Oficiales</li></Link>
                    &nbsp;
                    <Link to={`/reservasvisitantes/${params.user},${parqueo.Numero}`}><li className="btn btn-outline-success">Reservas Visitantes</li></Link>
                    &nbsp;
                    <hr className="mt-4"></hr>
                </div> 
            </div>
            {/* <ListaPlacas/> */}
        </div>
    )


}