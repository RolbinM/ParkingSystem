import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import {MenuAdmin} from "../MenuAdmin"

export function EditarOperador(){

    const params = useParams()

    const [nombre, setNombre]=useState('')
    const [usuario, setUsuario]=useState('')
    const [passwrd, setPasswrd]=useState('')

    const navegar = useNavigate()

    useEffect(() => {
        axios.post('http://localhost:3001/api/operador/obtenerdataoperador', 
        {idoperador: params.idoperador}).then(res => {
            const dataOperador = res.data[0]
            setNombre(dataOperador.Nombre)
            setUsuario(dataOperador.Usuario)
            setPasswrd(dataOperador.Contra)
        }) 
    }, [])
    
    //funcion de actualizar
    function editaroperador(){
        const actualizaroperador = {
            Nombre: nombre,
            Identificacion: params.idoperador,
            Usuario: usuario,
            Contra: passwrd
        }
        console.log(actualizaroperador)
        //hacer la peticion de update
        axios.post("http://localhost:3001/api/operador/actualizaroperador", actualizaroperador)
        .then (res => {
                console.log(res.data)
                Swal.fire('Correcto', 'El usuario ha sido actualizado')
                navegar('/listafuncionarios')

        })
        .then (err => {console.log(err.response.data)})

    }

    return(
        <div className="App" align="Center">
        <MenuAdmin/>
        <div className="container">
            <div className="row">
                        <h2 className="mt-4"> Editar Operador</h2>
            </div>

            <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" required value={nombre} 
                                                onChange={(e)=> {setNombre(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label">Usuario</label>
                                    <input type="text" className="form-control" required value={usuario} 
                                            onChange={(e)=> {setUsuario(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                    <label htmlFor="passwrd" className="form-label">Clave</label>
                                    <input type="text" className="form-control" required value={passwrd} 
                                            onChange={(e)=> {setPasswrd(e.target.value)}}></input>
                        </div>
                        <button onClick={editaroperador} className="btn btn-success">Editar Usuario</button>
                    </div>
                </div>
        </div>
        </div>
    )


}