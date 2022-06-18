import axios from "axios";
import React, { useEffect, useState } from "react";
import {ReservaOficialVigente} from "./ReservaOficialVigente"
import {MenuOperador} from "../MenuOperador"
import {useParams, Link } from "react-router-dom";


export function ReservasOficialesVigentes(){

    const[dataReservas, setDataReservas]=useState([])
    
    const params = useParams()

    useEffect(() => {
        var dia = new Date();
        var date = `${dia.getFullYear()}-${dia.getMonth()+1}-${dia.getDate()}`;

        axios.post("http://localhost:3001/api/reservaoficial/obtenerreservasoficialesvigentes",
        {FechaReserva: date, IdParqueo: params.idparqueo}).then(res =>{
            setDataReservas(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    const reservas = dataReservas.map(reserva => {
        var hoy = new Date();
        var hora = hoy.getHours() + ':' + hoy.getMinutes();

        if (reserva.HoraSalida > hora){
            return (
                <div>
                    <ReservaOficialVigente reserva={reserva}/>
                </div>
            )
        }
    })

    return(
        <div className="App" align="Center">
            <MenuOperador/>
            <div>
                <h2>
                    Reservas Oficiales Vigentes
                </h2>
                
                <br></br>
                {reservas}
            </div>
        </div>
    )


}