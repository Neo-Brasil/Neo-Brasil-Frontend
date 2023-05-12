import React, { useState, useEffect } from 'react';
import './ModalRegistrar.css';
import Axios from "axios";

import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import VerificaToken from '../../../script/verificaToken';

export default function ModalRegistrar({ close }) {
    const [valorPago, setValorPago] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');
    const [prestacao, setPrestacao] = useState({});
    const [titulo, setTitulo] = useState({});
    const [preco, setPreco] = useState()
    const id_prestacao = localStorage.getItem("id_prestacao");
    const id_titulo = localStorage.getItem('id_titulo');
    const id_usuario = localStorage.getItem("id_usuario");

    const currencyMask = createNumberMask({
        prefix: 'R$ ',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: false,
        decimalSymbol: ',',
        decimalLimit: 2,
        integerLimit: 13,
        requireDecimal: true,
        allowNegative: false,
        allowLeadingZeroes: false
    });

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/titulos/${id_titulo}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            var dado = resp.data
            setTitulo(dado)
            let prestacoes = dado.prestacoes;
            for (let k in prestacoes) {
                let prestacao = prestacoes[k]
                if (prestacao.id == id_prestacao) {
                    setPrestacao(prestacao)
                    setPreco(prestacao.preco.toString().replace(".", ","))
                }
            }
        });
    }, [])

    function handleSubmit() {
        if (valorPago !== '' && dataPagamento !== '') {
            if (valorPago.replace('R$ ', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.') >= titulo.preco) {
                Axios.put(`http://localhost:9080/pagar/prestacao/${id_usuario}`, {
                    id: id_titulo,
                    prestacoes: [
                        {
                            id: id_prestacao,
                            data_pagamento: dataPagamento
                        }
                    ]
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).catch(function (error) {
                    VerificaToken(error)
                }).then((res) => {
                    console.log(res)
                })
                localStorage.setItem("update", "1")
                window.location.href = '/registrar_pagamento'
            } else {
                toast.error('Valor incorreto')
            }
        } else {
            toast.error('Preencha todos os campos')
        }
    }

    return (
        <div className="modal">
            {titulo.lenght === 0 ? (
                <div className='none'>
                    <p>Nenhum dado encontrado...</p>
                </div>
            ) : (
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiArrowLeft color="#000" size={25} />
                    </button>
                    <div className='detalhes-registro'>
                        <div className="column">
                            <b>Tipo de título: </b>
                            <p>{titulo.titulo}</p>
                            <b>Preço: </b>
                            <p> 
                                <MaskedInput mask={currencyMask} className="nostyleinput" type="text" placeholder="R$" value={titulo.preco.toString().replace(".", ",")} disabled />
                            </p>
                        </div>

                        <div className="column">
                            <b>Valor pago: </b>
                            <MaskedInput mask={currencyMask} className="input-modal" id='alinhar-pago' type="text" placeholder="R$" required
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