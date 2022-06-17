import React from 'react';
//import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {createRoot} from 'react-dom/client';

import {Login} from "./components/Login"
import {LoginAdministrador} from "./components/LoginAdministrador"
import {LoginFuncionario} from "./components/LoginFuncionarios"
import {LoginParqueo} from "./components/LoginParqueo"

import {ListaFuncionarios} from "./components/funcionarios/ListaFuncionarios";
import {AgregarFuncionarios} from "./components/funcionarios/AgregarFuncionarios";
import {EditarFuncionario} from "./components/funcionarios/EditarFuncionario"
import {PlacasFuncionario} from "./components/funcionarios/PlacasFuncionario"
import {HorarioFuncionario} from "./components/funcionarios/HorarioFuncionario"
import {EditarHorario} from "./components/funcionarios/EditarHorario"
import {AgregarOperador} from "./components/funcionarios/AgregarOperador"
import {ListaOperadores} from "./components/funcionarios/ListaOperadores"
import {EditarOperador} from "./components/funcionarios/EditarOperador"

import {ListaParqueos} from "./components/parqueos/ListaParqueos";
import {AgregarParqueo} from "./components/parqueos/AgregarParqueo";
import {EditarParqueo} from "./components/parqueos/EditarParqueo";
import {HorarioParqueo} from "./components/parqueos/HorarioParqueo";
import {EditarHorarioParqueo} from "./components/parqueos/EditarHorarioParqueo";

import {ReporteFuncionarios } from './components/reportes/ReporteFuncionarios';
import {ReporteParqueos } from './components/reportes/ReporteParqueos';
import {ReporteConsultaFuncionario } from './components/reportes/ReporteConsultaFuncionario';
import {ReporteFranjasHorarias } from './components/reportes/ReporteFranjasHorarias';

import {ListaFuncionario} from "./components/portalFuncionario/ListaFuncionario";
import { Parqueos } from './components/portalFuncionario/Parqueos';
import { Reserva } from './components/portalFuncionario/Reserva';
import { HistorialReservas } from './components/portalFuncionario/HistorialReservas';
import { Placas } from './components/portalFuncionario/Placas';
import { Horario } from './components/portalFuncionario/Horario';

import { ListaDirector } from './components/portalJefatura/ListaDirector';
import { PlacasJefatura } from './components/portalJefatura/PlacasJefatura'
import { HorarioJefatura } from './components/portalJefatura/HorarioJefatura';
import { ParqueosJefatura } from './components/portalJefatura/ParqueosJefatura';
import { ReservaJefatura } from './components/portalJefatura/ReservaJefatura';
import { ReservaVisitasJefatura } from './components/portalJefatura/ReservasVisitasJefatura';
import { HistorialReservasJefatura } from './components/portalJefatura/HistorialReservasJefatura';
import { HistorialReservasJefaturaVisitas } from './components/portalJefatura/HistorialReservasJefaturaVisitas';

import { PerfilOperador } from './components/portalOperador/PerfilOperador';
import { ParqueosOperador } from './components/portalOperador/ParqueosOperador';
import { HorarioParqueoOperador } from './components/portalOperador/HorarioParqueoOperador';



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/> } exact></Route>

            <Route path='/loginAdministrador/' element={<LoginAdministrador/>} exact></Route>
            <Route path='/loginParqueo/' element={<LoginParqueo/>} exact></Route>
            <Route path='/loginFuncionario/' element={<LoginFuncionario/>} exact></Route>

            <Route path='/listafuncionarios' element={<ListaFuncionarios/> } exact></Route>
            <Route path='/listafuncionario/:user' element={<ListaFuncionario/> } exact></Route>
            <Route path='/agregarfuncionario' element={<AgregarFuncionarios/>} exact></Route>
            <Route path='/editarfuncionario/:idfuncionario' element={<EditarFuncionario/>} exact></Route>
            <Route path='/placasfuncionario/:idfuncionario' element={<PlacasFuncionario/>} exact></Route>
            <Route path='/horariofuncionario/:idfuncionario' element={<HorarioFuncionario/>} exact></Route>
            <Route path='/editarhorariofuncionario/:idfuncionario,:dia' element={<EditarHorario/>} exact></Route>
            <Route path='/agregaroperador' element={<AgregarOperador/>} exact></Route>
            <Route path='/listaoperadores' element={<ListaOperadores/> } exact></Route>
            <Route path='/editaroperador/:idoperador' element={<EditarOperador/> } exact></Route>

            <Route path='/listaparqueos' element={<ListaParqueos/> } exact></Route>
            <Route path='/agregarparqueo' element={<AgregarParqueo/>} exact></Route>
            <Route path='/editarparqueo/:idparqueo' element={<EditarParqueo/>} exact></Route>
            <Route path='/horarioparqueo/:idparqueo' element={<HorarioParqueo/>} exact></Route>
            <Route path='/editarhorarioparqueo/:idparqueo,:dia' element={<EditarHorarioParqueo/>} exact></Route>

            <Route path='/reportefuncionarios/' element={<ReporteFuncionarios/>} exact></Route>
            <Route path='/reporteparqueos/' element={<ReporteParqueos/>} exact></Route>
            <Route path='/reporteconsultafuncionario/:identi' element={<ReporteConsultaFuncionario/>} exact></Route>
            <Route path='/reportehorarios/' element={<ReporteFranjasHorarias/>} exact></Route>

            <Route path='/parqueos/:user' element={<Parqueos/>} exact></Route>
            <Route path='/reservar/:user,:idparqueo' element={<Reserva/>} exact></Route>
            <Route path='/reservahistorial/:user' element={<HistorialReservas/>} exact></Route>
            <Route path='/placasfuncionarioespecifico/:idfuncionario,:user' element={<Placas/>} exact></Route>
            <Route path='/horariofuncionarioespecifico/:idfuncionario,:user' element={<Horario/>} exact></Route>

            <Route path='/listadirector/:user'  element={<ListaDirector/> } exact></Route>
            <Route path='/placasdirectorespecifico/:idfuncionario,:user' element={<PlacasJefatura/>} exact></Route>
            <Route path='/horariodirectorespecifico/:idfuncionario,:user' element={<HorarioJefatura/>} exact></Route>
            <Route path='/parqueosjefatura/:user' element={<ParqueosJefatura/>} exact></Route>
            <Route path='/reservarjefatura/:user,:idparqueo' element={<ReservaJefatura/>} exact></Route>
            <Route path='/reservarinvitadosjefatura/:user,:idparqueo' element={<ReservaVisitasJefatura/>} exact></Route>
            <Route path='/historialreservasjefatura/:user' element={<HistorialReservasJefatura/>} exact></Route>
            <Route path='/historialreservasinvitadojefatura/:user' element={<HistorialReservasJefaturaVisitas/>} exact></Route>

            <Route path='/perfiloperador/:user'  element={<PerfilOperador/> } exact></Route>
            <Route path='/parqueosoperador/:user'  element={<ParqueosOperador/> } exact></Route>
            <Route path='/horarioparqueooperador/:user,:idparqueo'  element={<HorarioParqueoOperador/> } exact></Route>

        </Routes>
    </BrowserRouter>
  </>,
);
