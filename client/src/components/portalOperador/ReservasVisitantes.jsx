import axios from "axios";
import React, { useEffect, useState } from "react";
import {ReservaVisitante} from "./ReservaVisitante"
import {MenuOperador} from "../MenuOperador"
import {useParams, Link } from "react-router-dom";


export function ReservasVisitantes(){

    const[dataReservas, setDataReservas]=useState([])
    
    const params = useParams()

    useEffect(() => {
        axios.post("http://localhost:3001/api/reservaInvitado/obtenerreservasinvitado",
        {IdParqueo: params.idparqueo}).then(res =>{
            setDataReservas(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    const reservas = dataReservas.map(reserva => {
        return (
            <div>
                <ReservaVisitante reserva={reserva}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuOperador/>
            <div>
                <h2>
                    Reservas Oficiales
                </h2>
                <br />
                <div className="row">
                    <div className="col-4">
                       
                    </div> 
                    <div className="col-sm">
                        <Link to={`/reservasvisitantesvigentes/${params.user},${params.idparqueo}`}><li className="btn btn-outline-dark">Reservas Vigentes</li></Link>
                        &nbsp;
                    </div>
                    <div className="col-4">
                        
                    </div> 
                </div>
                <br></br>
                {reservas}
            </div>
        </div>
    )


}