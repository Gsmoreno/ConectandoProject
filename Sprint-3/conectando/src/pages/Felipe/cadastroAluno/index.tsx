import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  FiAlertCircle, FiArrowLeft, FiEyeOff  } from 'react-icons/fi';
import Helmet from 'react-helmet';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './styles.css';
import Input from '../../../components/inputs';
import api from '../../../services/api';
import Axios from 'axios';
import Select from 'react-select';
import ImageUploading from 'react-images-uploading';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

function CadastroAluno() {
    const history = useHistory();

    function showPassword2(){
        var pass:any = document.getElementById("senha");
            if (pass.type === "password") {
                pass.type = "text";
            }
            else {
                pass.type = "password";
            }
    }
    function showPassword3(){
        var pass:any = document.getElementById("confirmarSenha");
            if (pass.type === "password") {
                pass.type = "text";
            }
            else {
                pass.type = "password";
            }
    }
    
    //#region States
        const [nome, setNome] = useState("");
        const [cpf, setCpf] = useState("");
        const [rg, setRg] = useState("");
        const [email, setEmail] = useState("");
        const [whatsapp, setWhatsapp] = useState("");
        const [deficiencia, setDeficiencia] = useState("");
        const [deficienciaDescricao, setDeficienciaDescricao] = useState("");
        const [senha, setSenha] = useState("");
        const [foto, setFoto] = useState("");
        const [fotoPerfil, setFotoPerfil] = useState([]);
        const [nivelExp, setNivelExp] = useState("");
        const [focoCarreira, setFocoCarreira] = useState("");
        const [idCurso, setIdCurso] = useState(0);
        const [semestre, setSemestre] = useState(0);
        const [linkPortifolio, setLinkPortifolio] = useState("");
        const [prefContrato, setPrefContrato] = useState("");
        const [prefPorte, setPrefPorte] = useState("");
        const [prefRemoto, setPrefRemoto] = useState("");
        const [idEnderecoNavigation, setIdEnderecoNavigation] = useState([]);
        const [uf,  setUf] = useState("");
        const [cidade, setCidade] = useState("");
        const [cep, setCep] = useState("");     
        const [rua, setRua] = useState("");     
        const [bairro, setBairro] = useState("");
        const [numero, setNumero] = useState("");
        const [options, setOptions] = useState([{},[]]);
    //#endregion

    useEffect(()=>{
        handleLoadTags();
    },[]);

    var optionsBanco: { value: any; label: any; }[] = [];

    const Montar = (e:any) => {
        optionsBanco.push({ value: e.idTags, label: e.nome});
        setOptions(optionsBanco);
    }

    function handleLoadTags(){
        api.get('/Tags', {
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            res.data.forEach((element:any) => {
                Montar(element)
            })
        }).catch(err => console.log(err))
    }

    const CadastrarTagAluno = (idAluno:any) => {
        let tagsPorNome = document.getElementsByName('tags');
        for(let index = 0; index < tagsPorNome.length; index++) {

            const tagsAluno = {idAluno: idAluno, idTags: tagsPorNome[index].attributes[2].value};

            api.post('/TagsAluno', tagsAluno, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
    }

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

    const dataAluno = {
        foto,
        idEnderecoNavigation: {
            uf,
            cidade,
            cep,
            rua,
            bairro,
            numero,
        },
    }

    const onChange = (imageList:any, addUpdateIndex:any) => {
        // data for submit
        setFotoPerfil(imageList);
        imageList.forEach((image:any) => {
            setFoto(image.data_url.split(",")[1]);
        })
    };

    return(
        <div id="page-form" className="containerCadastro">
        <Helmet>
            <style>
                {` body{
                    background-color: #F4F4F4;
                }`}
            </style>
        </Helmet>
            <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/">
                        <FiArrowLeft size={50} color="#FFF"/>
                    </Link>
                </div>

                <div className="header-content">
                    <strong>Seja bem vindo a família Senai!</strong>
                    <p>O primeiro passo é preencher esse formulário de cadastro.</p>
                </div>
            </header>

            <main>
                        <Formik
                            initialValues={
                                { 
                                    nome,
                                    cpf,
                                    rg,
                                    email,
                                    whatsapp,
                                    deficiencia,
                                    deficienciaDescricao,
                                    senha,
                                    confirmarSenha:'',
                                    nivelExp,
                                    focoCarreira,
                                    idCurso,
                                    semestre,
                                    linkPortifolio,
                                    prefContrato,
                                    prefPorte,
                                    prefRemoto,
                                    foto,
                                    idEnderecoNavigation: {
                                        uf,
                                        cidade,
                                        cep,
                                        rua,
                                        bairro,
                                        numero,
                                    },
                                }
                            }
                            validationSchema={Yup.object({
                                nome: Yup.string()
                                .max(20, 'Deve ter no máximo 20 caractéres')
                                .required('Obrigatório'),
                                cpf: Yup.string()
                                .length(11, 'CPF inválido')
                                .required('Obrigatório'),
                                rg: Yup.string()
                                .length(12, 'Tamanho inválido')
                                .required('Obrigatório'),
                                email: Yup.string()
                                .email('email inválido')
                                .required('Obrigatório'),
                                whatsapp: Yup.string()
                                .min(9, 'Whatsapp inválidp')
                                .required('Obrigatório'),
                                deficiencia: Yup.string()
                                .notRequired(),
                                deficienciaDescricao: Yup.string()
                                .notRequired(),
                                senha: Yup.string()
                                .min(3, 'Tamanho deve ser entre 3 a 8')
                                .max(8, 'Tamanho deve ser entre 3 a 8')
                                .required('Obrigatório'),
                                confirmarSenha: Yup.string()
                                .oneOf([Yup.ref("senha")], "As senhas devem ser iguais")
                                .required('Obrigatório'),
                                uf: Yup.string()
                                .length(2, 'UF inválida'),
                                cidade: Yup.string()
                                .max(30, 'Nome da cidade inválido'),
                                cep: Yup.string()
                                .length(8, 'CEP inválido')
                                .required('Obrigatório'),
                                rua: Yup.string()
                                .max(100, 'Tamanho inválido'),
                                bairro: Yup.string()
                                .notRequired(),
                                numero: Yup.string()
                                .max(6, 'Número maior que o devido')
                                .required('Obrigatório'),
                                idCurso: Yup.number()
                                .required('Obrigatório'),
                                focoCarreira: Yup.string()
                                .required('Obrigatório'),
                                semestre: Yup.number()
                                .required('Obrigatório'),
                                linkPortfolio: Yup.string()
                                .notRequired(),
                                prefContrato: Yup.string()
                                .required('Obrigatório'),
                                prefPorte: Yup.string()
                                .required('Obrigatório'),
                                prefRemoto: Yup.string()
                                .required('Obrigatório'),
                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                values.foto = dataAluno.foto
                                values.idEnderecoNavigation = dataAluno.idEnderecoNavigation
                                console.log(values);
                                if (values.senha === values.confirmarSenha) {
                                    try {
                                        await api.post('/aluno', values, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            }
                                        }).then(res => {CadastrarTagAluno(res.data.idAluno)})
                                        setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                        }, 400);
                                        history.push('/');
                                    } catch (err) {
                                        alert('Erro no cadastro, tente novamente');
                                    }
                                }
                                else{
                                    alert("Verifique se as senhas conferem!")
                                }
                            }}
                            >
                <Form>               
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input label="Nome e sobrenome" name="nome" placeholder="Digite seu nome e *1* sobrenome"/>
                        <Input label="CPF" name="cpf" placeholder="Digite o CPF sem pontos ou traços"/>
                        <Input label="RG" name="rg" placeholder="Digite o RG sem pontos ou traços"/>
                        <Input label="E-mail" name="email" placeholder="Ex. email@email.com"/>
                        <Input label="Whatsapp" name="whatsapp" placeholder="Ex. (xx) 99999-9999"/>
                        <div className="def-foto">
                            <div className="def">
                                <Input label="Possui deficiência?" name="deficiencia" as="select">
                                    <option disabled selected value="">Selecione uma opção</option>
                                    <option value="Não">Não</option>
                                    <option value="Sim">Sim</option>
                                </Input>
                                    
                                <Input label="Se sim qual?" name="deficienciaDescricao"/>
                            </div>
                            <div className="labelFoto">
                                <label>Foto</label>

                            <ImageUploading
                                multiple={false}
                                value={fotoPerfil}
                                onChange={onChange}
                                dataURLKey="data_url"
                                maxFileSize={5242880}
                                acceptType= {['jpg', 'png']}
                                resolutionType="absolute"
                            >
                                {({
                                imageList,
                                onImageUpload,
                                onImageRemove,
                                dragProps,
                                }) => (
                                // write your building UI
                                <div className="upload__image-wrapper containerFoto">
                                    <button
                                    style={imageList.length !== 0 ? { display: 'none' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className="dropFoto"
                                    >
                                    Click ou arraste aqui
                                    </button>
                                    {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" className="fotoEscolhida"/>
                                        <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageRemove(index)} className="fotoRemove">Remover</button>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                )}
                        </ImageUploading>
                            </div>
                        </div>
                        <div className="senha">
                            <Input label="Senha" type="password" name="senha" placeholder="min-3 caracteres"/>
                            <span onClick={showPassword2} className="showPassword2"><FiEyeOff size={24}/></span>
                            <Input label="Confirmar senha" type="password" name="confirmarSenha" placeholder="Preencha com valor igual a senha"/>
                            <span onClick={showPassword3} className="showPassword2"><FiEyeOff size={24}/></span>
                        </div>
                        
                    </fieldset>

                    <fieldset>
                        <legend>Seu endereço</legend>
                        <Input label="CEP" name="cep" placeholder="Digite o CEP sem pontos ou traços" onBlur={(e) => GetCep(e.target.value)}/>
                        <div className="estadoCidade">
                            <Input label="Estado" name="uf" placeholder="Ex. (UF)" value={uf} onBlur={(e) => setUf(e.target.value)}/>
                            <Input label="Cidade" name="cidade" placeholder="Ex. São Senai do sul" value={cidade} onBlur={(e) => setCidade(e.target.value)}/>
                        </div>
                        <Input label="Bairro" name="bairro" placeholder="Ex. Vila Senai" value={bairro} onBlur={(e) => setBairro(e.target.value)}/>
                        <div className="ruaNumero">
                            <Input label="Rua" name="rua" placeholder="Ex. Av. Senaizinho" value={rua} onBlur={(e) => setRua(e.target.value)}/>
                            <Input label="Número" name="numero" placeholder="Ex. 9999" onBlur={(e) => setNumero(e.target.value)}/>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Sua carreira</legend>
                        <Input label="Curso" name="idCurso" as="select">
                            <option disabled selected value="0">Selecione uma opção</option>
                            <option value="1">Desenvolvimento de sistemas</option>
                            <option value="2">Redes de computadores</option>
                            <option value="3">Multimídia</option>
                        </Input>
                        
                        <Input label="Foco na área" name="focoCarreira" placeholder="Ex. Fullstack"/>
                        <Input label="Nível de experiência" name="nivelExp" placeholder="Júnior-Pleno-Sênior"/>
                        <Input label="Semestre" name="semestre" as="select">
                            <option disabled selected value="0">Selecione uma opção</option>
                            <option value="1">1º semestre</option>
                            <option value="2">2º semestre</option>
                            <option value="3">3º semestre</option>
                        </Input>
                        <Input label="Seu portfófilo" name="linkPortifolio" placeholder="Ex. github.com"/>
                        <div className="style-input-select style-input">
                        <label htmlFor="tags">Selecione suas melhores skills</label>
                        <Select 
                            className="basic-single"
                            clasNamePrefix="select"
                            name="tags"
                            isMulti
                            options={options}
                            id="tags"
                        />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Sua preferência em busca de vagas</legend>
                        
                        <Input label="Tipo de contrato" name="prefContrato" as="select">
                            <option disabled selected value="">Selecione uma opção</option>
                            <option value="Estágio">Estágio</option>
                            <option value="CLT">CLT</option>
                            <option value="Freelancer">Freelancer</option>
                        </Input>
                        
                        <Input label="Tamanho da empresa" name="prefPorte" as="select">
                            <option disabled selected value="">Selecione uma opção</option>
                            <option value="Pequena">Pequena</option>
                            <option value="Média">Média</option>
                            <option value="Grande">Grande</option>
                        </Input>

                        <Input label="Aceita trabalho remoto?" name="prefRemoto" as="select">
                            <option disabled selected value="">Selecione uma opção</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </Input>
                    </fieldset>

                    <footer>
                        <p>
                            <FiAlertCircle size={24} color="#FF0000"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </Form>
                </Formik>
            </main>
        </div>
    )
}

export default CadastroAluno;