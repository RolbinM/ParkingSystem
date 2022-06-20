import axios from "axios";
import React, { useEffect, useState } from "react";
import {ReservaEspecifica} from "./ReservaEspecifica"
import {MenuFuncionario} from "../MenuFuncionario"
import {useParams } from "react-router-dom";



export function HistorialReservasParametrizadas(){

    //const[datafuncionario, setdatafuncionario]=useState([])
    //const [funcionario, setFuncionario]=useState(null)
    const [datareservas, setReservas]=useState([])

    const params = useParams()

    useEffect(() => {
        axios.post("http://localhost:3001/api/reserva/obtenerreservasparametrizadas",
                    {Identificacion: params.idfuncionario, IdParqueo:parseInt(params.idparqueo)}).then(res2 =>{
                        setReservas(res2.data)
                    })
    }, [])


        //Mapear lista usuarios en objeto usuario
        const listaReservas= datareservas.map(reserva => {
            if (reserva.FechaReserva >= params.fechaEntrada && reserva.FechaReserva <= params.fechaSalida){
                return (
                <div>
                    <ReservaEspecifica reserva={reserva}/>
                </div>
            )
            }
        })
    

    return(
        <div className="App" align="Center">
            <MenuFuncionario/>
            <div>
                <h2>
                    Historial reservas parametrizadas
                
                </h2>
                <br></br>
                {listaReservas}
            </div>
        </div>
    )


}