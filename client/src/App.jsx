import React, {Fragment, useState, useRef} from "react";
import { ListaFuncionarios } from "./components/funcionarios/ListaFuncionarios";
import {AgregarFuncionarios} from "./components/funcionarios/AgregarFuncionarios";
import {EditarFuncionario} from "./components/funcionarios/EditarFuncionario"
import {PlacasFuncionario} from "./components/funcionarios/PlacasFuncionario"
import {HorarioFuncionario} from "./components/funcionarios/HorarioFuncionario"
import {EditarHorario} from "./components/funcionarios/EditarHorario"
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export function App(){
   
    return (
        <div className="App" align="Center">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">CRUD MERN STACK</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="agregarfuncionario">Agregar funcionario</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>


            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ListaFuncionarios/> } exact></Route>
                    <Route path='/agregarfuncionario' element={<AgregarFuncionarios/>} exact></Route>
                    <Route path='/editarfuncionario/:idfuncionario' element={<EditarFuncionario/>} exact></Route>
                    <Route path='/placasfuncionario/:idfuncionario' element={<PlacasFuncionario/>} exact></Route>
                    <Route path='/horariofuncionario/:idfuncionario' element={<HorarioFuncionario/>} exact></Route>
                    <Route path='/editarhorariofuncionario/:idfuncionario,:dia' element={<EditarHorario/>} exact></Route>
                </Routes>
            </BrowserRouter>

        </div>

    );
   
}