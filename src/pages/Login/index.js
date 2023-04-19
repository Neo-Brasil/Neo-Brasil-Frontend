import './Login.css';
import logo from '../../assets/logo-transparent.png';
import React, { useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    localStorage.clear()
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        if (email !== "" || senha !== "") {
            console.log(email, senha);
            Axios.post("http://localhost:9080/checagem/usuario", {
                email: email,
                senha: senha
            }).then((resp) => {
                var resposta = resp.data
                if (resposta) {
                    Axios.get(`http://localhost:9080/listagem/usuarios`).then((resp) => {
                        let usuarios = resp.data
                        for(let k in usuarios){
                            if(usuarios[k].email == email){
                                if(usuarios[k].autorizado == 1){
                                    localStorage.setItem("acesso", usuarios[k].setor.id)
                                    localStorage.setItem("login", "ok");
                                    window.location.href = '/relatorio'
                                }else{
                                    toast.success('Aguarde seu cadastro ser autorizado!')
                                    setEmail('')
                                    setSenha('')
                                }
                            }
                        }
                    });
                } else{
                    toast.warning('Conta inexistente!')
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

                        <h2 className='signIn'>Login</h2>

                        <div className="campo" id='sign'>
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="campo" id='sign'>
                            <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>

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
