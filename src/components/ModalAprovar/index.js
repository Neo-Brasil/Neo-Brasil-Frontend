import React, { useState, useEffect } from 'react';
import './ModalAprovar.css';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import { toast } from 'react-toastify';

export default function ModalRegistrar({ close }) {
    const [valorPago, setValorPago] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');
    const [conta, setConta] = useState({});
    const [titulo, setTitulo] = useState({});
    const id = localStorage.getItem("id");

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id}`).then((resp) => {
            var dado = resp.data
            setConta(dado)
            setTitulo(dado.titulos[0])
        });
    }, [])

    function handleSubmit() {
        if (valorPago !== '' && dataPagamento !== '') {
            if (valorPago >= titulo.preco) {
                Axios.put("http://localhost:9080/atualizar/titulo", {
                    id: titulo.id,
                    data_pagamento: dataPagamento,
                    ultimo_valor_pago: parseFloat(valorPago.replace('R$ ','').replace('.','').replace('.','').replace('.','').replace('.','').replace(',','.')),
                    situacao: "Pago"
                }).then((res) => {
                    console.log(res)
                })
                localStorage.clear();
                toast.success('Registrado com sucesso!')
                close()
                window.location.reload(true);
            } else {
                toast.error('Valor incorreto')
            }
        } else {
            toast.error('Preencha todos os campos')
        }
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
                        <b>Email: </b>
                        <p>{titulo.titulo}</p>
                        <b>Setor: </b>

                        <select required>
                            <option value="0"></option>
                            <option value="1">Comercial</option>
                            <option value="2">Financeiro</option>
                            <option value="3">Administrador</option>
                        </select>
                    </div>

                    <div className='buttonsRow'>

                        <div className='button-color' onClick={() => handleSubmit()}>
                            <button className='button-green-modal'>APROVAR</button>
                        </div>
                        <div className='button-color' onClick={() => handleSubmit()}>
                            <button className='button-red-modal'>RECUSAR</button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}