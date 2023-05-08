import './CriarConta.css';
import logo from '../../assets/logo-transparent.png';
import lotus from '../../assets/lotus.png';
import React, { useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerificaToken from '../../script/verificaToken';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function CriarConta() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [showPassword2, setShowPassword2] = useState(false);
    const [papel, setPapel] = useState('');

    function handleShowPassword() {
        setShowPassword(true);
    
        setTimeout(() => {
          setShowPassword(false);
        }, 1500);
    }

    function handleShowPassword2() {
        setShowPassword2(true);
    
        setTimeout(() => {
          setShowPassword2(false);
        }, 1500);
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(senha == confirmaSenha){
            if (nome !== "" || email !== "" || senha !== "" || papel !== "") {
                Axios.get(`http://localhost:9080/listagem/usuarios`).then((resp) => {
                    let usuarios = resp.data
                    var chave = true
                    for(let k in usuarios){
                        if(usuarios[k].email == email){
                            if(usuarios[k].autorizado == "sim" || usuarios[k].email == email){
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
                        }).catch(function (error) {
                            VerificaToken(error)
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
                <picture>
                    <source media="(max-width: 700px)" srcset={lotus} />
                    <img src={logo} alt="logo de folhagem e escrito Neo-Brasil" />
                </picture>
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

                        <div className="password">
                            <input type={showPassword ? 'text' : 'password'}
                                placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />

                            <p onClick={handleShowPassword}>
                                {showPassword ? <FaEye color='#434343' /> : <FaEyeSlash color='#434343' />}
                            </p>
                        </div>

                        <div className="password">
                            <input type={showPassword2 ? 'text' : 'password'}
                                placeholder='Confirmar senha' value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />

                            <p onClick={handleShowPassword2}>
                                {showPassword2 ? <FaEye color='#434343' /> : <FaEyeSlash color='#434343' />}
                            </p>
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
                            <button className='button-green' id='sendSign'
                                onClick={() => handleSubmit()}>CRIAR</button>
                        </div>

                        <div className='navSign' >
                            <Link to={'/'}>VOLTAR PARA LOGIN
                            </Link>
                        </div>
                    </div>
                </form>


            </div>
        </div>

    )
}