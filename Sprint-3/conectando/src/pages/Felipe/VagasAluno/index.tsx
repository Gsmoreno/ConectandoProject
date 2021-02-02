import React, { useEffect, useState } from 'react';

import HeaderAluno from '../../../components/headerAluno/index';
import Footer from '../../../components/footer/index';
import { motion } from 'framer-motion';


import './style.css';
import { Link } from 'react-router-dom';
import ModeloVaga, { VagaModel } from '../../../components/ModeloVaga';
import api from '../../../services/api';



function VagasAluno(){

    const auth = `Bearer ${localStorage.getItem('conectando-key-auth')}`;

    //#region Page Transition
    const pageTransition = {
        duration: 1
    }
    
    const pageVariante = {
        in: {
            opacity: 1,
            x: 0
        },
        out:{
            opacity: 0,
            x: "-180vw"
        }
    }
    //#endregion
    
    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        handleLoadVagas();
    }, []);
    
    async function handleLoadVagas(){
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

    const MaisDetalhes = (id:any) =>{
        localStorage.removeItem('idVaga')
        localStorage.setItem('idVaga', id)
        window.location.href = "/DetalhesVaga"
    }

    return(
        <div>
            <HeaderAluno/>
            <nav className="menulista">
                <ul className="menu">
                    <li><Link  className="cool-link" to="/vagasAluno">Vagas disponíveis</Link></li><br/>
                    <li><Link  className="cool-link" to="/vagasInscrito">Minhas inscrições</Link></li><br/>
                </ul>
                    <div className="hr">
                        <hr/>
                    </div>
            </nav>
            <motion.div className="totalVagas" exit="out" animate="in" initial="out"  variants={pageVariante} transition={pageTransition} >
                {vagas.map((modelo: VagaModel) => {
                    return <ModeloVaga key={modelo.idVaga} modelo={modelo} Clicar={MaisDetalhes} />
                })}
            </motion.div>

            <Footer/>
        </div>
    );


    
}

export default VagasAluno;