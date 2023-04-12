import './Login.css';
import logo from '../../assets/logo-transparent.png';
import React, { useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleSubmit() {
        if (email !== "" || senha !== "") {
            Axios.post("http://localhost:9080/checagem/usuario", {
                email: email,
                senha: senha
            }).then((resp) => {
                var resposta = resp.data
                if (resposta) {
                    localStorage.setItem("login", "ok");
                    window.location.href = '/cadastro'
                }
            });
        } else {
            toast.warning('Preencha todos os campos')
        }
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

                        <div className="campo" id='sign'>
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="campo" id='sign'>
                            <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>

                        <div className='button-color'>
                            <button className='button-green' onClick={() => handleSubmit()}>ENVIAR</button>
                        </div>

                        <p id='or'>------ OU ------</p>

                        <div className='button-color' id='send'>
                            <button className='button-orange'>
                                <Link to={'/criar_conta'}>
                                    CRIAR UMA CONTA</Link></button>
                        </div>
                    </div>
                </form>


            </div>
        </div>

    )
}

function or(arg0: boolean) {
    throw new Error('Function not implemented.');
}
