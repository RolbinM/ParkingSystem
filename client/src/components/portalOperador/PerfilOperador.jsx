import axios from "axios";
import React, { useEffect, useState } from "react";
import {Operador} from "./Operador"
import {MenuOperador} from "../MenuOperador"
import {useParams } from "react-router-dom";



export function PerfilOperador(){

    const[dataOperador, setDataOperador]=useState([])
    
    const params = useParams()

    useEffect(() => {
        axios.post("http://localhost:3001/api/operador/obtenerdataoperador2",
        {user: params.user}).then(res =>{
            setDataOperador(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const listaOperador = dataOperador.map(operador => {
        return (
            <div>
                <Operador operador={operador}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuOperador/>
            <div>
                <h2>
                    Mi Perfil
                </h2>
                <br></br>
                {listaOperador}
            </div>
        </div>
    )


}