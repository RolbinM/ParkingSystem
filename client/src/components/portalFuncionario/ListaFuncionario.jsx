import axios from "axios";
import React, { useEffect, useState } from "react";
import {Funcionario} from "./Funcionario"
import {MenuFuncionario} from "../MenuFuncionario"
import {useParams } from "react-router-dom";



export function ListaFuncionario(){

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
    const listafuncionario = datafuncionario.map(funcionario => {
        return (
            <div>
                <Funcionario funcionario={funcionario}/>
            </div>
        )
    })

    return(
        <div className="App" align="Center">
            <MenuFuncionario/>
            <div>
                <h2>
                    Funcionario
                
                </h2>
                <br></br>
                {listafuncionario}
            </div>
        </div>
    )


}