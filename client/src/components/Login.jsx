import React from "react";
import { useNavigate } from "react-router-dom";
//import './css/estiloLogin.css'
import fondo from './content/imgLogin.jpg'

export function Login(){

    
        const navegar = useNavigate()

        class  StrategyProfiles{
            constructor(){
                this._strategy = null;
            }
            set strategy(strategy){
                this._strategy =strategy;
            }
            get strategy(){
                return this.strategy;
            }
            doAction(){
                this._strategy.doAction();
            }
        }

        class Administrator {
            doAction(){
                       
                    navegar('/loginAdministrador')  
                
            }
        }

        class Funcionario {
            doAction(){
                       
                    navegar('/loginFuncionario')  
                
            }
        }

        class Parqueo {
            doAction(){
                       
                    navegar('/loginParqueo')  
                
            }
        }

        var strategyProfiles = new StrategyProfiles();
        const administrator = new Administrator();
        const funcionario = new Funcionario();
        const parqueo = new Parqueo();

        return (
            <section className="Form my-4 mx-5">
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-lg-5">
                        <img src={fondo} class="img-fluid"alt=""n />
                    </div>
                    <div className="col-lg-7 px-5 pt-5">
                        <h1 className="font-weight-bold py-3">Control de Parqueos TEC</h1>
                        <h4>Login</h4>
                     
                        <div className="form-row">
                            <div className="col-lg 7">
                                <button onClick={ (e) => {
                                   strategyProfiles = funcionario;
                                   strategyProfiles.doAction();
                                }                                    
                                } className="font-weight-bold btn-success  mt-3 mb-5" style={{width: "100%", borderRadius: "50px" , border: "1px solid white"}}><h4>Iniciar Sesión Funcionario</h4></button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-lg 7">
                            <button onClick={ (e) => {
                                    strategyProfiles = administrator;
                                    strategyProfiles.doAction();
                                }                                    
                                } className="font-weight-bold btn-success  mt-3 mb-5" style={{width: "100%", borderRadius: "50px", border: "1px solid white"}}><h4>Iniciar Sesión Administrador</h4></button>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-lg 7">
                            <button onClick={ (e) => {
                                    strategyProfiles = parqueo;
                                    strategyProfiles.doAction();
                                }                                    
                                } className="font-weight-bold btn-success  mt-3 mb-5" style={{width: "100%",borderRadius: "50px", border: "1px solid white"}}><h4>Iniciar Sesión Operador Parqueo</h4></button>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </section>
    
        );
       
    }
