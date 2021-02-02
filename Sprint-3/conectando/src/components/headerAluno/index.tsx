import React from 'react';

import ImgSenai from '../../assets/images/LogoSenas.svg';
import FotoPac from '../../assets/images/fotoPac.png';

import '../../global.css';
import '../headerAluno/style.css';
import { Link } from 'react-router-dom';


function HeaderAluno() {
  return (
    <div>
      <nav>
        <div id="headerAluno">
          <img id="icone" src={ImgSenai} alt="" />
          <div id="href">
          <Link to='/perfilAluno'>Seu perfil</Link>
          <img id="fotoHeader" src={FotoPac} alt=""/>
          </div>
        </div>

          <div id="bottom"></div>

      </nav>

    </div>
  );
}

export default HeaderAluno;
