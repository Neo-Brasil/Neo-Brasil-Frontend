import './ModalDelCliente.css';
import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import VerificaToken from '../../../script/verificaToken';

export default function ModalDelCliente({close}){
    const [nome, setNome] = useState('');
    const id_ = localStorage.getItem("id"); 
    const id = parseInt(id_);
    const  id_usuario = localStorage.getItem("id_usuario");

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/clientes`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
          var dados = resp.data
          for(var k in dados){
            if(dados[k].id === id){
                var dado = dados[k]
                setNome(dado.nome)
            } 
          }
        });
      }, [])

    function handleSubmit() {
        Axios.delete(`http://localhost:9080/excluir/cliente/${id}/${id_usuario}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((res) => {
            console.log(res)
        }) 
        localStorage.setItem("update", "1")
        window.location.reload(true);
    }

    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={ close }>
                    <FiArrowLeft color="#000" size={25}/>
                </button>

                <div className='conteudoModal'>
                    <p>Deseja deletar <b>{nome}?</b></p>
                    <p className='aviso'>Esta ação não poderá ser desfeita!</p>

                    <div className='button-color' onClick={() => handleSubmit()}>
                        <button className='button-red'>DELETAR</button>
                    </div>

                </div>
            </div>
        </div>
    )
}