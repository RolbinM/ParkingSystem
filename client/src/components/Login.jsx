import React, {useState} from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
//import './css/estiloLogin.css'
import fondo from './content/imgLogin.jpg'

export function Login(){
        const [usuario, setUsuario]=useState('')
        const [contra, setContra]=useState('')
    
        const navegar = useNavigate()

        const loginAdministrador = async() =>{         
            try{             
                const response = await axios.post('http://localhost:3001/api/administrador/login', {usuario: usuario, contra: contra});               

                if (response.data[0] != null){
                    
                    const ruta = "/listafuncionario/"
                    navegar(ruta.concat(usuario))
                    console.log(usuario)
                    //navegar('/listafuncionarios',{usuario: usuario})  
                } else {
                    Swal('Error','Usuario invalido')
                }
                                  
            } catch(err){             
                alert('Usuario invalido')         
            }                   
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
                                <input type="text" placeholder="Usuario" name="usuario" required className="form-control my-3 p-4" value={usuario} 
                                        onChange={(e)=> {setUsuario(e.target.value)}}></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-lg 7">
                                <input type="password" placeholder="Contraseña" name="contrasena" required className="form-control my-3 p-4" value={contra} 
                                        onChange={(e)=> {setContra(e.target.value)}}></input>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-lg 7">
                                <button onClick={loginAdministrador} class="btn1 mt-3 mb-5">Iniciar Sesión</button>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </section>
    
        );
       
    }