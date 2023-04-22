import React, { useState, useEffect } from 'react';
import './ModalVerEditar.css';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import { toast } from 'react-toastify';

export default function ModalVerEditar({ close }) {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [setorId, setIdSetor] = useState('');
    const id = localStorage.getItem("id");

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/usuario/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
            var dado = resp.data
            setEmail(dado.email)
            setNome(dado.nome)
            setIdSetor(dado.setor.id)
        });

    }, [])

    function handleSubmit() {
        Axios.get(`http://127.0.0.1:9080/selecionar/setor/${setorId}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
            Axios.put(`http://127.0.0.1:9080/atualizar/usuario`,{
                id: id,
                email: email,
                nome: nome,
                setor: resp.data
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
            }).then((resp) => {
                toast.success('Usuário editado com sucesso!')
            });
        });
        // window.location.reload(true);
        // localStorage.setItem("update", "1")
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
                                <input type="text"  className="fixo" maxLength="60" placeholder={nome} value={nome} onChange={(e) => setNome(e.target.value)}/>
                                <span>Nome completo</span>
                            </div>
                            
                            <div className="campo">
                                <input type="email" className="fixo" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <span>Email</span>
                            </div>

                            <div className="opcoes">
                            <select value={setorId} onChange={(e) => setIdSetor(e.target.value)}>
                                <option value="1">Administrador</option>
                                <option value="2">Comercial</option>
                                <option value="3">Financeiro</option>
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