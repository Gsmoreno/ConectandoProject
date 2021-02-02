import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { motion } from 'framer-motion';

import ImgMicrosoft from '../../../assets/images/microsoft.png';

import Footer from '../../../components/footer';
import HeaderEmpresa from '../../../components/headerEmpresa';

import '../../../global.css';
import './style.css';
import ModeloVaga, { VagaModel } from '../../../components/ModeloVaga';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

import jwt_decode from 'jwt-decode';



function VagasEmpresa() {

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


    const [vagas, setVagas] = useState([]);
    const [empresa, setEmpresa] = useState([]);

    useEffect(() => {
        GetVagasEmpresa();
        onLoadVaga();
    }, []);

    const MaisDetalhes = (id: any) => {
        localStorage.setItem('idVaga', id)
        window.location.href = "/DetalhesVagaEmpresa"
    }


    const auth = `Bearer ${localStorage.getItem('conectando-key-auth')}`;

    async function GetVagasEmpresa() {
        await api.get(`empresa/${handleDecode()}`,
            {
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
                setVagas(res.data);
            })
    }



    // const DetalhesDaVaga = (vagas: any) => {
    //     return (
    //         <div>
    //             {vagas.map((data: any) => (
    //                 <>
    //                 <div className="Offvagas">
    //                     <div className="separar">
    //                         <img src={ImgMicrosoft} alt="" id="img" />
    //                         <h2>{data.email} </h2>
    //                     </div>
    //                     <div className="dentro">
    //                         <MdKeyboardArrowDown size={24} />
    //                     </div>
    //                 </div>
    //                 </>
    //                 ))}
    //         </div>

    //     );
    // }




    return (
        < >
            <HeaderEmpresa />
            <div className="midVagasEmpresa">
                <div className="topp" >

                    <div className="arrowdois">
                        <FaArrowLeft color="black" size={24} />
                    </div>

                    <div id="head">
                        <Link to="/PerfilEmpresa"><h1>Seu perfil</h1></Link>
                        <Link to="/vagasempresa"><h1>Suas Vagas</h1></Link>
                    </div>
                    <div id="linhanav"></div>
                </div>
                <motion.div exit="out" animate="in" initial="out" variants={pageVariante} transition={pageTransition}>
                    {vagas.map((modelo: VagaModel) => {
                        return <ModeloVaga key={modelo.idVaga} modelo={modelo} Clicar={() => null} />
                    })}
                </motion.div>
            </div>
            <Footer />
        </>
    );
}

export default VagasEmpresa;