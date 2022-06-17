import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


export function OperadorEspecifico({operador}){

    const navegar = useNavigate()

    useEffect(()=>{
        AOS.init()
    }, [])


    //Funcion para borrar usuario
    function borrarOperador(identificacion) {
        axios.post('http://localhost:3001/api/operador/borraroperador', 
        {idoperador: identificacion}).then(res => {
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
                            Identificacion: {operador.Identificacion}
                        </li>
                        <li className="list-group-item">
                            Nombre: {operador.Nombre}
                        </li>
                        <li className="list-group-item">
                            Usuario: {operador.Usuario}
                        </li>
                    </ul>
                    <br />
                    <Link to={`/editaroperador/${operador.Identificacion}`}><li className="btn btn-outline-warning">Editar</li></Link>
                    &nbsp;
                    <button className="btn btn-outline-danger" onClick={()=>{borrarOperador(operador.Identificacion)}}>Borrar</button>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
            {/* <ListaPlacas/> */}
        </div>
    )


}