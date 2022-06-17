import React from "react";
import {useParams } from "react-router-dom";

export function MenuOperador(){
    const params = useParams()
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href={`/perfiloperador/${params.user}`}>Menu de Operador</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link"  href={`/perfiloperador/${params.user}`}>Mi perfil</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href={`/parqueosoperador/${params.user}`}>Parqueos</a>
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
