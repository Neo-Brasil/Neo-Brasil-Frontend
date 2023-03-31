import React, { useState, useEffect } from 'react';
import './ModalRegistrar.css';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import { toast } from 'react-toastify';

export default function ModalRegistrar({ close }) {
    const [valorPago, setValorPago] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');
    const [cliente, setCliente] = useState({});
    const [titulo, setTitulo] = useState({});
    const id = localStorage.getItem("id") ; 

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id}`).then((resp) => {
          var dado = resp.data
          setCliente(dado)
          setTitulo(dado.titulos[0])
        });
      }, [])

    function handleSubmit() {
        if (valorPago !== '' && dataPagamento !== '') {
            if(valorPago >= titulo.preco){
                Axios.put("http://localhost:9080/atualizar/titulo" , {
                    id: titulo.id,
                    data_pagamento: dataPagamento,
                    ultimo_valor_pago: valorPago,
                    situacao: "Pago"
                } ).then((res) => {
                    console.log(res)
                })
                localStorage.clear();
                toast.success('Registrado com sucesso!')
                close()
            }else {
                toast.error('Valor incorreto')
            }
        } else {
            toast.error('Preencha todos os campos')
        }
    }

    return (
        <div className="modal">
            {cliente.lenght === 0 ? (
                <div className='none'>
                    <p>Nenhum dado encontrado...</p>
                    <p>Não há relatório diário!</p>
                </div>
            ) : (
            <div className="container">
                <button className="close" onClick={close}>
                    <FiArrowLeft color="#000" size={25} />
                </button>

                <p id="nome-registro">{cliente.nome}</p>

                <div className='detalhes-registro'>
                    <div className="column">
                        <b>Tipo de título: </b>
                        <p>{titulo.titulo}</p>
                        <b>Preço: </b>
                        <p>{titulo.preco}</p>

                    </div>

                    <div className="column">
                        <b>Valor pago: </b>
                        <input className="input-modal" placeholder="R$" type="number" min={titulo.preco} required
                            value={valorPago} onChange={(e) => setValorPago(e.target.value)} />
                    
                        <b>Data de pagamento: </b>
                        <input className="input-modal" type="date" required
                            value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)} />
                    </div>

                </div>

                <div className='button-color' onClick={() => handleSubmit()}>
                    <button className='button-green-modal'>REGISTRAR</button>
                </div>

            </div>
            )}
        </div>
    )
}