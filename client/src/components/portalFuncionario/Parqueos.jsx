import axios from "axios";
import React, { useEffect, useState } from "react";
import {ParqueoEspecifico} from "./ParqueoEspecifico"
import {MenuFuncionario} from "../MenuFuncionario"


export function Parqueos(){

    const[dataparqueo, setdataparqueo]=useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/api/parqueo/obtenerparqueos").then(res =>{
            setdataparqueo(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    //Mapear lista usuarios en objeto usuario
    const listaparqueos = dataparqueo.map(parqueo => {
        return (
            <div>
                <ParqueoEspecifico parqueo={parqueo}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuFuncionario/>
            <div>
                <h2>
                    Lista de Parqueos
                
                </h2>
                <br></br>
                {listaparqueos}
            </div>
        </div>
    )


}