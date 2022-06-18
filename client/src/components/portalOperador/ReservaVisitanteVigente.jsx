import React, { useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function ReservaVisitanteVigente({reserva}){
    const params = useParams()

    const navegar = useNavigate()
    //Para animacion
    useEffect(()=>{
        AOS.init()
    }, [])

    //Funcion para expirar la reserva
    function expirarReserva(numero) {
        	
        var hoy = new Date();
        var hora = hoy.getHours() + ':' + hoy.getMinutes();
        var date = `${hoy.getFullYear()}-${hoy.getMonth()+1}-${hoy.getDate()}`;

        axios.post('http://localhost:3001/api/reservaInvitado/expirarreserva', 
        {IdNumero: numero, HoraSalida: hora, FechaReserva: date}).then(res => {
            
            alert(res.data)
            navegar(0)
        }).catch(err => {
            console.log(err)
        })
    }

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
                    <button className="btn btn-outline-danger" onClick={()=>{expirarReserva(reserva.IdReserva)}}>Expirar Reserva</button>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
        </div>
    )


}