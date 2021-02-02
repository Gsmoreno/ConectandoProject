import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import ImgMicrosoft from '../../../assets/images/microsoft.png';

import { motion } from 'framer-motion';

import Footer from '../../../components/footer';
import HeaderEmpresa from '../../../components/headerEmpresa';
import Input from '../../../components/inputs/index';

import { Link } from 'react-router-dom';


import '../../../global.css';
import './style.css';
import { Formik } from 'formik';
import api from '../../../services/api';
import jwt_decode from 'jwt-decode';


function PerfilEmpresa() {
    const auth = `Bearer ${localStorage.getItem('conectando-key-auth')}`;

    
            const pageTransition = {
                duration: 1
            }
    
            const pageVariante = {
                in: {
                    opacity: 1,
                    x: 0
                },
                out: {
                    opacity: 0,
                    x: "180vw"
                }
            }
    

    function handleDecode() {
        var id = "";

        try {
            const authDec: any = jwt_decode(auth);
            id = authDec.jti;
            return id;
        } catch (error) {
            console.log("Erro no decode")
        }
    }

    const [idUsuario, setIdUsuario] = useState(0);
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnea, setCnea] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [Cep, setCep] = useState('');
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    useEffect(() => {
        OnBlurData();
    }, []);


    const OnBlurData = () => {
        api.get(`/empresa/${handleDecode()}`, {
            headers: { authorization: auth }
        })
            .then((response) => {
                setIdUsuario(response.data.idEmpresa);
                setNomeFantasia(response.data.nomeFantasia);
                setRazaoSocial(response.data.razaoSocial);
                setCnea(response.data.cnae);
                setCnpj(response.data.cnpj);
                setEmail(response.data.email);
                setSenha(response.data.senha);
                setWhatsapp(response.data.whatsapp);
                setCep(response.data.idEnderecoNavigation.cep);
                setRua(response.data.idEnderecoNavigation.rua);
                setBairro(response.data.idEnderecoNavigation.bairro);
                setNumero(response.data.idEnderecoNavigation.numero);
                setCidade(response.data.idEnderecoNavigation.cidade);
                setUf(response.data.idEnderecoNavigation.uf);
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

    return (
        <Formik
            initialValues={{
                nomeFantasia: '',
                cnea: '',
                cnpj: '',
                email: '',
                senha: '',
                whatsapp: '',
                razaoSocial: '',
                idEnderecoNavigation: {
                    cep: '',
                    rua: '',
                    bairro: '',
                    uf: ''
                }
            }}
            onSubmit={async (data) => {
                await api.put(`empresa/${handleDecode}`, data,
                    { headers: { authorization: auth } })
                    .then((response) => {
                        console.log(response);
                        OnBlurData();
                    })
                    .catch(err => console.log(err));
            }}>
            <>

                <HeaderEmpresa />
                <div className="mid" >
                    <div className="topp" >

                        <div className="arrowdois">
                            <Link to="/TelaPrincipalEmpresa"><FaArrowLeft color="black" size={24}/></Link>
                        </div>

                        <div id="head">
                            <Link to="/PerfilEmpresa"><h1>Seu perfil</h1></Link>
                            <Link to="/vagasempresa"><h1>Suas Vagas</h1></Link>
                        </div>
                        <div id="linhanav"></div>
                    </div>

                    <div className="juntar">
                        <div className="image">
                            <img src={ImgMicrosoft} alt="imagem da empresa" id="imagemEmpresa" />
                            <h3>Editar foto</h3>
                            <div className="baixo">
                            </div>
                        </div>
                    </div>


                    <div className="tabeladois">
                    <motion.div exit="out" animate="in" initial="out" variants={pageVariante} transition={pageTransition}>
                        <div className="dentroTabela">

                            <h1>Seus dados</h1>
                            <div id="linha"></div>
                            <Input label="Nome fantasia" name="nomeFantasia" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
                            <Input label="CNAE" name="cnae" value={cnea} onChange={(e) => setCnea(e.target.value)} />
                            <Input label="CNPJ" name="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                            <Input label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input label="Whatsapp" name="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                            <Input label="Razão social" name="razaoSocial" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
                            <Input label="Senha" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

                            <h1>Seu endereço</h1>
                            <div id="linha"></div>
                            <Input label="CEP" name="idEnderecoNavigation.cep" value={Cep} onChange={(e) => setCep(e.target.value)} />
                            <Input label="Bairro" name="idEnderecoNavigation.bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                            <Input label="Rua" name="idEnderecoNavigation.rua" value={rua} onChange={(e) => setRua(e.target.value)} />
                            <Input label="Número" name="idEnderecoNavigation.numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            <Input label="Cidade" name="idEnderecoNavigation.cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                            <Input label="UF" name="idEnderecoNavigation.uf" value={uf} onChange={(e) => setUf(e.target.value)} />

                        </div>
                    </motion.div>
                    </div>

                    <div className="bottomm">
                        <div id="together">
                            <FiAlertCircle size={30} color="#3ABDE6" />
                            <h3>Dados em branco ou iguais não serão alterados.</h3>
                        </div>

                        <button value="Confirmar" type="submit" style={{ width: 20 }} />
                    </div>
                </div>

                <Footer />
            </>
        </Formik>
    );
}


export default PerfilEmpresa; 