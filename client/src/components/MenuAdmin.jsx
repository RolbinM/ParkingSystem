import React, {Fragment, useState, useRef} from "react";

export function MenuAdmin(){
   
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="listafuncionarios">Menu de Administrador</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link"  href="/listafuncionarios">Lista de Funcionarios</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/listaParqueos">Listar de Parqueos</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/agregarfuncionario">Agregar Funcionarios</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/agregarparqueo">Agregar Parqueo</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/reportefuncionarios">Reporte Funcionarios</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/reporteparqueos">Reporte Parqueos</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/reportehorarios">Reporte Horarios</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/reporteconsultafuncionario/1">Consulta Funcionario</a>
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
