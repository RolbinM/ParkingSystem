import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function Director({funcionario}){

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
                            Identificacion: {funcionario.Identificacion}
                        </li>
                        <li className="list-group-item">
                            Nombre: {funcionario.Nombre}
                        </li>
                        <li className="list-group-item">
                            Celular: {funcionario.Celular}
                        </li>
                        <li className="list-group-item">
                            Correo: {funcionario.Correo}
                        </li>
                        <li className="list-group-item">
                            Departamento: {funcionario.Departamento}
                        </li>
                        <li className="list-group-item">
                            Puesto: {funcionario.Puesto}
                        </li>
                        <li className="list-group-item">
                            Sede: {funcionario.Sede}
                        </li>
                        <li className="list-group-item">
                            Usuario: {funcionario.Usuario}
                        </li>
                    </ul>
                    <br />
                    <Link to={`/horariodirectorespecifico/${funcionario.Identificacion},${funcionario.Usuario}`}><li className="btn btn-outline-dark">Horario</li></Link>
                    &nbsp;
                    <Link to={`/placasdirectorespecifico/${funcionario.Identificacion},${funcionario.Usuario} `}><li className="btn btn-outline-dark">Placas registradas</li></Link>
                    &nbsp;
                    {/* <Link to={`/editarfuncionario/${funcionario.Identificacion}`}><li className="btn btn-outline-warning">Editar</li></Link>
                    &nbsp; */}
                    <hr className="mt-4"></hr>
                </div> 
            </div>
            {/* <ListaPlacas/> */}
        </div>
    )


}