import React, { useState } from 'react';

import { FaArrowLeft } from 'react-icons/fa';

import Input from '../../../components/inputs/index';
import FotoAviso from '../../../assets/images/Aviso.svg'

import '../../../global.css';
import './style.css';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import api from '../../../services/api';
import Helmet from 'react-helmet';
import { useHistory } from "react-router-dom";


function CadastroEmpresa() {

    const history = useHistory();

    const Schema = {
        senha: Yup.string().required("This field is required"),
        confirmarsenha: Yup.string().when("senha", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("senha")],
                "Both password need to be the same"
            )
        })
    };


    function onBlurCep(ev:any, setFieldValue: any) {
        const { value } = ev.target;

        var cep = value?.replace("-", "")

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setFieldValue('idEnderecoNavigation.cidade', data.localidade);
                setFieldValue('idEnderecoNavigation.bairro', data.bairro);
                setFieldValue('idEnderecoNavigation.rua', data.logradouro);
                setFieldValue('idEnderecoNavigation.uf', data.uf);
                
            }) 
            .catch(erro => console.error(erro))
    }

    return (
        <Formik
            initialValues={
                {
                    nomeFantasia: '',
                    razaoSocial: '',
                    porteempresa: '',
                    email: '',
                    cnpj: '',
                    cnae: '',
                    whatsapp: '',
                    foto: '',
                    senha: '',
                    idEnderecoNavigation:{
                        cep:'',
                        rua:'',
                        bairro:'',
                        uf:''
                    }
                    
                }}
            validationSchema={Yup.object({
                nomeFantasia: Yup.string()
                    .max(20, 'Deve ter no máximo 20 caracteres')
                    .required('obrigatório'),
                razaoSocial: Yup.string()
                    .max(20, 'Deve ter no máximo 20 caracteres')
                    .required('obrigatório'),
                email: Yup.string()
                    .email('Email inválido')
                    .required('obrigatório'),
                cnpj: Yup.string()
                    .max(14, 'Deve ter no máximo 14 caracteres')
                    .min(13, 'Deve ter no minímo 13 caracteres')
                    .required('obrigatório'),
                cnae: Yup.string()
                    .max(7, 'Deve ter 7 caracteres')
                    .min(7, 'Deve ter 7 caracteres')
                    .length(7, 'CNAE inválido')
                    .required('obrigatório'),
                whatsapp: Yup.string()
                    .min(10, 'Whatsapp inválido')
                    .required('obrigatório'),
                senha: Yup.string()
                    .required("This field is required"),

            })}
            onSubmit={async (data, { setSubmitting }) => {
                setSubmitting(true);
                console.log(data);
                await api.post('/empresa', data)
                    .then((res) => {
                        console.log(res);
                    });
                    
                setSubmitting(false);
            }}
        >
            {({ values, handleBlur, handleChange, isSubmitting, setFieldValue }) => (
                <div className="tudo" >
                    <Helmet>
                        <style>
                            {` body{
                    background-color: #F4F4F4;
                }

                    .tudo{
                        background-color: #F4F4F4;
                        
                }`}
                        </style>
                    </Helmet>

                    <header>
                        <div className="midCadastro">
                            <div className="arrow">
                                <FaArrowLeft color="white" size={42} />
                            </div>
                            <div className="inverter">
                                <h1>Seja bem vindo a familia SENAI!</h1><br />
                                <h3>O primeiro passo é preencher esse formulário de cadastro.</h3>
                            </div>

                            <Form>

                                <div className="tabelaEmpresa">
                                    <div className="arrumarTabela">
                                        <h2>Seus Dados</h2>
                                        <div id="linha"></div>

                                        <Input label="Nome fantasia" name="nomeFantasia" />
                                        <Input label="Razão social" name="razaoSocial" />
                                        <Input label="Porte da empresa" name="porteempresa" />
                                        <Input label="Email" name="email" />
                                        <Input label="CNPJ" name="cnpj" />
                                        <Input label="CNAE" name="cnae" />
                                        <Input label="Whatsapp" name="whatsapp" />
                                        <Input label="Foto" name="foto" />
                                        <Input type="password" label="Senha" name="senha" onBlur={handleBlur} onChange={handleChange} value={values.senha} />

                                        <h2>Seu endereço</h2>
                                        <div id="linha"></div>
                                        <Input label="CEP" name="idEnderecoNavigation.cep" onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
                                        <div id="estadoEmpresa">
                                            <Input label="Cidade" name="idEnderecoNavigation.cidade"/>
                                            <Input label="UF" name="idEnderecoNavigation.uf" />
                                        </div>
                                        <Input label="Bairro" name="idEnderecoNavigation.bairro"  />
                                        <div id="numeroEmpresa">
                                            <Input label="Rua" name="idEnderecoNavigation.rua" />
                                            <Input label="Número" name="idEnderecoNavigation.numero" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bottomEmpresa">
                                    <div id="together">
                                        <img src={FotoAviso} alt="aviso" />
                                        <p>Preencha todos <br /> os campos</p>
                                    </div>
                                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                                </div>
                            </Form>
                        </div>
                    </header>
                </div>
            )}
        </Formik>
    );
}

export default CadastroEmpresa; 