import React, { useEffect, useState } from 'react';
import HeaderAluno from '../../../components/headerAluno/index';
import Footer from '../../../components/footer/index';
import { Link } from 'react-router-dom';
import './style.css';
import FotoAluno from '../../../assets/images/fotoPac.png';
import { FiTrendingUp, FiMap, FiHome } from "react-icons/fi";
import { motion } from 'framer-motion';
import jwt_decode from "jwt-decode";
import api from '../../../services/api';
import ReactDOM from 'react-dom';


function ListaAluno() {

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

    

    

    var alunos: any[] = []
    useEffect(() => {
        BuscarAlunos()
    }, [])

    

    const BuscarAlunos = () => {
        let div = document.getElementById("div-Alunos")
        api.get("/Aluno", {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: auth
            }
        })
            .then(response => {
        response.data.map(((aluno: any) => {
            alunos.push(aluno)
        }))
        console.log(alunos)
        ReactDOM.render(ModeloAluno(response.data), document.getElementById("div-aluno"))
    })
}

const ModeloAluno = (e: any) => {
    return (
        <div>
            {e.map((aluno: any) => (
                <motion.div exit="out" animate="in" initial="out" variants={pageVariante} transition={pageTransition}>
                    <div className="centro">

                        <div className="containerr baixo">
                            <div className="listaaa espacoo">
                                <div className="aluno espacoo">
                                    <div id="separado">
                                        <img src={`data:image/jpeg;base64,${aluno.foto}`}alt="foto do aluno" title="foto" />
                                        <h2>{aluno.nome}</h2>
                                    </div>

                                    <p>{aluno.focoCarreira}</p>
                                </div>

                            </div>
                            <div className="infoss espacoo">
                                <ul>
                                    <div className="icon">
                                        <li><FiTrendingUp size={24} color="#4E4E4E" />Nivel de exp: {aluno.nivelExp} </li>
                                        <li><FiMap size={24} color="#4E4E4E" />{aluno.idEnderecoNavigation.cidade}/{aluno.idEnderecoNavigation.uf}</li>
                                        <li><FiHome size={24} color="#4E4E4E" />Aceita Remoto: {aluno.prefRemoto}</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>


                </motion.div>
            ))}
        </div>
    );
}

return (
    <div>
        <HeaderAluno />
        <div className="cadastro">
                <Link to="/cadastroAdm">
                    <a>Cadastrar Adm</a>
                </Link>
            </div>s
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
        <h5>Filtro</h5>

        <div id="div-aluno">

        </div>
        <Footer />
    </div>
);



}

export default ListaAluno;