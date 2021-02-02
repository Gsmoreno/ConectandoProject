import React, { useState } from 'react';
import { FiBriefcase, FiHome, FiBarChart2, FiMap, FiTrendingUp, FiClipboard, FiTag, FiTerminal, FiChevronsRight } from 'react-icons/fi';
import empresaImg from '../../assets/images/empresa.png';
import './styles.css';
import jwt_decode from "jwt-decode";
import api from '../../services/api';
import { Link, Route } from 'react-router-dom';

export interface VagaModel {
    idVaga: number
    nome: string
    area: string
    nivelExp: string
    tipoContrato: string
    remoto: string
    detalhes: string
    idEnderecoNavigation: {
        uf: string
        cidade: string
    },
    idEmpresaNavigation: {
        nomeFantasia: string
        porteEmpresa: string
    },
    inscricao: [{
        idAluno: number
    }],
}


interface Inscricao {
    idAluno: number
}


interface ModeloProps {
    modelo: VagaModel;
    Clicar(id: number): any;
}

const ModeloVaga: React.FC<ModeloProps> = ({ modelo, Clicar }) => {
    return (
        <div>
            <div className="container">
                <div className="header espaco">
                    <div className="empresa espaco">
                        <img src={empresaImg} alt="" />
                        <h2>{modelo.nome}</h2>
                    </div>
                    <span>
                        <FiTag size={24} color="#4E4E4E" />
                        {modelo.area}
                    </span>
                </div>
                <div className="infos espaco">
                    <ul>
                        <div>
                            <li><FiBriefcase size={24} color="#4E4E4E" />Nome empresa: {modelo.idEmpresaNavigation.nomeFantasia}</li>
                            <li><FiBarChart2 size={24} color="#4E4E4E" />Empresa {modelo.idEmpresaNavigation.porteEmpresa}</li>
                            <li><FiMap size={24} color="#4E4E4E" />{modelo.idEnderecoNavigation.cidade} - {modelo.idEnderecoNavigation.uf} </li>
                        </div>
                        <br />
                        <div>
                            <li><FiTrendingUp size={24} color="#4E4E4E" /> Nível de exp: {modelo.nivelExp} </li>
                            <li><FiClipboard size={24} color="#4E4E4E" /> Tipo de contrato: {modelo.tipoContrato}</li>
                            <li><FiHome size={24} color="#4E4E4E" /> Parte em remoto: {modelo.remoto}</li>
                        </div>
                    </ul>
                </div>
                <span className="detalhes espaco">
                    <FiTerminal size={24} color="#4E4E4E" />
                    <p>
                        {modelo.detalhes}
                    </p>
                </span>
                <div className="Link">

                    <span onClick={() => Clicar(modelo.idVaga)} className="maisDetalhes">Mais detalhes<FiChevronsRight size={24} color="#FF0000" /></span>

                </div>
            </div>
        </div>
    )
}

export default ModeloVaga;