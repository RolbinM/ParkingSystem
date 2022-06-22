import axios from "axios";
import React, { useEffect, useState } from "react";
import {MenuJefatura} from "../MenuJefatura"
import {useParams } from "react-router-dom";

import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';



export function ReporteTipoEspacioJefatura(){

    const params = useParams()

    const[espaciosJefatura, setEspaciosJefatura]=useState(0)
    const[espaciosDiscapacitado, setEspaciosDiscapacitado]=useState(0)
    const[espaciosVisitante, setEspaciosVisitante]=useState(0)
    const[espaciosOficiales, setEspaciosOficiales]=useState(0)

    useEffect(() => {

        axios.post("http://localhost:3001/api/reserva/obtenerreservasportiporeserva", {TipoReserva: "Jefatura", IdParqueo: params.idparqueo})
        .then(res =>{
            const listaDatos = res.data;

            var contador = 0;

            for (var dato of listaDatos){
                contador = contador+1;
            }
            console.log("Jefatura: " + contador)
            setEspaciosJefatura(contador)
        })



        axios.post("http://localhost:3001/api/reserva/obtenerreservasportiporeserva", {TipoReserva: "Discapacitado", IdParqueo: params.idparqueo})
        .then(res =>{
            const listaDatos = res.data;

            var contador = 0;

            for (var dato of listaDatos){
                contador = contador+1;
            }
            
            console.log("Discapacitado: " + contador)
            setEspaciosDiscapacitado(contador)
        })


        axios.post("http://localhost:3001/api/reservaInvitado/obtenerreservasinvitadoporparqueoreserva", {IdParqueo: params.idparqueo})
        .then(res =>{
            const listaDatos = res.data;

            var contador = 0;

            for (var dato of listaDatos){
                contador = contador+1;
            }
            
            console.log("Visitante: " + contador)
            setEspaciosVisitante(contador)
        })


        axios.post("http://localhost:3001/api/reservaoficial/obtenerreservasoficiales", {IdParqueo: params.idparqueo})
        .then(res =>{
            const listaDatos = res.data;

            var contador = 0;

            for (var dato of listaDatos){
                contador = contador+1;
            }
            console.log("Oficiales: " + contador)
            setEspaciosOficiales(contador)
        })


    }, [])


    const data = {
        labels: ["Jefatura", "Discapacitado", "Visitantes", "Oficiales"],
        datasets: [
            {
                data: [espaciosJefatura / (espaciosJefatura+espaciosDiscapacitado+espaciosVisitante+espaciosOficiales) * 100,
                    espaciosDiscapacitado / (espaciosJefatura+espaciosDiscapacitado+espaciosVisitante+espaciosOficiales) * 100,
                    espaciosVisitante / (espaciosJefatura+espaciosDiscapacitado+espaciosVisitante+espaciosOficiales) * 100,
                    espaciosOficiales / (espaciosJefatura+espaciosDiscapacitado+espaciosVisitante+espaciosOficiales) * 100
                ],
                backgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "green"
                ]
            },
        ],
    };

    return(
        <div className="App" align="Center">
            <MenuJefatura/>
            <div>
                <h2>
                    Reportes de ocupación en un parqueo por tipo de espacio
                </h2>
                <br></br>

                <div style={{width: "800px", margin: "0 auto"}}>
                    <Bar data={data}/>
                </div>

            </div>
        </div>
    )


}