import {useEffect, useState} from "react";
import React from 'react';
import Chart from "./Chart";
import {MenuAdmin} from "../MenuAdmin"
import { useNavigate, useParams } from "react-router-dom";
import 'aos/dist/aos.css'


export function ReporteFuncionarios () {
    const params = useParams()


    const [departamento, setDepartamento]=useState(params.departamento)

    return (
        <div className="App" align="Center">
            <MenuAdmin/>
            <div></div>
                <div className="App">
                <h2 className="title">Reporte Funcionarios</h2>
                <div className="form">
                    <div className="row">
                        <div className="mb-3">
                                <label htmlFor="Departamento" className="form-label">Departamento</label>
                                <input type="text" className="form-control" value={departamento} onChange={(e)=> {setDepartamento(e.target.value)}}></input>

                                <a className="btn btn-success" href={`/reportefuncionarios/${departamento}`}>Actualizar</a>
                                &nbsp;
                        </div>
                    </div>
                </div>
                <div className="charts">
                <Chart height={'1000px'} width={'1400px'} filter={params.departamento} chartId={'62807867-9955-4827-860c-f47e1a85a051'}/>
                </div>
            </div>
        </div>
    )
};
