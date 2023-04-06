import './CriarConta.css';
import logo from '../../assets/logo-transparent.png';
import React, { useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CriarConta() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [setor, setSetor] = useState('');

    function handleSubmit() {
        Axios.post("http://localhost:9080/checagem/usuario", {
            nome: nome,
            email: email,
            senha: senha,
            setor: setor
        }).then((resp) => {
            var resposta = resp.data
            if (resposta) {
                localStorage.setItem("login", "ok");
                window.location.reload();
                toast.info('Cadastro solicitado! Espere a aprovação')
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

                        <h2 className='signIn'>Criar uma conta</h2>

                        <div className="campo" id='sign'>
                            <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>

                        <div className="campo" id='sign'>
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="campo" id='sign'>
                            <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </div>

                        <div className="opcoes">
                            <select required>
                                <option value="0">Setor</option>
                                <option value="1">Comercial</option>
                                <option value="1">Financeiro</option>
                            </select>
                        </div>

                        <p id='termos'>Ao continuar, você concorda com 
                        os <Link to={'/termosDeUso'}>Termos de Uso</Link>.</p>

                        <div className='button-color'>
                            <button className='button-green' onClick={() => handleSubmit()}>CRIAR</button>
                        </div>

                        <p id='or'>------ OU ------</p>

                        <div className='button-color' id='send'>
                            <button className='button-orange'>
                                <Link to={'/'}>VOLTAR PARA LOGIN
                                </Link></button>
                        </div>
                    </div>
                </form>


            </div>
        </div>

    )
}