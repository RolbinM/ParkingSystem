import React, {Fragment, useState, useRef} from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
//import './css/estiloLogin.css'
import fondo from './content/imgLogin.jpg'

export function Login(){
        const [usuario, setUsuario]=useState('')
        const [contra, setContra]=useState('')
    
        const navegar = useNavigate()
    
        function loginAdministrador(){
            // axios.post("http://localhost:3001/api/administrador/login", {usuario: usuario, contra: contra})
            // .then (res => {
            //     console.log(res.data)
            //     if (res.data[0] != null){
            // //         navegar('/listaFuncionarios')
            //     } else {
            //         Swal.fire('Incorrecto', 'Los datos ingresados son erroneos')
            //     }
            // })
            // .then (err => {console.log(err.response.data)})
            navegar('/listafuncionarios')
        }
    
        return (
            <section class="Form my-4 mx-5">
            <div class="container">
                <div class="row no-gutters">
                    <div class="col-lg-5">
                        <img src={fondo} class="img-fluid"alt=""n />
                    </div>
                    <div class="col-lg-7 px-5 pt-5">
                        <h1 class="font-weight-bold py-3">Control de Parqueos TEC</h1>
                        <h4>Login</h4>
                        <form>
                            <div class="form-row">
                                <div class="col-lg 7">
                                    <input type="text" placeholder="Usuario" name="usuario" required class="form-control my-3 p-4" value={usuario} 
                                            onChange={(e)=> {setUsuario(e.target.value)}}></input>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg 7">
                                    <input type="password" placeholder="Contraseña" name="contrasena" required class="form-control my-3 p-4" value={contra} 
                                            onChange={(e)=> {setContra(e.target.value)}}></input>
                                </div>
                            </div>
    
                            <div class="form-row">
                                <div class="col-lg 7">
                                   <button onClick={loginAdministrador} class="btn1 mt-3 mb-5">Iniciar Sesión</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    
        );
       
    }