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
                <div className="charts">
                <Chart height={'1000px'} width={'1400px'} filter={params.departamento} chartId={'627deaf8-ac96-418c-84fd-4accc9034a9b'}/>
                </div>
            </div>
        </div>
    )
};
