import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {MenuAdmin} from "../MenuAdmin"

import {ConsultaFuncionarioEspecifico} from "./ConsultaFuncionarioEspecifico"


export function ReporteConsultaFuncionario(){

    const params = useParams()

    const [identificacion, setIdentificacion]=useState(params.identi)
    const[datafuncionario, setdatafuncionario]=useState([])

    useEffect(() => {
        axios.post('http://localhost:3001/api/funcionario/obtenerdatafuncionario', 
        {idfuncionario: params.identi}).then(res => {
            setdatafuncionario(res.data)
        }) .catch(err => {
            console.log(err)
        })
    }, [])

    
    const listafuncionarios = datafuncionario.map(funcionario => {
        return (
            <div>
                <ConsultaFuncionarioEspecifico funcionario={funcionario}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuAdmin/>
            <div>
                <div className="col-sm-6">
                    <div className="mb-3">
                        <label htmlFor="identificacion" className="form-label">Identificacion</label>
                        <input type="text" className="form-control" required value={identificacion} onChange={(e)=> {setIdentificacion(e.target.value)}}></input>
                        <a href={`/reporteconsultafuncionario/${identificacion}`} className="btn btn-success">Buscar</a>
                    </div>
                </div>
                <div className="row">
                    {listafuncionarios}
                </div>
            </div>
        </div>
    )
}