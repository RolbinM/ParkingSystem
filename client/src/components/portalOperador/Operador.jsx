import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function Operador({operador}){

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
                            Identificacion: {operador.Identificacion}
                        </li>
                        <li className="list-group-item">
                            Nombre: {operador.Nombre}
                        </li>
                        <li className="list-group-item">
                            Usuario: {operador.Usuario}
                        </li>
                        <li className="list-group-item">
                            Clave: {operador.Contra}
                        </li>
                    </ul>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
            {/* <ListaPlacas/> */}
        </div>
    )


}