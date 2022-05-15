import {useEffect, useState} from "react";
import React from 'react';
import Chart from "./Chart";
import {MenuAdmin} from "../MenuAdmin"
import { useNavigate, useParams } from "react-router-dom";
import 'aos/dist/aos.css'


export function ReporteParqueos () {
    const params = useParams()


    const [tipo, setTipo]=useState(params.tipo)

    return (
        <div className="App" align="Center">
            <MenuAdmin/>
            <div></div>
                <div className="App">
                <h2 className="title">Reporte Parqueos</h2>
                <div className="charts">
                <Chart height={'1000px'} width={'1400px'} filter={params.tipo} chartId={'62807867-9955-4827-860c-f47e1a85a051'}/>
                </div>
            </div>
        </div>
    )
};
