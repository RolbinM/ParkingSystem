import axios from "axios";
import React, { useEffect, useState } from "react";
import { ParqueoEspecificoJefatura } from "./ParqueoEspecificoJefatura";
import { MenuJefatura } from "../MenuJefatura";


export function ParqueosJefatura(){

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
                <ParqueoEspecificoJefatura parqueo={parqueo}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuJefatura/>
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