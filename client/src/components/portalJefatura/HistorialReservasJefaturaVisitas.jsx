import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReservaVisitaEspecifica } from "./ReservaVisitaEspecifica";
import { MenuJefatura } from "../MenuJefatura";
import {useParams } from "react-router-dom";



export function HistorialReservasJefaturaVisitas(){

    //const[datafuncionario, setdatafuncionario]=useState([])
    const [funcionario, setFuncionario]=useState(null)
    const [datareservas, setReservas]=useState([])

    const params = useParams()

    useEffect(() => {
        var cedula;
        axios.post('http://localhost:3001/api/funcionario/obtenerdatafuncionario2', 
                {user: params.user}).then(res => {
                        setFuncionario(res.data[0])
                        console.log(res.data[0])
                        cedula = res.data[0].Identificacion
                        
                        axios.post("http://localhost:3001/api/reservaInvitado/obtenerreservasinvitadoId",
                        {identificacion: cedula}).then(res2 =>{
                            console.log(cedula)
                            console.log(res2.data)
                            setReservas(res2.data)
                        })

                        
                })
       
    
    }, [])


        //Mapear lista usuarios en objeto usuario
        const listaReservas= datareservas.map(reserva => {
            return (
                <div>
                    <ReservaVisitaEspecifica reserva={reserva}/>
                </div>
            )
        })
    

    return(
        <div className="App" align="Center">
            <MenuJefatura/>
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