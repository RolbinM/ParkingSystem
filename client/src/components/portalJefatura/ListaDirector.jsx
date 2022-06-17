import axios from "axios";
import React, { useEffect, useState } from "react";
import { Director } from "./Director";
import {MenuJefatura} from "../MenuJefatura"
import {useParams } from "react-router-dom";



export function ListaDirector(){

    const[datafuncionario, setdatafuncionario]=useState([])
    
    const params = useParams()

    useEffect(() => {
        axios.post("http://localhost:3001/api/funcionario/obtenerdatafuncionario2",
        {user: params.user}).then(res =>{
            console.log(res.data)
            setdatafuncionario(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    //Mapear lista usuarios en objeto usuario
    const listaDirector = datafuncionario.map(funcionario => {
        return (
            <div>
                <Director funcionario={funcionario}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuJefatura/>
            <div>
                <h2>
                    Director
                
                </h2>
                <br></br>
                {listaDirector}
            </div>
        </div>
    )


}