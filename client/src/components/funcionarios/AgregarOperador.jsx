import React, { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {MenuAdmin} from "../MenuAdmin"
export function AgregarOperador(){

        //hooks
        const [nombre, setNombre]=useState('')
        const [identificacion, setCedula]=useState('')
        const [usuario, setUsuario]=useState('')
        const [passwrd, setPasswrd]=useState('')
    
        const navegar = useNavigate()

        function agregarOperador(){
                var operador = {
                        Identificacion: identificacion,
                        Nombre: nombre,
                        Usuario: usuario,
                        Contra: passwrd
                }

                axios.post("http://localhost:3001/api/operador/agregaroperador", operador)
                .then (res => {
                        Swal.fire('Correcto', 'El usuario ha sido creado')
                        navegar('/listafuncionarios')
                })
                .then (err => {console.log(err.response.data)})
        }

        return(
        <div className="App" align="Center">
                <MenuAdmin/>
                <div className="container">
                <div className="row">
                        <h2 className="mt-4"> Insertar un nuevo operador</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">
                        
                        <div className="mb-3">
                                <label htmlFor="identificacion" className="form-label">Identificación</label>
                                <input type="number" className="form-control" required value={identificacion} 
                                        onChange={(e)=> {setCedula(e.target.value)}}></input>
                        </div>

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
                                <input type="password" className="form-control" required value={passwrd} 
                                        onChange={(e)=> {setPasswrd(e.target.value)}}></input>
                        </div>

                        <button onClick={agregarOperador} className="btn btn-success">Guardar Usuario</button>
                        </div>
                </div>
                </div>
        </div>
        )


}