import React, { useState, useEffect } from 'react';
import './ModalAprovar.css';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";

export default function ModalRegistrar({ close }) {
    const [usuario, setUsuario] = useState('');
    const [conta, setConta] = useState({});
    const [titulo, setTitulo] = useState({});
    const [setorId, setSetorId] = useState();
    const id = localStorage.getItem("id");

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/usuarios`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
            var dados = resp.data
            var novoDados = []
            for (var k in dados) {
                var novoDado = []
                if(dados[k].id == id){
                    setUsuario(dados[k])
                    setSetorId(dados[k].setor.id)
                }
            }
        });
    }, [])
    function handleSubmit() {
        Axios.put(`http://127.0.0.1:9080/atualizar/usuario`,{
            id: id,
            autorizado: true
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
        });
        window.location.reload(true);
        localStorage.setItem("update", "1")
    }

    return (
        <div className="modal">
            {conta.lenght === 0 ? (
                <div className='none'>
                    <p>Não foi encontrado...</p>
                </div>
            ) : (
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiArrowLeft color="#000" size={25} />
                    </button>

                    <p id="nome-registro">{conta.nome}</p>

                    <div className='detalhes-aprovar'>
                        <div className='aprovar'> 
                            <p><b>Email: </b>{usuario.email}</p>
                        </div>

                        <div className='aprovar'> 
                            <p><b>Setor: </b></p>

                            <select value={setorId} required>
                                <option value="1">Administrador</option>
                                <option value="2">Comercial</option>
                                <option value="3">Financeiro</option>
                            </select>
                        </div>
                    </div>

                    <div className='buttonsRow'>
                        <div className='button-color' onClick={() => handleSubmit()}>
                            <button className='button-red-modal'>RECUSAR</button>
                        </div>                        
                        <div className='button-color' onClick={() => handleSubmit()}>
                            <button className='button-green-modal'>APROVAR</button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}