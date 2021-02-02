import React, { useEffect } from 'react';

import {FiCheck, FiX} from 'react-icons/fi'

import HeaderAluno from '../../../components/headerAluno/index';
import Footer from '../../../components/footer/index';

import './style.css';
import Axios from 'axios';
import ReactDOM from 'react-dom';

function ConfirmacaoAluno(){

    const api = Axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem("conectando-key-auth")
        }
    })

    useEffect(() =>{
        BuscarAlunos()
    }, [])

    const BuscarAlunos = () =>{
        api.get("/Aluno")
        .then(response => {
            ReactDOM.render(alunosConfirmar(response.data),document.getElementById("listaAluno"))
        })
    }

    const Rejeitar = (id:any) =>{
        let div = <>
        <p>Se você recusar esse usuario ele vai ser excluido permanentemente! Você deseja excluir?</p>
        <div id="Buttons_confirmacao">
            <button id="Button_Excluir" onClick={() => Excluir(id)}>Excluir</button>
            <button id="Button_Cancelar" onClick={() => Cancelar(id)}>Cancelar</button>
        </div>
        </>
        ReactDOM.render(div,document.getElementById('div_Escondida'+id))
        let divEscondida = document.getElementById('div_Escondida'+id)
        if(divEscondida !== null)
            divEscondida.style.display = 'block'
    }

    const Cancelar = (id:any) =>{
        let divEscondida = document.getElementById('div_Escondida'+id)
        if(divEscondida !== null)
            divEscondida.style.display = 'none'
    }

    const Excluir = (id:any) =>{
        let divEscondida = document.getElementById('div_Escondida'+id)
        if(divEscondida !== null)
            divEscondida.style.display = 'none'
        api.delete("/Aluno/"+id)
        .then(res =>{
            BuscarAlunos()
        })
        
        
    }

    const alunosConfirmar = (e:any)=>{
        e.map((aluno:any) =>{
            Cancelar(aluno.idAluno)
        })
        return(
            <div>
                {e.map((aluno:any)=>(
                    
                    <>
                        <div>
                            <div className="confirmar" id={"confirmar"+aluno.idAluno}>
                                <img src="" alt="" className="imgExemplo"/>
                                <div>
                                    <h3>{aluno.nome}</h3>
                                    <h4>{aluno.cpf}</h4>
                                </div>
                
                                <div>
                                    <FiCheck className="aceitar"/>
                                    <FiX className="recusar" onClick={() => Rejeitar(aluno.idAluno)}/>
                                </div>
                            </div>

                            <div className="divs_Escondidas" id={"div_Escondida"+aluno.idAluno}>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            
        );
    }

    return(
        <div>
            <HeaderAluno/>
            <div>
                <div className="div-menu">
                    <h1 className="sublinhar">Confirmação</h1>
                    <h1 onClick={() => window.location.href = "/CadastroTags"}>Cadastro</h1>
                </div>

                <div className="div-confirmacao">
                    <h2 onClick={() => window.location.href = "/confirmacaoEmpresa"}>Empresa</h2>
                    <h2 className="sublinhar">Aluno</h2>
                </div>

                <div className="AlunosConfirmar" id="listaAluno">
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default ConfirmacaoAluno;