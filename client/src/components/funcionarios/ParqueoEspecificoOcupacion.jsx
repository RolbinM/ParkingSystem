import React, { useEffect } from "react";
import {Link, useParams} from "react-router-dom";


import AOS from 'aos'
import 'aos/dist/aos.css'


export function ParqueoEspecificoOcupacion({parqueo}){
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
                            Ubicacion: {parqueo.Ubicacion}
                        </li>
                        <li className="list-group-item">
                            Encargado: {parqueo.Encargado}
                        </li>
                    </ul>
                    <br />
                    <Link to={`/reportetipoespacioadmin/${parqueo.Numero}`}><li className="btn btn-outline-dark">Reporte - Tipo de Espacio</li></Link>
                    &nbsp;
                    <Link to={`/reportedepartamentoadmin/${parqueo.Numero}`}><li className="btn btn-outline-dark">Reporte - Departamento</li></Link>
                    &nbsp;
                    <hr className="mt-4"></hr>
                </div> 
            </div>
            {/* <ListaPlacas/> */}
        </div>
    )


}