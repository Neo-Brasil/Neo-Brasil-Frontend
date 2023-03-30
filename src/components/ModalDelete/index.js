import './ModalDelete.css';
import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";

export default function ModalDelete({close}){
    const [nome, setNome] = useState('');
    const id_ = localStorage.getItem("id"); 
    const id = parseInt(id_);

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/clientes`).then((resp) => {
          var dados = resp.data
          for(var k in dados){
            if(dados[k].id == id){
                var dado = dados[k]
                setNome(dado.nome)
            } 
          }
        });
      }, [])

    function handleSubmit() {
        Axios.delete(`http://localhost:9080/excluir/cliente/${id}`).then((res) => {
            console.log(res)
        })
        localStorage.clear();
        close()
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