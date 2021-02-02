import React from "react";
import HeaderAluno from '../../components/headerAluno/index';
import Footer from '../../components/footer/index';
import { motion } from 'framer-motion';
import { Link, useHistory } from 'react-router-dom';
import ModeloVaga from '../../components/ModeloVaga/index';
import './style.css';

function ListaVagas() {

    

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

    return (
        <div>
            <HeaderAluno />
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
                    {/* <ModeloVaga /> */}
                </div>


            </motion.div>

            <Footer />
        </div>
    );
}

export default ListaVagas;