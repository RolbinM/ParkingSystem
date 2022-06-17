import React, { useEffect } from "react";
import {Link, useParams} from "react-router-dom";


import AOS from 'aos'
import 'aos/dist/aos.css'


export function ParqueoEspecificoJefatura({parqueo}){
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
                    </ul>
                    <br />
                    <Link to={`/reservarjefatura/${params.user},${parqueo.Numero}`}><li className="btn btn-outline-dark">Reservar</li></Link>
                    &nbsp;
                    <Link to={`/reservarinvitadosjefatura/${params.user},${parqueo.Numero}`}><li className="btn btn-outline-dark">Reserva de Invitados</li></Link>
                    &nbsp;
                    <hr className="mt-4"></hr>
                </div> 
            </div>
            {/* <ListaPlacas/> */}
        </div>
    )


}