import React, { useEffect } from "react";
//import {ListaPlacas} from "./ListaPlacas";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function ParqueoSimulacion({parqueo, parqueoJefatura ,parqueoNormal, parqueoVisita, parqueoOficial, parqueoDiscapacitado}){

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
                            Nombre Parqueo: {parqueo}
                        </li>
                        <li className="list-group-item">
                            Espacios de jefatura: {parqueoJefatura}
                        </li>
                        <li className="list-group-item">
                            Espacios Funcionario Normal: {parqueoNormal}
                        </li>
                        <li className="list-group-item">
                            Espacios de Visita: {parqueoVisita}
                        </li>
                        <li className="list-group-item">
                            Espacios Oficiales: {parqueoOficial}
                        </li>
                        <li className="list-group-item">
                            Espacios de Discapacitado: {parqueoDiscapacitado}
                        </li>
                        <li className="list-group-item">
                            Espacios expirados: {parqueoDiscapacitado}
                        </li>
                    </ul>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
        </div>
    )


}