import React, { useEffect, useState } from "react";
import HeaderAluno from '../../../components/headerAluno/index';
import Footer from '../../../components/footer/index';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModeloVaga, { VagaModel } from '../../../components/ModeloVaga/index';
import './style.css';
import api from "../../../services/api";

function ListaVagas() {

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
            x: "-180vw"
        }
    }

    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        handleLoadVagas();
    }, []);

    async function handleLoadVagas() {
        await api.get('/vaga', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: auth
            },
            timeout: 10000
        }).then(response => {
            console.log(response.data);
            setVagas(response.data);
        })
    }

    const MaisDetalhes = (id: any) => {
        localStorage.removeItem('idVaga')
        localStorage.setItem('idVaga', id)
        window.location.href = "/DetalhesVaga"
    }

    return (
        <div>

            <HeaderAluno />
            <div className="cadastro">
                <Link to="/cadastroAdm">
                    <a>Cadastrar Adm</a>
                </Link>
            </div>
            <nav className="menulista">
                <ul className="menu">
                    <li><Link className="cool-link" to="/listaAluno">Aluno</Link></li>
                    <li><Link className="cool-link" to="/listaEmpresa">Empresa</Link></li>
                    <li><Link className="cool-link" to="/listaVaga">Vagas</Link></li><br />
                </ul>
                <div className="hr">
                    <hr />
                </div>
            </nav>
            <motion.div exit="out" animate="in" initial="out" variants={pageVariante} transition={pageTransition} >
                <h5>Filtro</h5>
                <div className="centrovag">
                    {vagas.map((modelo: VagaModel) => {
                        return <ModeloVaga key={modelo.idVaga} modelo={modelo} Clicar={MaisDetalhes} />
                    })}
                </div>


            </motion.div>

            <Footer />
        </div>
    );
}

export default ListaVagas;