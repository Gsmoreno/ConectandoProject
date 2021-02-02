import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useHistory } from 'react-router-dom'

import Input from '../../../components/inputs/index';

import './style.css';

import Axios from 'axios';
import { convertCompilerOptionsFromJson } from 'typescript';

function CadastrarVagas() {

    const novaVaga = {
        nome: '',
        area: '',
        requisitos: '',
        detalhes: '',
        beneficios: '',
        salario: '',
        tipoContrato: '',
        nivelExp: '',
        prazo: '',
        limiteAlunos: '',
        remoto: '',
        horario: '',
        idEmpresa: '',
        idEnderecoNavigation : {
            uf: '',
            cidade: '',
            cep: '',
            bairro: '',
            rua: '',
            numero: '',
            complemento: ''
        }
    }

    const history = useHistory();
    

    const [idEnderecoNavigation, setIdEnderecoNavigation] = useState([]);
    const [uf, setUf] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [options, setOptions] = useState([{}, []]);

    const GetCep = (valor: string) => {
        Axios.get(`https://viacep.com.br/ws/${valor}/json/`)
            .then(res => {
                var teste = res.data.cep;
                var cep = teste.replace("-", "")

                setCep(cep);
                setRua(res.data.logradouro);
                setBairro(res.data.bairro);
                setCidade(res.data.localidade)
                setUf(res.data.uf)
            })
            .catch(erro => console.error(erro))
    }

    const api = Axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem("conectando-key-auth")
        }
    })

    useEffect(() => {
        BuscarTags();
    }, [])

    var optionsBanco: { value: any; label: any; }[] = []


    //Formata um array para ser usado pelo react-select
    const Montar = (e: any) => {
        e.forEach((element: { idTags: any; nome: any; }) => {
            optionsBanco.push({ value: element.idTags, label: element.nome });
        });
    }

    //Cadastrar TagVaga
    const CadastrarTagVaga = (idVaga: any) => {
        let tagsPorName = document.getElementsByName('tags');
        for (let index = 0; index < tagsPorName.length; index++) {
            console.log(tagsPorName[index])
            const tagsVaga = { idVaga: idVaga, idTags: tagsPorName[index].attributes[2].value }
            console.log(tagsVaga)


            api.post("/TagsVaga", JSON.stringify(tagsVaga))

        }
    }


    //Busca todas as tags
    const BuscarTags = () => {

        api.get("/Tags")
            .then(dados => {
                Montar(dados.data)
            })
            .catch(erro => console.error(erro));
    }


    //Cadastra as Vagas
    const CadastrarVagas = (values: any) => {
        let vagaCadastrar = novaVaga
        console.log(vagaCadastrar)
        api.post("/Vaga/VagaI", vagaCadastrar)
            .then(dados => {
                console.log(dados.data)
                CadastrarTagVaga(dados.data)
            })
            .catch(erro => console.error(erro));

    }




    return (
        <div className="cadastroVagas">
            <div className="headerCadastro">
                <FiArrowLeft className="iconVoltar" />

                <div className="textHeaderCadastro">
                    <h1>Cadaste sua Vaga!</h1>
                    <p>O primeiro passo é preencher esse formulário de cadastro.</p>
                </div>

            </div>

            <div className="formularioCadastro">
                <h2>Seus dados</h2>

                <div className="divisao"></div>

                <Formik
                    initialValues={
                        {
                            nome: '',
                            area: '',
                            requisitos: '',
                            detalhes: '',
                            beneficios: '',
                            salario: '',
                            tipoContrato: '',
                            nivelExp: '',
                            prazo: '',
                            limiteAlunos: '',
                            remoto: '',
                            horario: '',
                            idEmpresa: '',
                            uf: '',
                            cidade: '',
                            cep: '',
                            bairro: '',
                            rua: '',
                            numero: '',
                            complemento: ''

                        }}
                    validationSchema={Yup.object({
                        nome: Yup.string().required('Required'),
                        area: Yup.string().required('Required'),
                        requisitos: Yup.string().required('Required').max(255, 'Deve ter no máximo 255 caractéres'),
                        detalhes: Yup.string().required('Required').max(255, 'Deve ter no máximo 255 caractéres'),
                        beneficios: Yup.string().required('Required'),
                        salario: Yup.number().required('Required'),
                        tipoContrato: Yup.string().required('Required'),
                        nivelExp: Yup.string().required('Required'),
                        prazo: Yup.date().required('Required'),
                        limiteAlunos: Yup.number().notRequired(),
                        remoto: Yup.string().required('Required'),
                        horario: Yup.string().required('Required'),
                        idEmpresa: Yup.number(),
                        uf: Yup.string().required('Required'),
                        cidade: Yup.string().required('Required'),
                        cep: Yup.string().required('Required'),
                        bairro: Yup.string().required('Required'),
                        rua: Yup.string().required('Required'),
                        numero: Yup.string().required('Required'),
                        complemento: Yup.string().required('Required'),

                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        novaVaga.nome = values.nome
                        novaVaga.area = values.area
                        novaVaga.requisitos = values.requisitos
                        novaVaga.detalhes = values.detalhes
                        novaVaga.beneficios = values.beneficios
                        novaVaga.salario = values.salario
                        novaVaga.tipoContrato = values.tipoContrato
                        novaVaga.nivelExp = values.nivelExp
                        novaVaga.prazo = values.prazo
                        novaVaga.limiteAlunos = values.limiteAlunos
                        novaVaga.horario = values.horario
                        novaVaga.idEnderecoNavigation.cep = values.cep
                        novaVaga.idEnderecoNavigation.uf = values.uf
                        novaVaga.idEnderecoNavigation.cidade = values.cidade
                        novaVaga.idEnderecoNavigation.complemento = values.complemento
                        novaVaga.idEnderecoNavigation.numero = values.numero
                        novaVaga.idEnderecoNavigation.rua = values.rua
                        novaVaga.idEnderecoNavigation.bairro = values.bairro
                        const token = localStorage.getItem('token-conectando');
                        if (token !== null) {
                            values.idEmpresa = JSON.parse(window.atob(token.split('.')[1])).jti
                        }
                        CadastrarVagas(values);
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form>
                        <Input name="nome" label="Nome da Vaga" className="input1" />

                        <Input name="area" label="Área da Vaga" className="input1" />

                        <Input label="Requisitos" as="textarea" name="requisitos" id="requisitos" className="input1" />

                        <Input label="Detalhes Vaga" as="textarea" name="detalhes" id="detalhes" className="input1" />

                        <Input name="beneficios" label="Beneficios" className="input1" />

                        <Input type="number" min="0" name="salario" label="Salário" className="input1" />

                        <div className="form-divs">
                            <Input name="tipoContrato" label="Tipo de Contrato" className="input1" />
                            <Input name="nivelExp" label="Nível da Vaga" className="input1" />
                        </div>

                        <div className="form-divs">
                            <Input name="prazo" type="date" label="Prazo inscrições" className="input1" />
                            <Input type="number" min="0" name="limiteAlunos" label="Limite inscrições" className="input1" />
                        </div>

                        <div className="form-divs">
                            <div className="style-input">
                                <label htmlFor="remoto">Trabalhar remoto?</label><br />
                                <Field as="select" name="remoto" id="remoto" className="input1 input1-select">
                                    <option value="">Selecione uma opção</option>
                                    <option value="sim">Sim</option>
                                    <option value="nao">Não</option>
                                </Field>
                                <div className="error-message">
                                    <ErrorMessage name="remoto" />
                                </div>
                            </div>

                            <Input name="horario" label="Horário" className="input1" />
                        </div>

                        <div className="style-input">
                            <label htmlFor="tags">Tags</label><br />
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                name="tags"
                                isMulti
                                options={optionsBanco}
                                id="tags"
                            />
                            <div className="error-message">
                                <ErrorMessage name="tags" />
                            </div>
                        </div>

                        <Input name="cep" type="number" label="CEP" className="input1"  onBlur={(e) => GetCep(e.target.value)}/>

                        <div className="form-divs">
                            <Input name="uf" label="UF" className="input1" value={uf} onBlur={(e) => setUf(e.target.value)}/>
                            <Input name="cidade" label="Cidade" className="input1"  value={cidade} onBlur={(e) => setCidade(e.target.value)} />
                        </div>

                        <Input name="bairro" label="Bairro" className="input1" value={bairro} onBlur={(e) => setBairro(e.target.value)}/>
                        <Input name="rua" label="Rua" className="input1" value={rua} onBlur={(e) => setRua(e.target.value)}/>

                        <div className="form-divs">
                            <Input name="numero" type="number" label="Número" className="input1" onBlur={(e) => setNumero(e.target.value)} />
                            <Input name="complemento" label="Complemento" className="input1" />
                        </div>

                        <div className="div-Enviar">
                            <div className="alerta">
                                <FiAlertCircle className="alertaCirculo" />
                                <p>Preencha todos os campos</p>
                            </div>

                            <button type='submit' className="buttonEnviar">Cadastrar</button>
                        </div>
                    </Form>
                </Formik>


            </div>

        </div>
    );
}

export default CadastrarVagas;