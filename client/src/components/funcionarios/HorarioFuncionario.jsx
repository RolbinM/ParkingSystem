import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {useParams } from "react-router-dom";
import AOS from 'aos'



export function HorarioFuncionario(){

    //Para animacion
    useEffect(()=>{
            AOS.init()
    }, [])
    

    const params = useParams()

    const [datahorario, sethorario]=useState([])

    useEffect(() => {
        axios.post('http://localhost:3001/api/funcionario/obtenerhorariofuncionario', 
        {idfuncionario: params.idfuncionario}).then(res => {
            const datafuncionario = res.data[0]
            sethorario(datafuncionario.Horario)
            //console.log(datahorario)
        }) 
    }, [])

    

    const display = datahorario.map(item => {
        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-10 offset-1" data-aos="flip-down">
                    <ul className="list-group">
                        <li className="list-group-item">
                            {item.day}
                        </li>
                        Hora Entrada 
                        <li className="list-group-item">
                            {item.start_time}
                        </li>
                        Hora Salida
                        <li className="list-group-item">
                            {item.end_time}
                        </li>
                    </ul>
                    <br />
                    <Link to={`/editarhorariofuncionario/${params.idfuncionario},${item.day}`}><li className="btn btn-outline-warning">Editar</li></Link>
                    <hr className="mt-4"></hr>
                </div> 
            </div>
        </div>
          );
        });

    
    return(
        <div>
            <h2>
                Horario de {params.idfuncionario}
            </h2>
                {display}
            <br></br>
            
        </div>
    )


}


