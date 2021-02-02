import React, { useEffect, useState } from 'react';

import Footer from '../../../components/footer';
import HeaderAluno from '../../../components/headerAluno';
import { FiArrowLeft, FiBarChart2, FiBriefcase, FiClipboard, FiClock, FiDollarSign, FiHome, FiList, FiMap, FiPlusCircle, FiTag, FiTerminal, FiTrendingUp } from 'react-icons/fi';
import empresaImg from '../../../assets/images/empresa126.svg';


import './styles.css';
import api from '../../../services/api';
import jwt_decode from "jwt-decode";
import { Link, useHistory } from 'react-router-dom';
import { forEachTrailingCommentRange } from 'typescript';
import { parse } from 'url';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';





function DetalhesVaga() {
    const history = useHistory();

    const idVagaLocal = localStorage.getItem('idVaga')

    const auth = `Bearer ${localStorage.getItem('conectando-key-auth')}`;

    let decoded: any = jwt_decode(auth);

    console.log(decoded);



    const [desabilitar, setDesabilitar] = useState(false);
    const [idVaga, setIdVaga] = useState(' ');
    const [nome, setNome] = useState('');
    const [nivelExp, setNivelExp] = useState('');
    const [tipoContrato, setTipoContrato] = useState('');
    const [remoto, setRemoto] = useState('');
    const [area, setArea] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [horario, setHorario] = useState('');
    const [salario, setSalario] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [bonus, setBonus] = useState('');
    const [nomeFantasia, setNomeE] = useState('');
    const [porteEmpresa, setPorte] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [foto, setFoto] = useState('');


    var id = "";

    function handleDecode() {
        try {
            const authDec: any = jwt_decode(auth);
            id = authDec.jti;
            return id;
        } catch (error) {
            console.log("Erro no decode")
        }
    }


    useEffect(() => {
        load()
    }, [])


    

    function load() {
        console.log(idVagaLocal);
        api.get(`/vaga/DetVaga/${idVagaLocal}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: auth
            }
        })
            .then(function (response) {
                BuscarTags(response.data.tagsVaga);
                console.log(response.data);
                setNome(response.data.nome);
                setNivelExp(response.data.nivelExp);
                setTipoContrato(response.data.tipoContrato);
                setRemoto(response.data.remoto);
                setArea(response.data.area);
                setDetalhes(response.data.detalhes);
                setHorario(response.data.horario);
                setSalario(response.data.salario);
                setRequisitos(response.data.requisitos);
                setBonus(response.data.bonus);
                setNomeE(response.data.idEmpresaNavigation.nomeFantasia);
                setPorte(response.data.idEmpresaNavigation.porteEmpresa);
                setCidade(response.data.idEnderecoNavigation.cidade);
                setUf(response.data.idEnderecoNavigation.uf);
                setIdVaga(response.data.idVaga);
                setFoto(response.data.foto);
                document.getElementById(`${idVaga}`)
                response.data.inscricao.forEach((e: any) => {
                    console.log(e.idAluno);
                    console.log(decoded);
                    if (e.idAluno === parseInt(decoded.jti)) {
                        console.log("ALou");
                        setDesabilitar(true);
                    } else {
                        console.log("=hey");
                        setDesabilitar(false);
                    }
                })
            })
            .catch(function (error) {

                console.log(error);
            });
    }



    function handleGoBack() {
        history.goBack();
    }



    const [Data, setData] = useState(Date.now);

    const postInscricao = () => {

        const data = {
            idVaga,
            IdAluno: decoded.jti,
            Data: Data
        };


        api.post('/Inscricao', data,)
            .then(function (res) {
                alert("Boa Sorte!")
                history.push("/vagasAluno");
                console.log(res);
            })
            .catch(error => console.log(error));
    }

    const BuscarTags = (tags: any) => {
        let tagsVaga: any = []
        let pTags: string = ''
        for (let index = 0; index < tags.length; index++) {
            api.get('/Tags/' + tags[index].idTags)
                .then(response => {
                    tagsVaga.push(response.data.nome)
                    pTags = pTags + `<p>${response.data.nome}</p>`;
                    let div = document.getElementById('divTags')
                    if (div !== null) div.innerHTML = pTags;
                })
        }


    }

    return (
        <>
            <HeaderAluno />

            <div className="containerVaga">
                <div className="top">
                    <Link to="/listaVaga">
                        <FiArrowLeft size={80} color="#4E4E4E" onClick={handleGoBack} />
                    </Link>
                    <img src={`data:image/jpeg;base64,${foto}`} alt="foto da empresa" />
                </div>
                <div className="containerCinza">
                    <div className="header espaco">
                        <div className="empresa espaco">
                            <h2>{nome}</h2>
                        </div>
                        <span>
                            <FiTag size={24} color="#4E4E4E" />
                            {area}
                        </span>
                    </div>
                    <div className="infos espaco">
                        <ul>
                            <div>
                                <li><FiBriefcase size={24} color="#4E4E4E" /> Nome empresa: {nomeFantasia}</li>
                                <li><FiBarChart2 size={24} color="#4E4E4E" /> Porte empresa: {porteEmpresa} </li>
                                <li><FiMap size={24} color="#4E4E4E" /> {cidade} - {uf} </li>
                            </div>
                            <br />
                            <div>
                                <li><FiTrendingUp size={24} color="#4E4E4E" /> Nível de exp: {nivelExp} </li>
                                <li><FiClipboard size={24} color="#4E4E4E" /> Tipo de contrato: {tipoContrato} </li>
                                <li><FiHome size={24} color="#4E4E4E" /> Remoto: {remoto} </li>
                            </div>
                        </ul>
                    </div>
                </div>

                <div className="main">
                    <div className="detalhesdois">
                        <span>
                            <FiTerminal size={24} color="#4E4E4E" />
                            <h2>
                                Detalhes
                            </h2>
                        </span>
                        <p className="align espacoTitulos">
                            {detalhes}
                        </p>
                    </div>
                    <div className="meio2">
                        <div className="requisitos">
                            <span>
                                <FiList size={24} color="#4E4E4E" />
                                <h2>
                                    Requisitos
                                </h2>
                            </span>
                            <ul className="align espacoTitulos">
                                <li>{requisitos}</li>
                            </ul>
                        </div>
                        <div className="complementos">
                            <span>
                                <FiClock size={24} color="#4E4E4E" />
                                <h3>
                                    Horário: <p>{horario}</p>
                                </h3>
                            </span>
                            <span>
                                <FiDollarSign size={24} color="#4E4E4E" />
                                <h3>
                                    Salário: <p>{salario}</p>
                                </h3>
                            </span>
                        </div>
                    </div>
                    <div className="bonus">
                        <span>
                            <FiPlusCircle size={24} color="#4E4E4E" />
                            <h2>
                                Bônus
                            </h2>
                        </span>
                        <p className="align espacoTitulos">{bonus}</p>
                    </div>
                    <div className="tags">
                        <span>
                            <FiTag size={24} color="#4E4E4E" />
                            <h2>
                                Tags
                            </h2>
                        </span>
                        <ul className="align espacoTitulos">
                            <div>



                                <div className="tags" id="divTags">
                                </div>


                            </div>
                        </ul>
                    </div>
                    <div id="botao">
                        <form onSubmit={event => (
                            event.preventDefault(),
                            postInscricao()
                        )}>
                            <div className="button">
                                <button type="submit" disabled={desabilitar} >Candidatar-se</button>
                            </div>
                        </form>
                    </div>
                    <div className="map">

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetalhesVaga;