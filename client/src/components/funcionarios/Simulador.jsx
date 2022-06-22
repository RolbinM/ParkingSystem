import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {MenuAdmin} from "../MenuAdmin"


export function Simulador(){
    const params = useParams()
        //hooks

        const [fechaEntrada, setFechaEntrada]=useState(null)
        const [horaEntrada, setHoraEntrada]=useState('')
        const [horaSalida, setHoraSalida]=useState('')

    return(
        <div className="App" align="Center">
            <MenuAdmin/>
            <div className="container">
                <div className="row">
                        <h2 className="mt-4">Simulador</h2>
                </div>

                <div className="row">
                        <div className="col-sm-6 offset-3">

                        <div className="mb-3">
                                <label htmlFor="fechaEntrada" className="form-label">Fecha de inicio</label>
                                <input required  type="date" className="form-control" defaultValue={fechaEntrada} 
                                        onChange={(e)=> {setFechaEntrada(e.target.value)}}></input>
                                
                        </div>
                        <div className="mb-3">
                                <label htmlFor="horaEntrada" className="form-label">Hora de Entrada</label>
                                <input type="time" className="form-control" value={horaEntrada} 
                                        onChange={(e)=> {setHoraEntrada(e.target.value)}}></input>

                        </div>

                        <div className="mb-3">
                                <label htmlFor="horaSalida" className="form-label">Hora de Salida</label>
                                <input type="time" className="form-control" value={horaSalida} 
                                        onChange={(e)=> {setHoraSalida(e.target.value)}}></input>
                        </div>
                        <br />
                        <div className="mb-3">
                            <Link to={`/simuladorparametros/${fechaEntrada},${horaEntrada},${horaSalida}`}
                            className="btn btn-outline-dark">
                                Generar simulación
                            </Link>
                        </div>
                        
                        </div>
                </div>
                </div>
        </div>
        )

}