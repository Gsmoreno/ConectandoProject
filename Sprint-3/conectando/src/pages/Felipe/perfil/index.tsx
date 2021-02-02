import React, {FormEvent, useEffect, useState } from 'react'
import { FiAlertCircle, FiArrowLeft, FiEyeOff } from 'react-icons/fi';
import Footer from '../../../components/footer';
import HeaderAluno from '../../../components/headerAluno';
import Input from '../../../components/inputs';
import perfilImg from '../../../assets/images/perfil.svg';

import './styles.css';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import ImageUploading from 'react-images-uploading';

export interface Token {
    aud: string,
    email: string,
    exp: number,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
    iss: string,
    jti: string,
}


function PerfilAluno(){

    const auth = `Bearer ${localStorage.getItem('conectando-key-auth')}`;
    var id= "";
    var arr:any = [];

        //#region states
        const [idAluno, setIdAluno] = useState(0);
        const [nome, setNome] = useState("");
        const [cpf, setCpf] = useState("");
        const [rg, setRg] = useState("");
        const [email, setEmail] = useState("");
        const [whatsapp, setWhatsapp] = useState("");
        const [deficiencia, setDeficiencia] = useState("");
        const [deficienciaDescricao, setDeficienciaDescricao] = useState("");
        const [senhaAntiga, setSenhaAntiga] = useState("");
        const [senha, setSenha] = useState("");
        const [nivelExp, setNivelExp] = useState("");
        const [foto, setFoto] = useState("");
        const [fotoPerfil, setFotoPerfil] = useState([]);
        const [focoCarreira, setFocoCarreira] = useState("");
        const [idCursoNavigation, setIdCursoNavigation] = useState(0);
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
        const [tagsAluno, setTagsAluno] = useState([]);
        const [numTags, setNumTags] = useState([]);
        const [options, setOptions] = useState([{},[]]);
        const [optionsAluno, setOptionsAluno] = useState([{},[]]);
        //#endregion

        useEffect(() => {
            handleLoad();
            handleLoadTags();
        }, []);

        function handleDecode (){
            try {
                const authDec:any = jwt_decode(auth);
                id = authDec.jti;
                return id;
            } catch (error) {
                console.log("Erro no decode")
            }
        }

        function showPassword(){
            var pass:any = document.getElementById("senhaAntiga");
                if (pass.type === "password") {
                    pass.type = "text";
                }
                else {
                    pass.type = "password";
                }
        }
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

        async function handleLoad() {
            await api.get(`/aluno/${handleDecode()}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    authorization: auth
                }
            }).then(response => {
                console.log(response.data)
                setIdAluno(response.data.idUsuario)
                setNome(response.data.nome)
                setEmail(response.data.email)
                setSenhaAntiga(response.data.senha)
                setRg(response.data.rg)
                setCpf(response.data.cpf)
                setFoto(response.data.foto)
                setWhatsapp(response.data.whatsapp)
                setDeficiencia(response.data.deficiencia)
                setDeficienciaDescricao(response.data.deficienciaDescricao)
                setNivelExp(response.data.nivelExp)
                setFocoCarreira(response.data.focoCarreira)
                setIdCursoNavigation(response.data.idCursoNavigation)
                setSemestre(response.data.semestre)
                setLinkPortifolio(response.data.linkPortifolio)
                setPrefRemoto(response.data.prefRemoto)
                setPrefContrato(response.data.prefContrato)
                setPrefPorte(response.data.prefPorte)
                setTagsAluno(response.data.tagsAluno);
                response.data.tagsAluno.forEach((e:any) => {
                    arr.push(e.idTags)
                })
                setNumTags(arr)
                setIdEnderecoNavigation(response.data.idEnderecoNavigation)
                setUf(response.data.idEnderecoNavigation.uf)
                setCidade(response.data.idEnderecoNavigation.cidade)
                setCep(response.data.idEnderecoNavigation.cep)
                setRua(response.data.idEnderecoNavigation.rua)
                setBairro(response.data.idEnderecoNavigation.bairro)
                setNumero(response.data.idEnderecoNavigation.numero)
            }).catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });;
        }

        //#region TAGS

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

        //#endregion

        async function handleUpdate(value:any) {  
            
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

        const handleChange = (e:any) => {
            setOptionsAluno(Array.isArray(e) ? e.map(x => x.value) : []);
        }

    return(
        <div id="page-profile-form">
            <HeaderAluno/>
                <div className="topo">
                    <Link to="/">
                        <FiArrowLeft size={40} color="#4E4E4E"/>
                    </Link>
                    <div className="editarFoto" id="editarFoto">
                    <img src={`data:image/jpeg;base64,${foto}`} alt="Foto de perfil"/>
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
                                    <span
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className="dropFoto"
                                    >
                                    Editar foto
                                    </span>
                                </div>
                                )}
                        </ImageUploading>
                        
                    </div>
                    <div>{""}</div>
                </div>
                <main>
                <Formik
                            enableReinitialize
                            initialValues={
                                { 
                                    nome,
                                    cpf,
                                    rg,
                                    email,
                                    whatsapp,
                                    deficiencia,
                                    deficienciaDescricao,
                                    senhaAntiga:'',
                                    senha,
                                    confirmarSenha:'',
                                    nivelExp,
                                    focoCarreira,
                                    idCursoNavigation,
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
                                // nome: Yup.string()
                                // .max(25, 'Deve ter no máximo 25 caractéres')
                                // .required('Obrigatório'),
                                // cpf: Yup.string()
                                // .length(11, 'CPF inválido')
                                // .required('Obrigatório'),
                                // rg: Yup.string()
                                // .length(12, 'Tamanho inválido')
                                // .required('Obrigatório'),
                                // email: Yup.string()
                                // .email('email inválido')
                                // .required('Obrigatório'),
                                // whatsapp: Yup.string()
                                // .min(9, 'Whatsapp inválido')
                                // .required('Obrigatório'),
                                // deficiencia: Yup.string()
                                // .notRequired(),
                                // deficienciaDescricao: Yup.string()
                                // .notRequired(),
                                // senhaAntiga: Yup.string()
                                // .optional(),
                                senha: Yup.string()
                                .min(3, 'Tamanho deve ser entre 3 a 8')
                                .max(8, 'Tamanho deve ser entre 3 a 8')
                                .required('Obrigatório'),
                                confirmarSenha: Yup.string()
                                .required('Obrigatório')
                                .oneOf([Yup.ref("senha")], "As senhas devem ser iguais"),
                                // uf: Yup.string()
                                // .max(4, 'UF inválida'),
                                // cidade: Yup.string()
                                // .max(30, 'Nome da cidade inválido'),
                                // cep: Yup.string()
                                // .length(8, 'CEP inválido')
                                // .required('Obrigatório'),
                                // rua: Yup.string()
                                // .max(100, 'Tamanho inválido'),
                                // bairro: Yup.string()
                                // .notRequired(),
                                // numero: Yup.string()
                                // .max(6, 'Número maior que o devido')
                                // .required('Obrigatório'),
                                // idCurso: Yup.number()
                                // .required('Obrigatório'),
                                // focoCarreira: Yup.string()
                                // .required('Obrigatório'),
                                // semestre: Yup.number()
                                // .positive('Semestre deve ser positivo')
                                // .required('Obrigatório'),
                                // linkPortifolio: Yup.string()
                                // .nullable()
                                // .notRequired(),
                                // prefContrato: Yup.string()
                                // .required('Obrigatório'),
                                // prefPorte: Yup.string()
                                // .required('Obrigatório'),
                                // prefRemoto: Yup.string()
                                // .required('Obrigatório'),
                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                values.foto = dataAluno.foto
                                values.idEnderecoNavigation = dataAluno.idEnderecoNavigation
                                console.log(values);
                                if (values.senhaAntiga === senhaAntiga) {
                                    try {
                                        await api.put(`/Aluno/${handleDecode()}`, values, {
                                            headers: {
                                                'Accept': 'application/json, text/plain, */*',
                                                'Content-Type': 'application/json',
                                                authorization: auth
                                            }
                                        });
                                        setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                        }, 400);
                                        handleLoad();
                                    } catch (err) {
                                        alert('Erro ao atualizar, tente novamente');
                                    }
                                }
                                else{
                                    alert("Sua senha antiga não confere!")
                                }
                            }}
                            >
                    <Form>
                        <fieldset>
                            <legend>Seus dados</legend>
                            <div>
                                <Input placeholder="Digite seu nome e *1* sobrenome" label="Nome" name="nome" onChange={(e) => setNome(e.target.value)}/>
                                <Input placeholder="Digite o CPF sem pontos ou traços" label="CPF" name="cpf" onChange={(e) => setCpf(e.target.value)}/>
                                <Input placeholder="Digite o RG sem pontos ou traços" label="RG" name="rg" onChange={(e) => setRg(e.target.value)}/>
                                <Input placeholder="Ex. (xx) 99999-9999" label="Whatsapp" name="whatsapp" onChange={(e) => setWhatsapp(e.target.value)}/>
                                <Input placeholder="Ex. email@email.com" label="E-mail" name="email" onChange={(e) => setEmail(e.target.value)}/>
                                <Input label="Senha antiga" name="senhaAntiga" placeholder="Digite sua senha antiga para alterar!" type="password"/>
                                <span onClick={showPassword} className="showPassword">Mostrar senha</span>
                                <div className="senha">
                                    <Input placeholder="min-3 caracteres" type="password" label="Nova senha" name="senha" onBlur={(e) => setSenha(e.target.value)}/>
                                    <span onClick={showPassword2} className="showPassword2"><FiEyeOff size={24}/></span>
                                    <Input placeholder="Preencha com valor igual a senha" type="password" label="Confirmar senha" name="confirmarSenha"/>
                                    <span onClick={showPassword3} className="showPassword2"><FiEyeOff size={24}/></span>
                                </div>
                            </div>
                            <div>
                                <div className="def">
                                    <Input label="Possui deficiência?" name="deficiencia" as="select" onBlur={(e) => setDeficiencia(e.target.value)}>
                                        <option disabled selected value="">Selecione uma opção</option>
                                        <option value="Não">Não</option>
                                        <option value="Sim">Sim</option>
                                    </Input>
                                    <Input label="Se sim qual?" name="deficienciaDescricao" value={deficienciaDescricao} onChange={(e) => setDeficienciaDescricao(e.target.value)}/>
                                </div>
                                <Input placeholder="Digite o CEP sem pontos ou traços" label="CEP" name="cep" value={cep} onChange={(e) => GetCep(e.target.value)}/>
                                <div className="estadoCidade">
                                    <Input placeholder="Ex. (UF)" label="Estado" name="uf" value={uf} onChange={(e) => setUf(e.target.value)}/>
                                    <Input placeholder="Ex. São Senai do sul" label="Cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
                                </div>
                                <Input placeholder="Ex. Vila Senai" label="Bairro" name="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
                                <div className="ruaNumero">
                                    <Input placeholder="Ex. Av. Senaizinho" label="Rua" name="rua" value={rua} onChange={(e) => setRua(e.target.value)}/>
                                    <Input placeholder="Ex. 9999" label="Número" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)}/>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Sua carreira</legend>
                            <div>
                            <Input label="Curso" name="idCurso" as="select" value={idCursoNavigation} onBlur={(e) => setIdCursoNavigation(parseInt(e.target.value))}>
                                    <option disabled selected value="0">Selecione uma opção</option>
                                    <option value="1">Desenvolvimento de sistemas</option>
                                    <option value="2">Redes de computadores</option>
                                    <option value="3">Multimídia</option>
                                </Input>
                                
                                <Input placeholder="Ex. Fullstack" label="Foco na área" name="focoCarreira"  onBlur={(e) => setFocoCarreira(e.target.value)}/>
                                <Input placeholder="Júnior-Pleno-Sênior" label="Nível de experiência" name="nivelExp" onBlur={(e) => setNivelExp(e.target.value)}/>
                                <Input label="Semestre" name="semestre" as="select" onBlur={(e) => setSemestre(parseInt(e.target.value))}>
                                    <option disabled selected value="0">Selecione uma opção</option>
                                    <option value="1">1º semestre</option>
                                    <option value="2">2º semestre</option>
                                    <option value="3">3º semestre</option>
                                </Input>
                                <Input placeholder="Ex. github.com" label="Seu portfófilo" name="linkPortifolio" onBlur={(e) => setLinkPortifolio(e.target.value)}/>
                                <div className="style-input-select style-input">
                                    <label htmlFor="tags">Selecione suas melhores skills</label>
                                    <Select 
                                        options={options}
                                        className="basic-multi-select"
                                        clasNamePrefix="select"
                                        name="tags"
                                        isMulti
                                        onChange={handleChange}
                                        value={options.filter(
                                            function(this:any, e:any) {
                                                return this.indexOf(e.value) >= 0;
                                            },
                                            numTags
                                        )}
                                        id="tags"
                                    />
                                </div>
                            </div>
                            <div className="buscaAlerta">
                                <div>
                                <Input label="Tipo de contrato mais buscado" name="prefContrato" as="select" onBlur={(e) => setPrefContrato(e.target.value)}>
                                    <option disabled selected value="">Selecione uma opção</option>
                                    <option value="Estágio">Estágio</option>
                                    <option value="CLT">CLT</option>
                                    <option value="Freelancer">Freelancer</option>
                                </Input>
                        
                                <Input label="Tamanho da empresa de preferência" name="prefPorte" as="select" onBlur={(e) => setPrefPorte(e.target.value)}>
                                    <option disabled selected value="">Selecione uma opção</option>
                                    <option value="Pequena">Pequena</option>
                                    <option value="Média">Média</option>
                                    <option value="Grande">Grande</option>
                                </Input>

                                <Input label="Aceita trabalho remoto também?" name="prefRemoto" as="select" onBlur={(e) => setPrefRemoto(e.target.value)}>
                                    <option disabled selected value="">Selecione uma opção</option>
                                    <option value="Não">Não</option>
                                    <option value="Sim">Sim</option>
                                </Input>
                                </div>
                                <span><FiAlertCircle size={24} color="#FF0000"/>Dados em branco ou iguais não serão alterados.</span>
                            </div>
                        </fieldset>
                        <div className="botao2">
                            <button type="submit">
                                Salvar perfil
                            </button>
                        </div>
                    </Form>
                    </Formik>
                </main>
            <Footer />
        </div>
    )
}

export default PerfilAluno;