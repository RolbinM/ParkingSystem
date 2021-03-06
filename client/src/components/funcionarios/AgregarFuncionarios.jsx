import React, { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import {MenuAdmin} from "../MenuAdmin"
export function AgregarFuncionarios(){

        //hooks
        const [nombre, setNombre]=useState('')
        const [identificacion, setCedula]=useState('')
        const [celular, setCelular]=useState('')
        const [correo, setCorreo]=useState('')
        const [departamento, setDepartamento]=useState('Computacion')
        const [puesto, setPuesto]=useState('Regular')
        const [placa, setPlaca]=useState('')
        const [sede, setSede]=useState('San Jose')
        const [discapacitado, setDiscapacitado]=useState('No')
        const [usuario, setUsuario]=useState('')
        const [passwrd, setPasswrd]=useState('')
    
        const navegar = useNavigate()

        function agregarfuncionario(){
                var funcionario = {
                        Nombre: nombre,
                        Identificacion: identificacion,
                        Celular: celular,
                        Correo: correo,
                        Departamento: departamento,
                        Puesto: puesto,
                        Placas: placa,
                        Sede: sede,
                        Usuario: usuario,
                        Discapacitado: discapacitado,
                        Passwrd: passwrd,
                        Horario: [
                                {
                                        "day":"sunday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                },  
                                {
                                        "day":"monday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                {
                                        "day":"tuesday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                {
                                        "day":"wednesday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                {
                                        "day":"thursday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                },  
                                {
                                        "day":"friday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                {
                                        "day":"saturday",
                                        "start_time":"00:00",
                                        "end_time":"00:00"
                                }, 
                                ]
                }
                //console.log(funcionario)

                axios.post("http://localhost:3001/api/funcionario/agregarfuncionario", funcionario)
                .then (res => {
                        //alert(res.data)
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
                        <h2 className="mt-4"> Insertar un nuevo usuario</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" required value={nombre} 
                                        onChange={(e)=> {setNombre(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="identificacion" className="form-label">Identificaci??n</label>
                                <input type="number" className="form-control" required value={identificacion} 
                                        onChange={(e)=> {setCedula(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="celular" className="form-label">Celular</label>
                                <input type="number" className="form-control" value={celular} 
                                        onChange={(e)=> {setCelular(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <input type="text" className="form-control" value={correo} 
                                        onChange={(e)=> {setCorreo(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="Departamento" className="form-label">Departamento</label>

                                <select className="form-select" name="select" value={departamento} onChange={(e)=> {setDepartamento(e.target.value)}}>
                                        <option value="Computacion" >Computacion</option>
                                        <option value="Administracion">Administracion</option>
                                        <option value="RRHH">RRHH</option>
                                </select>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="puesto" className="form-label">Puesto</label>

                                <select className="form-select" name="select" value={puesto} onChange={(e)=> {setPuesto(e.target.value)}}>
                                        <option value="Regular" >Regular</option>
                                        <option value="Jefatura">Jefatura</option>
                                </select>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="placa" className="form-label">Placa</label>
                                <input type="text" className="form-control" required value={placa} 
                                        onChange={(e)=> {setPlaca(e.target.value)}}></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="sede" className="form-label">Sede</label>

                                <select className="form-select" name="select" value={sede} onChange={(e)=> {setSede(e.target.value)}}>
                                        <option value="San Jose" >San Jose</option>
                                </select>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="discapacitado" className="form-label">Discapacitado</label>

                                <select className="form-select" name="select" value={discapacitado} onChange={(e)=> {setDiscapacitado(e.target.value)}}>
                                        <option value="No">No</option>
                                        <option value="Si">Si</option>
                                </select>
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

                        <button onClick={agregarfuncionario} className="btn btn-success">Guardar Usuario</button>
                        </div>
                </div>
                </div>
        </div>
        )


}