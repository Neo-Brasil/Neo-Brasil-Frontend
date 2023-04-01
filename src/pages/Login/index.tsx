import React from 'react';
import './Login.css';
import logo from '../../assets/logo-transparent.png';

export default function Login() {
    return (
        <div>
            <div className="login">
                <div className='logo'>
                    <img src={logo} alt="logo de folhagem e escrito Neo-Brasil" />
                </div>

                <div className='logar'>

                    <h2 className='signIn'>Faça login</h2>

                    <div className="campo">
                        <input type="nome" required />
                        <span>Email</span>
                    </div>
                    <div className="campo">
                        <input type="nome" required />
                        <span>Senha</span>
                    </div>

                    <div className='button-color'>
                        <button className='button-orange'>PRÓXIMO</button>
                    </div>
                </div>


            </div>
        </div>

    )
}