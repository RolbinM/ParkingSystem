import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReservaVisitaEspecificaAdmin } from "./ReservaVisitaEspecificaAdmin";
import {MenuAdmin} from "../MenuAdmin"
import {useParams } from "react-router-dom";



export function HistorialReservasVisitas(){

    const [datareservas, setReservas]=useState([])


    useEffect(() => {
        axios.post("http://localhost:3001/api/reservaInvitado/obtenerreservasinvitadoAdmin",
        {}).then(res2 =>{
            setReservas(res2.data)
        })
    
    }, [])


        //Mapear lista usuarios en objeto usuario
        const listaReservas= datareservas.map(reserva => {
            return (
                <div>
                    <ReservaVisitaEspecificaAdmin reserva={reserva}/>
                </div>
            )
        })
    

    return(
        <div className="App" align="Center">
            <MenuAdmin/>
            <div>
                <h2>
                    Historial Reservas Invitados
                </h2>
                <br></br>
                {listaReservas}
            </div>
        </div>
    )


}