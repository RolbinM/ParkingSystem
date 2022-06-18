import axios from "axios";
import React, { useEffect, useState } from "react";
import {ReservaOficial} from "./ReservaOficial"
import {MenuOperador} from "../MenuOperador"
import {useParams, Link } from "react-router-dom";


export function ReservasOficiales(){

    const[dataReservas, setDataReservas]=useState([])
    
    const params = useParams()

    useEffect(() => {
        axios.post("http://localhost:3001/api/reservaoficial/obtenerreservasoficiales",
        {IdParqueo: params.IdParqueo}).then(res =>{
            setDataReservas(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    const reservas = dataReservas.map(reserva => {
        return (
            <div>
                <ReservaOficial reserva={reserva}/>
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
                        <Link to={`/agregarreservaoficial/${params.user},${params.idparqueo}`}><li className="btn btn-outline-success">Agregar Reserva</li></Link>
                        &nbsp;
                    </div> 
                    <div className="col-sm">
                        <Link to={`/horarioparqueooperador/${params.user},${params.idparqueo}`}><li className="btn btn-outline-dark">Reservas Vigentes</li></Link>
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