import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import {MenuAdmin} from "../MenuAdmin"

export function EditarFuncionario(){

    const params = useParams()

    const [nombre, setNombre]=useState('')
    //const [identificacion, setCedula]=useState('')
    const [celular, setCelular]=useState('')
    const [correo, setCorreo]=useState('')
    const [departamento, setDepartamento]=useState('')
    const [puesto, setPuesto]=useState('')
    const [placa, setPlaca]=useState('')
    const [sede, setSede]=useState('')
    const [usuario, setUsuario]=useState('')
    const [passwrd, setPasswrd]=useState('')
    const [horario, sethorario]=useState('')

    const navegar = useNavigate()

    useEffect(() => {
        axios.post('http://localhost:3001/api/funcionario/obtenerdatafuncionario', 
        {idfuncionario: params.idfuncionario}).then(res => {
            //console.log(res.data[0])
            const datafuncionario = res.data[0]
            setNombre(datafuncionario.Nombre)
            setCelular(datafuncionario.Celular)
            setCorreo(datafuncionario.Correo)
            setDepartamento(datafuncionario.Departamento)
            setPuesto(datafuncionario.Puesto)
            setSede(datafuncionario.Sede)
            setUsuario(datafuncionario.Usuario)
            setPlaca(datafuncionario.Placas)
            setPasswrd(datafuncionario.Passwrd)
            sethorario(datafuncionario.Horario)
        }) 
    }, [])
    
    //funcion de actualizar
    function editarfuncionario(){
        //nuevo objeto para actualizar el usuario
        const actualizarfuncionario = {
            Nombre: nombre,
            Identificacion: params.idfuncionario,
            Celular: celular,
            Correo: correo,
            Departamento: departamento,
            Puesto: puesto,
            Placas: placa,
            Sede: sede,
            Usuario: usuario,
            Passwrd: passwrd,
            Horario: horario
        }

        //hacer la peticion de update
        axios.post("http://localhost:3001/api/funcionario/actualizafuncionario", actualizarfuncionario)
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
                        <h2 className="mt-4"> Editar usuario</h2>
            </div>

            <div className="row">
                    <div className="col-sm-6 offset-3">
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" required value={nombre} 
                                        onChange={(e)=> {setNombre(e.target.value)}}></input>
                    </div>

                    <div className="mb-3">
                                <label htmlFor="celular" className="form-label">Celular</label>
                                <input type="number" className="form-control" value={celular} 
                                        onChange={(e)=> {setCelular(e.target.value)}}></input>
                    </div>

                    <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <input type="tex" className="form-control" value={correo} 
                                        onChange={(e)=> {setCorreo(e.target.value)}}></input>
                    </div>

                    <div className="mb-3">
                                <label htmlFor="departamento" className="form-label">Departamento</label>
                                <input type="text" className="form-control" value={departamento} 
                                        onChange={(e)=> {setDepartamento(e.target.value)}}></input>
                    </div>

                    <div className="mb-3">
                                <label htmlFor="puesto" className="form-label">Puesto</label>
                                <input type="text" className="form-control" value={puesto} 
                                        onChange={(e)=> {setPuesto(e.target.value)}}></input>
                    </div>

                    <div className="mb-3">
                                <label htmlFor="sede" className="form-label">Sede</label>
                                <input type="text" className="form-control" required value={sede} 
                                        onChange={(e)=> {setSede(e.target.value)}}></input>
                    </div>

                    <div className="mb-3">
                                <label htmlFor="usuario" className="form-label">Usuario</label>
                                <input type="text" className="form-control" required value={usuario} 
                                        onChange={(e)=> {setUsuario(e.target.value)}}></input>
                    </div>
                    <button onClick={editarfuncionario} className="btn btn-success">Editar Usuario</button>
                    </div>
                </div>
        </div>
        </div>
    )


}