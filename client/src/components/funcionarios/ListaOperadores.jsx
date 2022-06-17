import axios from "axios";
import React, { useEffect, useState } from "react";
import {OperadorEspecifico} from "./OperadorEspecifico"
import {MenuAdmin} from "../MenuAdmin"


export function ListaOperadores(){

    const[dataoperadores, setDataOperadores]=useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/api/operador/obteneroperadores").then(res =>{
            setDataOperadores(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const listaOperadores = dataoperadores.map(operador => {
        return (
            <div>
                <OperadorEspecifico operador={operador}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuAdmin/>
            <div>
                <h2>
                    Lista de Operadores
                
                </h2>
                <br></br>
                {listaOperadores}
            </div>
        </div>
    )


}