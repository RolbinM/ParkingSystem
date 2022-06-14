import React from 'react';
import Chart from "./Chart";
import {MenuAdmin} from "../MenuAdmin"
import { useParams } from "react-router-dom";
import 'aos/dist/aos.css'


export function ReporteFranjasHorarias () {
    const params = useParams()

    return (
        <div className="App" align="Center">
            <MenuAdmin/>
            <div></div>
                <div className="App">
                <h2 className="title">Reporte Franjas Horarias</h2>
                <div className="charts">
                <Chart height={'1000px'} width={'1400px'} filter={params.departamento} chartId={'62808f01-4e6c-4827-8f6d-752b40a7b436'}/>
                </div>
            </div>
        </div>
    )
};
