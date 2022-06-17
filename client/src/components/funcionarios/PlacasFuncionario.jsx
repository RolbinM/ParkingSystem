import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {MenuAdmin} from "../MenuAdmin"

export function PlacasFuncionario({funcionario}){

    const params = useParams()
    const navegar = useNavigate()

    //Para animacion
    useEffect(()=>{
        AOS.init()
    }, [])

    const[datafuncionario, setdatafuncionario]=useState([])
    const [placa, setPlaca]=useState('')


    useEffect(() => {
        axios.post('http://localhost:3001/api/funcionario/obtenerhorariofuncionario', 
        {idfuncionario: params.idfuncionario}).then(res => {
            const datafuncionario = res.data[0]
            setdatafuncionario(datafuncionario.Placas)
            //console.log(datafuncionario.Horario.friday.start_time)
        }) 
    }, [])

    function agregarplaca() {
        axios.post('http://localhost:3001/api/funcionario/agregarplacafuncionario', 
        {idfuncionario: params.idfuncionario, idplaca: placa}).then(res => {
            Swal.fire('Agregado', 'La placa ha sido registrada')
            navegar('/listafuncionarios')
        }).catch(err => {
            console.log(err)
        })
}

        //Funcion para borrar usuario
    function borrarplaca(identificacion, placa) {
            axios.post('http://localhost:3001/api/funcionario/borrarplacafuncionario', 
            {idfuncionario: identificacion, idplaca: placa}).then(res => {
                console.log(identificacion)
                Swal.fire('Eliminado', 'La placa ha sido borrada')
                navegar('/listafuncionarios')
            }).catch(err => {
                console.log(err)
            })
    }


    //Mapear lista usuarios en objeto usuario
    const listaplacas = datafuncionario.map(placa => {
        return (
            
            <div className="container">
            <div className="row">
                <div className="col-sm-10 offset-1" data-aos="fade-down-left">
                    <ul className="list-group">
                        <br />
                        <li className="list-group-item">
                            {placa}
                        </li>
                    </ul>
                    <br />
                    <button className="btn btn-outline-danger" onClick={()=>{borrarplaca(params.idfuncionario, placa)}}>Borrar</button>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
        </div>
        
        )
    }
  
    )

    return(
        <div className="App" align="Center">
        <MenuAdmin/>
        <div>
            <div className="container">
                <div className="row">
                        <h2 className="mt-4"> Insertar una nueva placa</h2>
                </div>
                <div className="row">
                        <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                        <label htmlFor="placa" className="form-label">Placa</label>
                                <input type="text" className="form-control" required value={placa} 
                                        onChange={(e)=> {setPlaca(e.target.value)}}></input>
                        </div>
                        <button onClick={agregarplaca} className="btn btn-success">Guardar placa</button>
                        <br></br>
                        <hr className="mt-4"></hr>
                        </div>
                </div>
            <h3>
                Lista de Placas para funcionario {params.idfuncionario}
            
            </h3>
            <br></br>
            {listaplacas}
        </div>
    </div>

    </div>
    )


}