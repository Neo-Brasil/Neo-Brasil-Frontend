import React, { useState, useEffect } from 'react';
import './ModalAprovar.css';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";

export default function ModalAprovar({ close }) {
    const [usuario, setUsuario] = useState('');
    const [conta, setConta] = useState({});
    const [papel, setPapel] = useState();
    const id = localStorage.getItem("id");

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/usuarios`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
            var dados = resp.data
            for (var k in dados) {
                if(dados[k].id == id){
                    setUsuario(dados[k])
                    setPapel(dados[k].autorizado)
                }
            }
        });
    }, [])
    
    function recusar() {
        Axios.delete(`http://127.0.0.1:9080/excluir/usuario/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
            console.log(resp)
            window.location.reload(true);
            localStorage.setItem("update", "1")
        })
    }
    function aprovar() {
        Axios.put(`http://127.0.0.1:9080/atualizar/usuario`,{
            id: id,
            autorizado: "sim",
            papel: papel
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
            window.location.reload(true);
            localStorage.setItem("update", "1")
        });
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
                            <select value={papel} onChange={(e) => setPapel(e.target.value)}>
                                <option value="ADM">Administrador</option>
                                <option value="COMERCIAL">Comercial</option>
                                <option value="FINANCEIRO">Financeiro</option>
                            </select>
                        </div>
                    </div>

                    <div className='buttonsRow'>
                        <div className='button-color' onClick={() => recusar()}>
                            <button className='button-red-modal'>RECUSAR</button>
                        </div>                        
                        <div className='button-color' onClick={() => aprovar()}>
                            <button className='button-green-modal'>APROVAR</button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}