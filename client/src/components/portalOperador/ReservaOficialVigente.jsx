import React, { useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import AOS from 'aos'
import 'aos/dist/aos.css'


export function ReservaOficialVigente({reserva}){
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

        axios.post('http://localhost:3001/api/reservaoficial/expirarreserva', 
        {IdNumero: numero, HoraSalida: hora}).then(res => {
            
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
                    <button className="btn btn-outline-danger" onClick={()=>{expirarReserva(reserva.IdReserva)}}>Expirar Reserva</button>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
        </div>
    )


}