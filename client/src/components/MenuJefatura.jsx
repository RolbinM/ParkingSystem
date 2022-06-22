import React from "react";
import './css/styleMenuAdmin.css'
import {useParams } from "react-router-dom";

export function MenuJefatura(){
    const params = useParams()
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href={`/listadirector/${params.user}`}>Menu de Director</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link"  href={`/listadirector/${params.user}`}>Mi perfil</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href={`/parqueosjefatura/${params.user}`}>Parqueos</a>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" href={`/historialparametrizadojefatura/${params.user}`}>Reservaciones</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href={`/historialreservasjefatura/${params.user}`}>Historial reservas</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href={`/historialreservasinvitadojefatura/${params.user}`}>Historial reservas visitas</a>
                        </li>

                        <div className="dropdown">
                            <button className="dropbtn">Reportes</button>
                            <div className="dropdown-content">
                                <a href="/ocupacionestacionamientojefatura">Ocupación Estacionamiento</a>
                                <a href="/reporteparqueodepartamento">Departamentos Estacionamiento</a>
                            </div>
                        </div>

                        <li className="nav-item">
                            <a className="nav-link" href="/">Cerrar Sesion</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>



    );
   
}
