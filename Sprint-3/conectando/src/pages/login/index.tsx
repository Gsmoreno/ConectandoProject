import React, { useEffect, useState } from 'react';
import Input from '../../components/inputs/index';
import conectandoImg from '../../assets/images/LogoSemFundo.svg';
import senaiImg from '../../assets/images/logoVermelho.svg';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Formik, Form } from 'formik';
import jwtDecode from 'jwt-decode';
import { Token } from '../Felipe/perfil';


function Login() {

    let history = useHistory();

useEffect(()=>{
    localStorage.clear();
},[])

    return (
        <Formik

            initialValues={
                {
                    entrada: '',
                    senha: '',
                }}
            onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                api.post('/login', data)
                    .then(res => {
                        if (res.data.token !== undefined) {
                            localStorage.setItem('conectando-key-auth', res.data.token)

                            history.push('/listaVagas')

                            const authDec:any = jwtDecode(`Bearer ${res.data.token}`);
                            const role = authDec["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                            if (role === "Aluno") {
                                history.push('/vagasAluno');
                            }
                            else if (role === "Empresa") {
                                history.push('/perfilEmpresa');
                            }
                            else if (role === "Administrador") {
                                history.push('/listaAluno');
                            }

                        } else {
                            localStorage.clear();
                            alert("Senha ou email incorretos!")
                        }
                    }).catch(error => console.log(error));
                    setSubmitting(false);
            }}

        >
            {({  isSubmitting }) => (
                <div className="containerLogin">
                    <div className="logos">
                        <img src={conectandoImg} alt="Logo conectando" />
                        <img src={senaiImg} alt="Logo senai vermelho" />
                    </div>
                    <div className="form">
                        <h1>Login</h1>
                        <Form >
                            <Input label="E-mail / CPF / CNPJ" name="entrada" />
                            <Input type="password" label="Senha" name="senha" />
                            <button type="submit" disabled={isSubmitting} >Entrar</button>
                        </Form>

                        <span>Não tem cadastro?</span>
                        <span>Entre como<Link to="/cadastroempresa">&nbsp;EMPRESA&nbsp;</Link> ou <Link to="/cadastroaluno">&nbsp;ALUNO&nbsp;</Link></span>
                    </div>
                </div>
            )}
        </Formik>

    );
}

export default Login;