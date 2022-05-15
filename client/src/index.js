import React from 'react';
import {StrictMode} from 'react';
//import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {createRoot} from 'react-dom/client';

import {Login} from "./components/Login"
import { ListaFuncionarios } from "./components/funcionarios/ListaFuncionarios";
import {AgregarFuncionarios} from "./components/funcionarios/AgregarFuncionarios";
import {EditarFuncionario} from "./components/funcionarios/EditarFuncionario"
import {PlacasFuncionario} from "./components/funcionarios/PlacasFuncionario"
import {HorarioFuncionario} from "./components/funcionarios/HorarioFuncionario"
import {EditarHorario} from "./components/funcionarios/EditarHorario"

import {ListaParqueos} from "./components/parqueos/ListaParqueos";
import {AgregarParqueo} from "./components/parqueos/AgregarParqueo";
import {EditarParqueo} from "./components/parqueos/EditarParqueo";
import {HorarioParqueo} from "./components/parqueos/HorarioParqueo";
import {EditarHorarioParqueo} from "./components/parqueos/EditarHorarioParqueo";

import {ReporteFuncionarios } from './components/reportes/ReporteFuncionarios';
import {ReporteParqueos } from './components/reportes/ReporteParqueos';
import {ReporteConsultaFuncionario } from './components/reportes/ReporteConsultaFuncionario';
import {ReporteFranjasHorarias } from './components/reportes/ReporteFranjasHorarias';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/> } exact></Route>

            <Route path='/listafuncionarios' element={<ListaFuncionarios/> } exact></Route>
            <Route path='/agregarfuncionario' element={<AgregarFuncionarios/>} exact></Route>
            <Route path='/editarfuncionario/:idfuncionario' element={<EditarFuncionario/>} exact></Route>
            <Route path='/placasfuncionario/:idfuncionario' element={<PlacasFuncionario/>} exact></Route>
            <Route path='/horariofuncionario/:idfuncionario' element={<HorarioFuncionario/>} exact></Route>
            <Route path='/editarhorariofuncionario/:idfuncionario,:dia' element={<EditarHorario/>} exact></Route>

            <Route path='/listaparqueos' element={<ListaParqueos/> } exact></Route>
            <Route path='/agregarparqueo' element={<AgregarParqueo/>} exact></Route>
            <Route path='/editarparqueo/:idparqueo' element={<EditarParqueo/>} exact></Route>
            <Route path='/horarioparqueo/:idparqueo' element={<HorarioParqueo/>} exact></Route>
            <Route path='/editarhorarioparqueo/:idparqueo,:dia' element={<EditarHorarioParqueo/>} exact></Route>

            <Route path='/reportefuncionarios/' element={<ReporteFuncionarios/>} exact></Route>
            <Route path='/reporteparqueos/' element={<ReporteParqueos/>} exact></Route>
            <Route path='/reporteconsultafuncionario/:identi' element={<ReporteConsultaFuncionario/>} exact></Route>
            <Route path='/reportehorarios/' element={<ReporteFranjasHorarias/>} exact></Route>

        </Routes>
    </BrowserRouter>
  </StrictMode>,
);
