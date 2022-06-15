import React, {useState} from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
//import './css/estiloLogin.css'
import fondo from './content/imgLogin.jpg'

export function Login(){

    
        const navegar = useNavigate()

        const loginAdministrador = async() =>{         
            navegar('/loginAdministrador')  
        }

        const loginFuncionario = async() =>{         
            navegar('/loginFuncionario')  
        }

        const loginParqueo = async() =>{         
            navegar('/loginParqueo')  
        }
    
        return (
            <section className="Form my-4 mx-5">
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-lg-5">
                        <img src={fondo} class="img-fluid"alt=""n />
                    </div>
                    <div className="col-lg-7 px-5 pt-5">
                        <h1 className="font-weight-bold py-3">Control de Parqueos TEC</h1>
                        <h4>Login</h4>
                     
                        <div className="form-row">
                            <div className="col-lg 7">
                                <button onClick={loginFuncionario} className="font-weight-bold btn-success  mt-3 mb-5" style={{width: "100%", borderRadius: "50px" , border: "1px solid white"}}><h4>Iniciar Sesión Funcionario</h4></button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-lg 7">
                                <button onClick={loginAdministrador} className="font-weight-bold btn-success  mt-3 mb-5" style={{width: "100%", borderRadius: "50px", border: "1px solid white"}}><h4>Iniciar Sesión Administrador</h4></button>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-lg 7">
                                <button onClick={loginParqueo} className="font-weight-bold btn-success  mt-3 mb-5" style={{width: "100%",borderRadius: "50px", border: "1px solid white"}}><h4>Iniciar Sesión Parqueo</h4></button>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </section>
    
        );
       
    }