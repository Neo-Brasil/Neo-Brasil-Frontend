import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import VerificaToken from '../../../script/verificaToken';
import { useParams } from 'react-router-dom';

export default function ModalDeletarTitulo({close}){
    const id_titulo = localStorage.getItem("id_titulo")
    const id_usuario = localStorage.getItem("id_usuario");
    const [titulo, setTitulo] = useState({})
    const { id } = useParams();


    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/titulos/${id_titulo}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
          .catch(function (error) {
            VerificaToken(error);
          })
          .then((resp) => {
            let titulo = resp.data;
            setTitulo(titulo.titulo);
          });
      }, []); 

    function handleSubmit() {
        Axios.delete(`http://localhost:9080/excluir/titulo/${id}/${id_titulo}/${id_usuario}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((res) => {
            console.log(res)
        }) 
        localStorage.setItem("chave", "ok")
        close()
    }

    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={ close }>
                    <FiArrowLeft color="#000" size={25}/>
                </button>

                <div className='conteudoModal'>
                    <p>Deseja deletar título <b>{titulo.titulo}?</b></p>
                    <p className='aviso'>Esta ação não poderá ser desfeita!</p>

                    <div className='button-color' onClick={() => handleSubmit()}>
                        <button className='button-red'>DELETAR</button>
                    </div>

                </div>
            </div>
        </div>
    )
}