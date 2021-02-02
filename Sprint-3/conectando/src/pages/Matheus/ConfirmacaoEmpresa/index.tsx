import React, { useEffect } from 'react';

import {FiCheck, FiX} from 'react-icons/fi'

import HeaderAluno from '../../../components/headerAluno/index';
import Footer from '../../../components/footer/index';

import './style.css';
import Axios from 'axios';
import ReactDOM from 'react-dom';

function ConfirmacaoEmpresa(){

    const api = Axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem("token-conectando")
        }
    })

    useEffect(() => {
        BuscarEmpresa()
    }, [])

    const BuscarEmpresa = () =>{
        api.get("/Empresa")
        .then((response: { data: any; }) =>{
            console.log(response.data)
            ReactDOM.render(empresaConfirmar(response.data),document.getElementById("empresaLista"))
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
        api.delete("/Empresa/"+id)
        .then(res =>{
            BuscarEmpresa()
        })
        
        
    }

    const Aceitar = (id:any) =>{
        api.get('/Empresa/'+id)
        .then(res => {
            res.data.situacao = 1
            api.put('/Empresa/'+id,res.data)
            .then(e =>{
                BuscarEmpresa()
            })
        })
    }

    const empresaConfirmar = (e : any)=>{
        e.map((empresa:any) =>{
            Cancelar(empresa.idEmpresa)
        })
        return(
            <div>
                {e.filter((em:any) => em.situacao === 0).map((empresa:any) =>(
                    <>
                    <div>
                        <div className="div-confirmar">
                            <h2>{empresa.nomeFantasia}</h2>
                            <div className="confirmar">
                                <img src="" alt="" className="imgExemplo"/>
                                <div>
                                    <h3>{empresa.email}</h3>
                                    <h3>{empresa.whatsapp}</h3>
                                </div>

                                <div>
                                    <h3>Cidade/Estado</h3>
                                    <h3>{empresa.cnpj}</h3>
                                </div>

                                <div>
                                    <FiCheck className="aceitar" onClick={() => Aceitar(empresa.idEmpresa)}/>
                                    <FiX className="recusar" onClick={() => Rejeitar(empresa.idEmpresa)}/>
                                </div>
                            </div>
                        </div>

                        <div className="divs_Escondidas" id={"div_Escondida"+empresa.idEmpresa}>
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
                    <h2 className="sublinhar">Empresa</h2>
                    <h2 onClick={() => window.location.href = "/confirmacaoAluno"}>Aluno</h2>
                </div>

                <div className="empresaConfirmar" id="empresaLista">
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default ConfirmacaoEmpresa;