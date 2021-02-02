import React, { useState } from 'react';

import { FaArrowLeft} from 'react-icons/fa';


// import Button from '../../components/Button';
import Input from '../../../components/inputs/index';
import FotoAviso from '../../../assets/images/Aviso.svg'
import Helmet from 'react-helmet';
import * as Yup from 'yup';
import '../../../global.css';
import './style.css';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Formik, Form } from 'formik';
import jwt_decode from "jwt-decode";
import api from '../../../services/api';



function CadastroAdm() {

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const history = useHistory();

    const dataAdm = {
        nome,
        cpf,
        rg,
        email,
        senha,
    }





    const auth = `Bearer ${localStorage.getItem('conectando-key-auth')}`;

    let decoded: any = jwt_decode(auth);

    return (

        <Formik
            initialValues={
                {
                    nome: '',
                    email: '',
                    senha: '',
                    rg: '',
                    cpf: '',
                    cSenha: '',
                }}
            validationSchema={Yup.object({
                nome: Yup.string()
                    .max(15, 'Deve ter no máximo 15 caractéres')
                    .required('Required'),
                cpf: Yup.string()
                    .length(11, 'CPF inválido')
                    .required('Required'),
                rg: Yup.string()
                    .length(12, 'Tamanho inválido')
                    .required('Required'),
                email: Yup.string()
                    .email('email inválido')
                    .required('Required'),
                senha: Yup.string()
                    .min(3, 'Tamanho deve ser entre 3 a 8')
                    .max(8, 'Tamanho deve ser entre 3 a 8')
                    .required('Required'),
                cSenha: Yup.string()
                    .min(3, 'Tamanho deve ser entre 3 a 8')
                    .max(8, 'Tamanho deve ser entre 3 a 8')
                    .required('Required'),

            })}
            onSubmit={async (values, { setSubmitting }) => {
                if (values.senha === values.cSenha) {
                    try {
                        await api.post('/administrador', dataAdm, {
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json',
                                authorization: auth
                            }
                        })
                        history.push('/');
                    } catch (err) {
                        alert('Erro no cadastro, tente novamente');
                    }
                }
                else {
                    alert("Verifique se as senhas conferem!")
                }
            }}
        >

            <div className="tudoo" >
                <Helmet>
                    <style>
                        {` body{
                        background-color: #F4F4F4;
                    }`}

                    </style>
                </Helmet>
                <header className="headerAdm">
                    <div className="meio">
                        <div className="arrow">
                            <FaArrowLeft color="white" size={42} />
                        </div>
                        <div className="inverter">
                            <h1>Cadastre um novo<br />Adiministrador!</h1><br />
                            <h3>O primeiro passo é preencher esse formulário de cadastro.</h3>
                        </div>
                        <Form>
                            <div className="tabela">
                                <div className="arrumarTabela">


                                    <h2>Dados da Pessoa</h2>
                                    <div id="linha"></div>
                                    <Input label="Nome" name="nome" onBlur={(e) => setNome(e.target.value)} />
                                    <Input label="Email" name="email" onBlur={(e) => setEmail(e.target.value)} />
                                    <Input label="CPF" name="cpf" onBlur={(e) => setCpf(e.target.value)} />
                                    <Input label="RG" name="rg" onBlur={(e) => setRg(e.target.value)} />
                                    <div id="linha">
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around", }}>
                                        <Input label="Senha" name="senha" style={{ width: "13vw" }} onBlur={(e) => setSenha(e.target.value)} />
                                        <Input label="Confirmar Senha" name="cSenha" style={{ width: "13vw", }} />
                                    </div>

                                </div>

                            </div>
                            <div className="bottom">
                                <div id="together">
                                    <img src={FotoAviso} alt="aviso" />
                                    <p>Preencha todos <br /> os campos</p>
                                </div>

                                <button className="botao" type="submit">
                                    Cadastrar
                                    </button>

                            </div>
                        </Form>
                    </div>
                </header>
            </div>
        </Formik>

    );
}


export default CadastroAdm;