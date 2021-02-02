import React from 'react';
import { Link } from 'react-router-dom';

import ImgSenai from '../../assets/images/logoEmpresa.svg';
import ImgEmpresa from '../../assets/images/rockt.png';

import '../../global.css';
import '../headerEmpresa/style.css';


function HeaderEmpresa() {
  return (
    <div>
      <nav>
        <div id="headerEmpresa">
          <div id="hreff">
          <img id="fotoHeader" src={ImgEmpresa} alt="imagem da empresa"/>
          <Link to="/perfilEmpresa">
          <a href="">Seu perfil</a>
          </Link>
          </div>
          <img id="icone" src={ImgSenai} alt="logo do senai" /> 
        </div>
        <div id="width">
          <div id="bottomEmpresa"/> </div>


      </nav>

    </div>
  );
}

export default HeaderEmpresa;
