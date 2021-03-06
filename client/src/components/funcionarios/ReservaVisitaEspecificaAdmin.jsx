import React, { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function ReservaVisitaEspecificaAdmin({reserva}){

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
                            IdVisitante: {reserva.IdVisitante}
                        </li>
                        <li className="list-group-item">
                            Nombre visitante: {reserva.NombreV}
                        </li>
                        <li className="list-group-item">
                            IdParqueo: {reserva.IdParqueo}
                        </li>
                        <li className="list-group-item">
                            Placa: {reserva.PlacaV}
                        </li>
                        <li className="list-group-item">
                            TipoReserva: {reserva.TipoReserva}
                        </li>
                        <li className="list-group-item">
                            Motivo: {reserva.Motivo}
                        </li>
                        <li className="list-group-item">
                            SitioVisita: {reserva.SitioVisita}
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
            {/* <ListaPlacas/> */}
        </div>
    )


}