import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {MenuFuncionario} from "../MenuFuncionario"


export function ReservasParametrizadas(){
    const params = useParams()
        //hooks

        const [funcionario, setFuncionario]=useState([])
        const [fechaEntrada, setFechaEntrada]=useState(null)
        const [fechaSalida, setFechaSalida]=useState(null)
        const [dataparqueo, setdataparqueo]=useState([])
        const [parqueo, setParqueo]=useState(null)

        useEffect(() => {
                axios.post('http://localhost:3001/api/funcionario/obtenerdatafuncionario2', 
                {user: params.user}).then(res => {
                        setFuncionario(res.data[0])
                    axios.get("http://localhost:3001/api/parqueo/obtenerparqueos").then(res =>{
                    setdataparqueo(res.data)
                        })       
                })
                
            }, [])


    return(
        <div className="App" align="Center">
            <MenuFuncionario/>
            <div className="container">
                <div className="row">
                        <h2 className="mt-4"> Generar consulta entre fechas</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">

                        <div className="mb-3">
                                <label htmlFor="parqueo" className="form-label">Nombre del parqueo</label>

                                        <select className="form-select" defaultValue={'DEFAULT'} onChange={(e)=> {
                                            setParqueo(e.target.value)
                                            }}>
                                                {dataparqueo.map((parqueo) =>{
                                                return (
                                                        <option  value={parqueo.Numero}> {parqueo.Nombre} </option>
                                                );
                                                })}
                                        </select>

                                <input type="text" id="idparqueo" hidden className="form-control" value=""></input>
                        </div>

                        <div className="mb-3">
                                <label htmlFor="fechaEntrada" className="form-label">Fecha de inicio</label>
                                <input required  type="date" className="form-control" defaultValue={fechaEntrada} 
                                        onChange={(e)=> {setFechaEntrada(e.target.value)}}></input>
                                
                        </div>
                        <div className="mb-3">
                                <label htmlFor="fechaSalida" className="form-label">Fecha de fin</label>
                                <input required  type="date" className="form-control" defaultValue={fechaSalida} 
                                        onChange={(e)=> {setFechaSalida(e.target.value)}}></input>
                                        <input type="text" id="horaCierre" hidden className="form-control" value=""></input>
                        </div>
                        <br />
                        <div className="mb-3">
                            <Link to={`/consultahistorialparametrizado/${params.user},${funcionario.Identificacion},${parqueo},${fechaEntrada},${fechaSalida}`}
                            className="btn btn-outline-dark">
                                Generar consulta
                            </Link>
                        </div>
                        
                        </div>
                </div>
                </div>
        </div>
        )

}