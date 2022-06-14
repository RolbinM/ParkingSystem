import React from "react";
import {useParams } from "react-router-dom";

export function MenuFuncionario(){
    const params = useParams()
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="listafuncionarios">Menu de Funcionario</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link"  href={`/listafuncionario/${params.user}`}>Mi perfil</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href={`/parqueos/${params.user}`}>Parqueos</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="">Reservaciones</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="">Historial reservas</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/">Cerrar Sesion</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>



    );
   
}
