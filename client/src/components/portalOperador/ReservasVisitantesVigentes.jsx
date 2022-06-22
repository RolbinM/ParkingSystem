import axios from "axios";
import React, { useEffect, useState } from "react";
import {ReservaVisitanteVigente} from "./ReservaVisitanteVigente"
import {MenuOperador} from "../MenuOperador"
import {useParams, Link } from "react-router-dom";


export function ReservasVisitantesVigentes(){

    const[dataReservas, setDataReservas]=useState([])
    
    const params = useParams()

    useEffect(() => {
        var dia = new Date();
        var date = `${dia.getFullYear()}-0${dia.getMonth()+1}-${dia.getDate()}`;

        axios.post("http://localhost:3001/api/reservaInvitado/obtenerreservasinvitado",
        {IdParqueo: params.idparqueo}).then(res =>{
            setDataReservas(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const reservas = dataReservas.map(reserva => {
        var hoy = new Date();

        var hora = hoy.getHours() + ':' + hoy.getMinutes();
        var date = `${hoy.getFullYear()}-${hoy.getMonth()+1}-${hoy.getDate()}`;
        
        if (date == reserva.FechaReserva && reserva.HoraSalida > hora){
            console.log("Aja")
            return (
                <div>
                    <ReservaVisitanteVigente reserva={reserva}/>
                </div>
            )
            
        } else {
            if (date > reserva.FechaReserva) {
                console.log("Aja")
                return (
                    <div>
                        <ReservaVisitanteVigente reserva={reserva}/>
                    </div>
                )
            }
        }
    })

    return(
        <div className="App" align="Center">
            <MenuOperador/>
            <div>
                <h2>
                    Reservas Visitantes Vigentes
                </h2>

                <br></br>
                {reservas}
            </div>
        </div>
    )


}