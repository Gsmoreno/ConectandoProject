import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import {FiArrowLeft, FiMail, FiAward, FiMenu, FiMap, FiTag, FiTrendingUp, FiHome} from 'react-icons/fi';
import {BiHandicap} from 'react-icons/bi';
import {FaWhatsapp, FaRegAddressCard} from 'react-icons/fa'

import HeaderEmpresa from '../../../components/headerEmpresa/index';
import Footer from '../../../components/footer/index';

import './style.css';
import Axios from 'axios';


function DetalhesAluno(){

    const idAlunoLocal = localStorage.getItem('idAluno')
    
    const api = Axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem("conectando-key-auth")
        }
    })

        
        const BuscarTags = (tags:any) =>{
            let tagsAluno:any = []
            let pTags: string = ''
            for (let index = 0; index < tags.length; index++) {
                api.get('/Tags/'+tags[index].idTags)
                .then(response =>{
                    tagsAluno.push(response.data.nome)
                    pTags = pTags + `<p>${response.data.nome}</p>`;
                    let div = document.getElementById('divTags')
                    if(div !== null) div.innerHTML=pTags;
                })
            }

            
        }

    const [nome, setNome] = useState('')
    const [remoto, setRemoto] = useState('')
    const [focoCarreira, setFocoCarreira] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCPF] = useState('')
    const [numero, setNumero] = useState('')
    const [nivelExp, setNivelExp] = useState('')
    const [semestre, setSemestre] = useState('')
    const [deficiencia, setDeficiencia] = useState('')
    const [area, setArea] = useState('')
    const [estadoCidade, setEstadoCidade] = useState('')

    useEffect(() =>{
        BuscarAluno()
    }, [])

    const BuscarAluno = () =>{
        api.get("/Aluno/Al/"+idAlunoLocal)
        .then(response => {
            console.log(response)
            let aluno = response.data;
            console.log(aluno)
            setNome(aluno.nome)
            setRemoto(aluno.prefRemoto)
            setFocoCarreira(aluno.focoCarreira)
            setNivelExp(aluno.nivelExp)
            setEmail(aluno.email)
            setCPF(aluno.cpf)
            setNumero(aluno.whatsapp)
            setSemestre(aluno.semestre)
            setDeficiencia(aluno.deficiencia)
            setArea(aluno.idCursoNavigation.nome)
            setEstadoCidade(aluno.idEnderecoNavigation.uf+"/"+aluno.idEnderecoNavigation.cidade)
            BuscarTags(aluno.tagsAluno)
            
        })
    }

    const TemDeficiencia = (def:any) =>{
        if( def === 'Sim' || def === 'sim')
            return (
                <div className="div1">
                    <BiHandicap className="icones"/>
                    <p>{deficiencia}</p>
                </div>
            );
        else
            return null;
    }

    return(
        <div>
            <HeaderEmpresa/>

            <div className="principal">
                <Link to="/telaprincipalempresa"><FiArrowLeft className="icon" /></Link>

                {TemDeficiencia(deficiencia)}

                <div className="infoPrincipal">
                    <p>{nome}</p>

                    <div>
                        <p>{focoCarreira}</p>
                    </div>

                    <p>foto</p>
                </div>

                <div className="demaisInfos">

                    <div className="infos">
                        <div className="divs">
                            <FaRegAddressCard className="icones"/>
                            <p>{cpf}</p>
                        </div>

                        <div className="divs">
                            <FiMail className="icones"/>
                            <p>{email}</p>
                        </div>

                        <div className="divs">
                            <FaWhatsapp className="icones"/>
                            <p>{numero}</p>
                        </div>
                    </div>

                    <div className="infos">
                        <div className="divs">
                            <FiAward className="icones"/>
                            <p>{area}</p>
                        </div>

                        <div className="divs">
                            <FiMenu className="icones"/>
                            <p>{semestre}ºSemestre</p>
                        </div>
                    </div>

                    <div className="infos">
                        <div className="divs">
                            <FiMap className="icones"/>
                            <p>{estadoCidade}</p>
                        </div>

                        <div className="divs">
                            <FiTrendingUp className="icones"/>
                            <p>{nivelExp}</p>
                        </div>

                        <div className="divs">
                            <FiHome className="icones"/>
                            <p>Remoto: {remoto}</p>
                        </div>
                    </div>
                </div>
                
                <div className="divTags">
                    <div className="divs">
                        <FiTag className="icones"/>
                        <p>Tags</p>
                    </div>

                    <div className="tags" id="divTags">
                    </div>
                    
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default DetalhesAluno;