import React from 'react';
import './style.css';

 
interface ButtonProps {
    value: string;
}

const Button: React.FC<ButtonProps> = ({value}) => {
    return (
           <input className="button" type="submit" value={value} />
    );
}

export default Button;