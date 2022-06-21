import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'
//import {ListaPlacas} from "./ListaPlacas";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function FuncionarioEspecifico({funcionario}){

    const navegar = useNavigate()

    //Para animacion
    useEffect(()=>{
        AOS.init()
    }, [])


    //Funcion para borrar usuario
    function borrarfuncionario(identificacion) {
        axios.post('http://localhost:3001/api/funcionario/borrarfuncionario', 
        {idfuncionario: identificacion}).then(res => {
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
                            Discapacitado: {funcionario.Discapacitado}
                        </li>
                        <li className="list-group-item">
                            Usuario: {funcionario.Usuario}
                        </li>
                    </ul>
                    <br />
                    <Link to={`/horariofuncionario/${funcionario.Identificacion}`}><li className="btn btn-outline-dark">Horario</li></Link>
                    &nbsp;
                    <Link to={`/placasfuncionario/${funcionario.Identificacion}`}><li className="btn btn-outline-dark">Placas registradas</li></Link>
                    &nbsp;
                    <Link to={`/editarfuncionario/${funcionario.Identificacion}`}><li className="btn btn-outline-warning">Editar</li></Link>
                    &nbsp;
                    <button className="btn btn-outline-danger" onClick={()=>{borrarfuncionario(funcionario.Identificacion)}}>Borrar</button>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
            {/* <ListaPlacas/> */}
        </div>
    )


}