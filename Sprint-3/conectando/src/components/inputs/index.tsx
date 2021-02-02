import React, {InputHTMLAttributes} from 'react';
import './style.css';
import '../../global.css';

import {  Field, ErrorMessage  } from 'formik';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    name: string;
    type?: string;
    as?: string;
}

const Input: React.FC<InputProps> = ({label, name, type,as, ...rest}) => {
    return(
        <div className="style-input">
            <label htmlFor={name}>{label}</label><br/>
            <Field type={type} name={name} id={name}{...rest} as={as}/>
            <div className="error-message">
                <ErrorMessage name={name}/>
            </div>
        </div>
    );
}   

export default Input;