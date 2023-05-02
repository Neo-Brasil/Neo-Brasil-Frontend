import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import VerificaToken from '../../../script/verificaToken';

export default function ModalDelUsuario({close}){
    const [email, setEmail] = useState('');
    const id = localStorage.getItem("id");

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/usuario/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            var dado = resp.data
            setEmail(dado.email)
        });
    }, [])

    function handleSubmit() {
        Axios.delete(`http://127.0.0.1:9080/excluir/usuario/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            console.log(resp)
        })
        //localStorage.clear();
        close();
        window.location.reload(true);
    }

    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={ close }>
                    <FiArrowLeft color="#000" size={25}/>
                </button>

                <div className='conteudoModal'>
                    <p>Deseja deletar a conta de <b>{email}?</b></p>
                    <p className='aviso'>Esta ação não poderá ser desfeita!</p>

                    <div className='button-color' onClick={() => handleSubmit()}>
                        <button className='button-red'>DELETAR</button>
                    </div>

                </div>
            </div>
        </div>
    )
}