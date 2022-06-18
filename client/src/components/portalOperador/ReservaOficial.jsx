import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function ReservaOficial({reserva}){
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
                            Identificación Operador: {reserva.IdOperador}
                        </li>
                        <li className="list-group-item">
                            Parqueo: {reserva.IdParqueo}
                        </li>
                        <li className="list-group-item">
                            Placa: {reserva.Placa}
                        </li>
                        <li className="list-group-item">
                            Modelo: {reserva.Modelo}
                        </li>
                        <li className="list-group-item">
                            Color: {reserva.Color}
                        </li>
                        <li className="list-group-item">
                            Chofer: {reserva.Chofer}
                        </li>
                        <li className="list-group-item">
                            Fecha de Uso: {reserva.FechaReserva}
                        </li>
                        <li className="list-group-item">
                            Hora de Entrada: {reserva.HoraEntrada}
                        </li>
                        <li className="list-group-item">
                            Hora de Salida: {reserva.HoraSalida}
                        </li>
                    </ul>
                    <br />
                    <hr className="mt-4"></hr>
                </div> 
            </div>
        </div>
    )


}