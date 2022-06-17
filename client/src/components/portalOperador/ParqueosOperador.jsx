import axios from "axios";
import React, { useEffect, useState } from "react";
import {Parqueo} from "./Parqueo"
import {MenuOperador} from "../MenuOperador"
import {useParams } from "react-router-dom";



export function ParqueosOperador(){

    const[dataParqueos, setDataParqueos]=useState([])
    
    const params = useParams()

    useEffect(() => {
        axios.post("http://localhost:3001/api/operador/obtenerdataoperador2",
        {user: params.user}).then(res =>{
            
            axios.post("http://localhost:3001/api/parqueo/obtenerparqueooperador",
            {operador: res.data[0].Identificacion}).then(resParqueos =>{
                setDataParqueos(resParqueos.data)
            }).catch(err => {
                console.log(err)
            })

            setDataParqueos(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    const parqueos = dataParqueos.map(parqueo => {
        return (
            <div>
                <Parqueo parqueo={parqueo}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuOperador/>
            <div>
                <h2>
                    Parqueos A Cargo
                </h2>
                <br></br>
                {parqueos}
            </div>
        </div>
    )


}