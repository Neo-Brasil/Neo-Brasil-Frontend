import './Login.css';
import logo from '../../assets/logo-transparent.png';
import React, { useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleSubmit() {
        Axios.post("http://localhost:9080/checagem/usuario", {           
            email: email,
            senha: senha
        }).then((resp) => {
            var resposta = resp.data
            if(resposta){
                localStorage.setItem("login", "ok");
                window.location.href='/cadastro'
            }
        })
    }
    return (
        <div>
            <div className="login">
                <div className='logo'>
                    <img src={logo} alt="logo de folhagem e escrito Neo-Brasil" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='logar'>

                        <h2 className='signIn'>Faça login</h2>

                        <div className="campo">
                            <input type="nome" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <span>Email</span>
                        </div>
                        <div className="campo">
                            <input type="nome" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                            <span>Senha</span>
                        </div>

                        <div className='button-color'>
                            <button className='button-orange' onClick={() => handleSubmit()}>PRÓXIMO</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}