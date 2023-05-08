import './Login.css';
import logo from '../../assets/logo-transparent.png';
import lotus from '../../assets/lotus.png';
import React, { useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    if(localStorage.getItem('erro') == 'y'){
        toast.warning('Token expirado!')
        toast.info('Logue novamente')
    }
    localStorage.clear()
    localStorage.setItem("acesso", "0")
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function handleShowPassword() {
        setShowPassword(true);
    
        setTimeout(() => {
          setShowPassword(false);
        }, 1500);
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (email !== "" || senha !== "") {
            Axios.post("http://localhost:9080/checagem/usuario", {
                email: email,
                senha: senha
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status == 403){
                        toast.warning('Conta inexistente!')
                    }
                }
              })
            .then((resp) => {
                var resposta = resp.data
                localStorage.setItem("token", resposta)

                Axios.get(`http://localhost:9080/listagem/usuarios`, {
                    headers: {
                        'Authorization': `Bearer ${resposta}`
                        }
                }).then((resp) => {
                        let usuarios = resp.data
                        for(let k in usuarios){
                            if(usuarios[k].email == email){
                                if(usuarios[k].autorizado == "sim"){
                                    localStorage.setItem("acesso", usuarios[k].papel)
                                    localStorage.setItem("email_usuario", usuarios[k].email)
                                    localStorage.setItem("login", "ok");
                                    if(usuarios[k].papel == "ADM"){
                                        window.location.href = '/aprovar_contas'
                                    } else if(usuarios[k].papel == "COMERCIAL"){
                                        window.location.href = '/cadastro'
                                    } else if(usuarios[k].papel == "FINANCEIRO"){
                                        window.location.href = '/registrar_pagamento'
                                    } else {
                                        window.location.href = '*'
                                    }
                                }else{
                                    toast.info('Aguarde seu cadastro ser autorizado!')
                                    setEmail('')
                                    setSenha('')
                                }
                            }
                    }
                });
            });
        } else {
            toast.warning('Preencha todos os campos')
        }
    }

    return (
        <div>
            <div className="login">
                <div className='logo'>
                <picture>
                    <source media="(max-width: 700px)" srcset={lotus} />
                    <img src={logo} alt="logo de folhagem e escrito Neo-Brasil" />
                </picture>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='logar'>

                        <h2 className='signIn'>Login</h2>

                        <div className="campo" id='sign'>
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="campo" id='sign'>
                            <input type={showPassword ? 'text' : 'password'}
                                id="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>

                        <p id='eye' onClick={handleShowPassword}>
                            {showPassword ? <FaEye color='#434343' /> : <FaEyeSlash color='#434343' />}
                        </p>

                        <div className='button-color'>
                            <button className='button-green' id='enviarLogin' 
                            onClick={() => handleSubmit()}>ENVIAR</button>
                        </div>

                        <div className='button-color'>
                                <Link to={'/criar_conta'} id='goTo'>
                                    CRIAR CONTA</Link>
                        </div>
                    </div>
                </form>


            </div>
        </div>

    )
}

// function or(arg0: boolean) {
//     throw new Error('Function not implemented.');
// }
