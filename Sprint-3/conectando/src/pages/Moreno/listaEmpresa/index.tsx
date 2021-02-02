import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../components/footer';
import HeaderAluno from '../../../components/headerAluno';
import './style.css';
import FotoEmpresa from '../../../assets/images/micro.png';
import { FiBriefcase, FiPhone, FiGlobe, FiMapPin } from 'react-icons/fi';
import api from '../../../services/api';
import jwt_decode from "jwt-decode";
import ReactDOM from 'react-dom';
import { createLogicalOr } from 'typescript';

function ListaEmpresa() {

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
            x: "-180vw"
        }
    }



    const auth = `Bearer ${localStorage.getItem('conectando-key-auth')}`;

    let decoded: any = jwt_decode(auth);

    console.log(decoded);

    var empresas: any[] = []
    useEffect(() => {
        BuscarEmpresas()
    }, [])



    const BuscarEmpresas = () => {
        let div = document.getElementById("div-Alunos")
        api.get("/Empresa", {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: auth
            }
        })
            .then(response => {
                response.data.map(((empresa: any) => {
                    empresas.push(empresa)
                }))
                console.log(empresas)
                ReactDOM.render(ModeloEmpresa(response.data), document.getElementById("div-empresa"))
            })
    }

    function deletar(id: any) {
        console.log(id);
        api.delete(`/empresa/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: auth
            }
        }).then(function (response) {
            BuscarEmpresas();
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    const ModeloEmpresa = (e: any) => {
        return (
            <div>
                {e.map((empresa: any) => (
                    <motion.div exit="out" animate="in" initial="out" variants={pageVariante} transition={pageTransition} >

                        <div className="centro">
                            <div className="containerEmpresa baixo">
                                <div className="listaa espaco">
                                    <div className="empresaa espaco">
                                        <h2>{empresa.nome}</h2><br />
                                        <div className="ata">
                                            <img src={`data:image/jpeg;base64,${empresa.foto}`} alt="foto da empresa" title="foto" />
                                            <div className="partecima">
                                                <li><FiBriefcase size={24} color="#4E4E4E" />{empresa.razaoSocial} </li>
                                                <li><FiPhone size={24} color="#4E4E4E" />{empresa.whatsapp}</li>
                                            </div>
                                            <div className="partebaixo ">
                                                <li><FiGlobe size={24} color="#4E4E4E" />{empresa.cnae}</li>
                                                <li><FiMapPin size={24} color="#4E4E4E" />{empresa.idEnderecoNavigation.rua}</li>
                                            </div>
                                        </div>

                                        <a onClick={() => deletar(empresa.idEmpresa)}>Excluir empresa</a>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }






    return (
        <>

            <HeaderAluno />
            <div className="cadastro">
                <Link to="/cadastroAdm">
                    <a>Cadastrar Adm</a>
                </Link>
            </div>
            <nav className="menulista">
                
                <ul className="menu">
                    <li ><Link className="cool-link" to="/listaAluno">Aluno</Link></li>
                    <li><Link className="cool-link" to="/listaEmpresa">Empresa</Link></li>
                    <li><Link className="cool-link" to="/listaVaga">Vagas</Link></li><br />
                </ul>
                <div className="hr">
                    <hr />
                </div>
            </nav>
            <div id="div-empresa">

            </div>
            <Footer />
        </>
    );
}

export default ListaEmpresa;