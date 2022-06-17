import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import {MenuAdmin} from "../MenuAdmin"

export function EditarHorario(){

    const params = useParams()

    const navegar = useNavigate()

    //const [day, setDay]=useState('')
    const [startTime, setStart]=useState('')
    const [finishTime, setFinish]=useState('')

    

     //funcion de actualizar
     function editarhorario(){
        //nuevo objeto para actualizar el usuario
        const actualizardia = {
            day: params.dia,
            start_time: startTime,
            end_time: finishTime
        }

        //hacer la peticion de update
        axios.post("http://localhost:3001/api/funcionario/editarhorariofuncionario",
        {idfuncionario: params.idfuncionario, iddia:params.dia , actualizardia}
        )
        .then (res => {
            editarhorario2()
        })
        .then (err => {console.log(err.response.data)})

    }

         //funcion de actualizar
    function editarhorario2(){
            //nuevo objeto para actualizar el usuario
            const actualizardia = {
                day: params.dia,
                start_time: startTime,
                end_time: finishTime
            }
    
            //hacer la peticion de update
            axios.post("http://localhost:3001/api/funcionario/editarhorariofuncionario2",
            {idfuncionario: params.idfuncionario, iddia:params.dia , actualizardia}
            )
            .then (res => {
                    console.log(actualizardia)
                    Swal.fire('Correcto', 'El horario ha sido actualizado')
                    navegar('/listafuncionarios')
    
            })
            .then (err => {console.log(err.response.data)})
    
        }
    


    return(
        <div className="App" align="Center">
        <MenuAdmin/>

        <div className="container">
            <div className="row">
                        <h2 className="mt-4"> Editar Horario</h2>
            </div>

            <div className="row">
                    <div className="col-sm-6 offset-3">
                    <div className="mb-3">
                                <label htmlFor="celular" className="form-label">Hora de inicio</label>
                                <input type="time" className="form-control" value={startTime} 
                                        onChange={(e)=> {setStart(e.target.value)}}></input>
                    </div>

                    <div className="mb-3">
                                <label htmlFor="escuela" className="form-label">Hora de finalizacion</label>
                                <input type="time" className="form-control" value={finishTime} 
                                        onChange={(e)=> {setFinish(e.target.value)}}></input>
                    </div>
                    <button onClick={editarhorario} className="btn btn-success">Editar Usuario</button>
                    </div>
                </div>
            
        </div>
        </div>
    )


}