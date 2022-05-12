import axios from "axios";
import React, { useEffect, useState } from "react";
import {FuncionarioEspecifico} from "./FuncionarioEspecifico"

export function ListaFuncionarios(){

    const[datafuncionario, setdatafuncionario]=useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/api/funcionario/obtenerfuncionarios").then(res =>{
            console.log(res.data)
            setdatafuncionario(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    //Mapear lista usuarios en objeto usuario
    const listafuncionarios = datafuncionario.map(funcionario => {
        return (
            <div>
                <FuncionarioEspecifico funcionario={funcionario}/>
            </div>
        )
    })

    return(
        <div>
            <h2>
                Lista de funcionarios
               
            </h2>
            <br></br>
            {listafuncionarios}
        </div>
    )


}