import React, { useState, useEffect } from 'react';
import Footer from '../../../components/footer';
import { FiArrowLeft, FiClock, FiDollarSign, FiList, FiPlusCircle, FiTag, FiTerminal } from 'react-icons/fi';
import empresaImg from '../../../assets/images/empresa126.svg';

import './styles.css';
import HeaderEmpresa from '../../../components/headerEmpresa';


import api from '../../../services/api';
import ModeloVaga, { VagaModel } from '../../../components/ModeloVaga';

function DetalhesVagaEmpresa() {

    // const auth = `Bearer ${localStorage.get('conectando-key-auth')}`;


    // const [area, setArea] = useState('');
    // const [nivelExp, setNivelExp] = useState('');
    // const [tipoContrato, setTipoContrato] = useState('');
    // const [remoto, setRemoto] = useState('');
    // const [detalhes, setDetalhes] = useState('');
    // const [requisitos, setRequisitos] = useState('');
    // const [porteEmpresa, setPorteEmpresa] = useState('');
    // const [horario, setHorario] = useState(date());
    // const [salario, setSalario] = useState('');
    // const [beneficios, setBeneficios] = useState('');
    // const [prazo, setPrazo] = useState('');
    // const [limiteAluno, setLimiteAluno] = useState('');
    // const [situacao, setSituacao] = useState('');
    // const [idEndereco, setIdEndereco] = useState('');
    // const [uf, setUf] = useState('');
    // const [cidade, setCidade] = useState('');
    // const [idEmpresa, setIdEmpresa] = useState('');

    // var optionsBanco: { value: any; label: any; }[] = [];

    // const Montar = (e: any) => {
    //     optionsBanco.push({ value: e.idTags, label: e.nome });
    //     setOptions(optionsBanco);
    // }

    // function handleLoadTags() {
    //     api.get('/Tags', {
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then(res => {
    //         res.data.forEach((element: any) => {
    //             Montar(element)
    //         })
    //     }).catch(err => console.log(err))
    // }

    // const idVagaLocal = localStorage.getItem('idVaga')


    useEffect(() => {
        onLoadVaga();
    }, [])

    const [vagas, setVagas] = useState([]);

    const [empresa, setEmpresa] = useState([]);
    const auth = `Bearer ${localStorage.getItem('conectando-key-auth')}`;

    function onLoadVaga() {

        api.get("/vaga", {

            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: auth
            }
        })
            .then(res => {
                console.log(res.data);
                setEmpresa(res.data);
            })
    }



    return (
        <>
            <HeaderEmpresa />

            {empresa.map((item: any) => {
                return (
                    <div className="containerVaga">
                        <div className="top">
                            <FiArrowLeft size={80} color="#4E4E4E" />
                            <img src={empresaImg} alt="" />
                        </div>
                        <div className="containerCinza">

                            <div className="header espaco">
                                <div className="empresa espaco">
                                    <h2>{item.nome}</h2>
                                </div>
                                <span>
                                    <FiTag size={24} color="#4E4E4E" />
                        {item.area}
                        </span>
                            </div>
                            {vagas.map((modelo: VagaModel) => {
                                return <ModeloVaga key={modelo.idVaga} modelo={modelo} Clicar={() => null} />
                            })}
                        </div>

                        <div className="main">

                            <div className="detalhes">
                                <span>
                                    <FiTerminal size={24} color="#4E4E4E" />
                                    <h2>
                                        Detalhes
                                </h2>
                                </span>
                                <p className="align espacoTitulos">
                                    {item.detalhes}
                                </p>
                            </div><div className="meio">
                                <div className="requisitos">
                                    <span>
                                        <FiList size={24} color="#4E4E4E" />
                                        <h2>
                                            Requisitos
                                        </h2>
                                    </span>
                                    <ul className="align espacoTitulos">
                                        <li>{item.requisitos}</li>
                                    </ul>
                                </div>
                                <div className="complementos">
                                    <span>
                                        <FiClock size={24} color="#4E4E4E" />
                                        <h3>
                                            Horário: <p>{item.horario}</p>
                                        </h3>
                                    </span>
                                    <span>
                                        <FiDollarSign size={24} color="#4E4E4E" />
                                        <h3>
                                            Salário: <p>{item.salario}</p>
                                        </h3>
                                    </span>
                                </div>
                            </div><div className="bonus">
                                <span>
                                    <FiPlusCircle size={24} color="#4E4E4E" />
                                    <h2>
                                        Bônus
                                    </h2>
                                </span>
                                <p className="align espacoTitulos">{item.beneficio}</p>
                            </div><div className="tags">
                                <span>
                                    <FiTag size={24} color="#4E4E4E" />
                                    <h2>
                                        Tags
                                    </h2>
                                </span>
                                <ul className="align espacoTitulos">
                                    <div>

                                    </div>
                                </ul>
                            </div><div className="button">
                                <button onClick={() => { }}>Confirmar</button>
                            </div>

                            <div className="map">

                            </div>
                        </div>
                    </div>
                )
            })}
            <Footer />

        </>
    )
}

export default DetalhesVagaEmpresa;