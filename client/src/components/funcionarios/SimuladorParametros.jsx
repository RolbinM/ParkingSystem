import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import {MenuAdmin} from "../MenuAdmin"
import {ParqueoSimulacion} from "./ParqueoSimulacion"

export function SimuladorParametros(){

    const [datareservas, setReservas]=useState([])
    const [datareservasoficial, setReservasOficial]=useState([])
    const [datareservasvisitas, setReservasVisitas]=useState([])
    const [parqueos, setdataparqueo]=useState([])

    const params = useParams()

    useEffect(() => {
        axios.get("http://localhost:3001/api/parqueo/obtenerparqueos").then(res =>{
                    setdataparqueo(res.data)
                    axios.post('http://localhost:3001/api/reserva/obtenerreservasEsimulador', 
                    {fechaEntrada: params.fechaEntrada}).then(res1 => {
                        setReservas(res1.data)
                        axios.post('http://localhost:3001/api/reservaoficial/obtenerreservasOsimulador', 
                        {fechaEntrada: params.fechaEntrada}).then(res2 => {
                            setReservasOficial(res2.data)
                            axios.post('http://localhost:3001/api/reservaInvitado/obtenerreservasIsimulador', 
                            {fechaEntrada: params.fechaEntrada}).then(res3 => {
                                setReservasVisitas(res3.data)
                    })
                })  
            })
        })
  
    }, [])



        //Mapear lista usuarios en objeto usuario
        const listaParqueos= parqueos.map(parqueo => {
            var parqueoJefatura = 0;
            var parqueoNormal= 0;
            var parqueoVisita= 0;
            var parqueoOficial= 0;
            var parqueoDiscapacitado = 0;

            for (var dia of datareservas){
                if(parqueo.Numero === dia.IdParqueo){
                    if(dia.TipoReserva === "Jefatura"){
                        parqueoJefatura = parqueoJefatura + 1
                    }
                    else if(dia.TipoReserva === "Discapacitado"){
                        parqueoDiscapacitado = parqueoDiscapacitado + 1
                    }
                    else{
                        parqueoNormal = parqueoNormal + 1
                    }
                    
                }
            }
            for (var dia2 of datareservasvisitas){
                if(parqueo.Numero === dia2.IdParqueo  ){
                    parqueoVisita = parqueoVisita + 1
                }
            }

            for (var dia3 of datareservasoficial){
                if(parqueo.Numero === dia3.IdParqueo  ){
                    parqueoOficial = parqueoOficial + 1
                }
            }

            console.log(datareservasvisitas)
            return (
                <div>
                    <ParqueoSimulacion parqueo={parqueo.Nombre} parqueoJefatura={parqueoJefatura}  
                        parqueoNormal={parqueoNormal} parqueoVisita={parqueoVisita} parqueoOficial={parqueoOficial}
                        parqueoDiscapacitado={parqueoDiscapacitado}/>
                </div>
            )
        })
    

    return(
        <div className="App" align="Center">
            <MenuAdmin/>
            <div>
                <h2>
                    Simulación
                </h2>
                <br></br>
                {listaParqueos}
            </div>
        </div>
    )


}