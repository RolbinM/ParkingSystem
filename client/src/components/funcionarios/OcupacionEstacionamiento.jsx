import axios from "axios";
import React, { useEffect, useState } from "react";
import {ParqueoEspecificoOcupacion} from "./ParqueoEspecificoOcupacion"
import {MenuAdmin} from "../MenuAdmin"


export function OcupacionEstacionamiento(){

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
                <ParqueoEspecificoOcupacion parqueo={parqueo}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuAdmin/>
            <div>
                <h2>
                    Reportes de ocupación en un parqueo
                </h2>
                <br></br>
                {listaparqueos}
            </div>
        </div>
    )


}