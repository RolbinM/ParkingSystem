import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function ReservaVisitante({reserva}){
    const params = useParams()

    //Para animacion
    useEffect(()=>{
        AOS.init()
    }, [])

    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-10 offset-1" data-aos="zoom-in">
                    <ul className="list-group">
                        <li className="list-group-item">
                            IdReserva: {reserva.IdReserva}
                        </li>
                        <li className="list-group-item">
                            IdParqueo: {reserva.IdParqueo}
                        </li>
                        <li className="list-group-item">
                            Placa: {reserva.Placa}
                        </li>
                        <li className="list-group-item">
                            Dia: {reserva.Dia}
                        </li>
                        <li className="list-group-item">
                            Fecha: {reserva.Fecha}
                        </li>
                        <li className="list-group-item">
                            FechaReserva: {reserva.FechaReserva}
                        </li>
                        <li className="list-group-item">
                            HoraEntrada: {reserva.HoraEntrada}
                        </li>
                        <li className="list-group-item">
                            HoraSalida: {reserva.HoraSalida}
                        </li>
                    </ul>
                    <br />
                    <hr className="mt-4"></hr>
                </div> 
            </div>
        </div>
    )


}