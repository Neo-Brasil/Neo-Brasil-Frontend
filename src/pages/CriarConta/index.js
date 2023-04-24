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
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [papel, setPapel] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        if(senha == confirmaSenha){
            if (nome !== "" || email !== "" || senha !== "" || papel !== "") {
                Axios.get(`http://localhost:9080/listagem/usuarios`).then((resp) => {
                    let usuarios = resp.data
                    var chave = true
                    for(let k in usuarios){
                        if(usuarios[k].email == email){
                            if(usuarios[k].autorizado == "sim"){
                                toast.warning('Email já cadastrado, tente logar!')
                                setEmail("")
                            }else{
                                toast.info('Aguarde seu cadastro ser autorizado!')
                                setNome('')
                                setEmail('')
                                setPapel('')
                                setSenha('')
                                setConfirmaSenha('')
                            }
                            chave = false
                        }
                    }
                    if(chave){
                        Axios.post("http://localhost:9080/cadastro/usuario", {
                                nome: nome,
                                email: email,
                                senha: senha,
                                autorizado: papel
                        }).then((resp) => {
                        }) 
                        toast.info('Aguarde seu cadastro ser autorizado!')  
                        setNome('')
                        setEmail('')
                        setPapel('')
                        setSenha('') 
                        setConfirmaSenha('')
                    }
                });       
            } else {
                toast.warning('Preencha todos os campos!')
            }
        }else{
            toast.warning('Senha não coincide!')
            setSenha('')
            setConfirmaSenha('')
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

                        <h2 className='signIn'>Criar conta</h2>

                        <div className="campo" id='sign'>
                            <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>

                        <div className="campo" id='sign'>
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="campo" id='sign'>
                            <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>

                        <div className="campo" id='sign'>
                            <input type="password" placeholder='Confirmar Senha' value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
                        </div>

                        <div className="opcoes">
                        <select onChange={(e) => setPapel(e.target.value)}>
                                <option value="ADM">Administrador</option>
                                <option value="COMERCIAL">Comercial</option>
                                <option value="FINANCEIRO">Financeiro</option>
                            </select>
                        </div>

                        <p id='termos'>Ao continuar, você concorda com
                            os <Link to={'/termosDeUso'}>Termos de Uso</Link>.</p>

                        <div className='button-color'>
                            <button className='button-green' id='enviarLogin'
                                onClick={() => handleSubmit()}>CRIAR</button>
                        </div>

                        <div className='button-color' >
                            <Link to={'/'} id='goTo'>VOLTAR PARA LOGIN
                            </Link>
                        </div>
                    </div>
                </form>


            </div>
        </div>

    )
}