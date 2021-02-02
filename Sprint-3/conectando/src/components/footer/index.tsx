import React from 'react';


import logoConectando from '../../assets/images/logo.png';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';


import './style.css';

function Footer(){
    return(
        <div className="footer">
            <div className="divisoria"></div>
            <div className="divIFooter">
                <img src={logoConectando} alt=""/>
                <div className="divInfos">
                    <div className="divInfo">
                        <FaMapMarkerAlt className="iconsF"/>
                        <p className="infoFooter">Al. Barão de limeira - 539</p>
                    </div>
                    <div className="divInfo">
                        <FiPhone className="iconsF"/>
                        <p className="infoFooter">(11) 3273-5000</p>
                    </div>
                </div>
            </div>
            <div className="direitos">
                <p className="copyright">Copyright  2020 © Todos os direitos reservados.</p>
            </div>
        </div>
    );
}

export default Footer;