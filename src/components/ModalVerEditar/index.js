import React, { useState, useEffect } from 'react';
import './ModalVerEditar.css';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import { toast } from 'react-toastify';

export default function ModalVerEditar({ close }) {
    const [email, setEmail] = useState('');
    const id = localStorage.getItem("id");

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/usuario/${id}`).then((resp) => {
            var dado = resp.data
            setEmail(dado.email)
        });
    }, [])

    function handleSubmit() {
        Axios.put()
        
    }

    return (
        <div className="modal">
            {email.lenght === 0 ? (
                <div className='none'>
                    <p>Não foi encontrado...</p>
                </div>
            ) : (
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiArrowLeft color="#000" size={25} />
                    </button>

                    <p id="nome-ver-editar">Ver e/ou Editar usuário</p>

                    <div className='detalhes-ver-editar'>
                        <div className='inputs'>
                            <div className="campo">
                                <input type="text"  className="fixo" maxLength="60" />
                                <span>Nome completo</span>
                            </div>
                            
                            <div className="campo">
                                <input type="email" className="fixo" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <span>Email</span>
                            </div>

                            <div className="opcoes">
                            <select required>
                                <option value="0">Setor</option>
                                <option value="1">Comercial</option>
                                <option value="2">Financeiro</option>
                            </select>
                        </div>
                        </div>
                    </div>

                    <div className='button-color' onClick={() => handleSubmit()}>
                        <button className='button-green'>SALVAR</button>
                    </div>

                </div>
            )}
        </div>
    )
}