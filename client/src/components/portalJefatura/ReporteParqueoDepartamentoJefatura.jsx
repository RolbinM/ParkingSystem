import axios from "axios";
import React, { useEffect, useState } from "react";
import {MenuJefatura} from "../MenuJefatura"
import {useParams } from "react-router-dom";

import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';



export function ReporteParqueoDepartamentoJefatura(){

    const params = useParams()
    
    const[datafuncionario, setdatafuncionario]=useState([])
    const[espaciosComputacion, setEspaciosComputacion]=useState(0)
    const[espaciosAdministracion, setEspaciosAdministracion]=useState(0)
    const[espaciosRRHH, setEspaciosRRHH]=useState(0)


    useEffect(() => {
        axios.get("http://localhost:3001/api/funcionario/obtenerfuncionarios").then(resFuncionario =>{
            setdatafuncionario(resFuncionario.data)
        

            axios.post("http://localhost:3001/api/reserva/obtenertodaslasreservas", {})
            .then(res =>{
                const listaDatos = res.data;

                var contadorCompu = 0;
                var contadorAdmin = 0;
                var contadorRRHH = 0;

                for (var dato of listaDatos){
                    for (var func of resFuncionario.data){
                        if(func.Identificacion == dato.IdUsuario){
                            if (func.Departamento == "Computacion"){
                                contadorCompu = contadorCompu + 1
                            }
    
                            if (func.Departamento == "Administracion"){
                                contadorAdmin = contadorAdmin + 1
                            }
    
                            if (func.Departamento == "RRHH"){
                                contadorRRHH = contadorRRHH + 1
                            }
                        }
                        
                    }
                }
                
                
                setEspaciosComputacion(espaciosComputacion + contadorCompu)
                setEspaciosAdministracion(espaciosAdministracion +contadorAdmin)
                setEspaciosRRHH(espaciosRRHH + contadorRRHH)
            })


        })
    }, [])


    const data = {
        labels: ["Computacion", "Administracion", "RRHH"],
        datasets: [
            {
                data: [espaciosComputacion / (espaciosComputacion+espaciosAdministracion+espaciosRRHH) * 100,
                    espaciosAdministracion / (espaciosComputacion+espaciosAdministracion+espaciosRRHH) * 100,
                    espaciosRRHH / (espaciosComputacion+espaciosAdministracion+espaciosRRHH) * 100
                ],
                backgroundColor: [
                    "red",
                    "blue",
                    "yellow"
                ]
            },
        ],
    };

    return(
        <div className="App" align="Center">
            <MenuJefatura/>
            <div>
                <h2>
                    Reportes de ocupación de todos los parqueos por departamento
                </h2>
                <br></br>

                <div style={{width: "800px", margin: "0 auto"}}>
                    <Bar data={data}/>
                </div>

            </div>
        </div>
    )


}