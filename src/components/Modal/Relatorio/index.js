import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import "./ModalRelatorio.css"

import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

export default function ModalRelatorio({ close }) {

    const [cliente, setCliente] = useState({});
    const [prestacoes, setPrestacoes] = useState();
    const id_titulo = localStorage.getItem("id_titulo");
    const dataInicio = localStorage.getItem("dataInicio");
    const dataFim = localStorage.getItem("dataFim");
    const [total, setTotal] = useState();

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
        Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((resp) => {
        });
        Axios.get(`http://localhost:9080/listagem/titulo_prestacoes/${id_titulo}/periodo/${dataInicio}/${dataFim}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((resp) => {
            var dado = resp.data
            setPrestacoes(dado)


        });
    }, [])


    return (
        <div className="modal">
            {cliente.lenght === 0 ? (
                <div className='none'>
                    <p>Nenhum dado encontrado...</p>
                </div>
            ) : (
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiArrowLeft color="#000" size={25} />
                    </button>

                    <p id="nome-registro">{cliente.nome}</p>

                    <div className='container-table' id='table-parcelas'>

                        <i>Total: {total}</i>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Mês de vencimento</th>
                                    <th scope="col">Mês de pagamento</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Preço</th>
                                </tr>
                                </thead>
                        </table>

                        <div className='scroll' id='line'>
                            <table>
                                {typeof prestacoes !== 'undefined' && prestacoes.map((value) => {
                                    return !value.envio ?
                                        <tbody>
                                            <tr>
                                                <td data-label="MêsVence">{value.data_vencimento}</td>

                                                <td data-label="MêsPago">{value.data_pagamento}</td>

                                                <td id={value.situacao} data-label="Status">{value.situacao}</td>

                                                <td data-label="Preço">
                                                    <MaskedInput mask={currencyMask} className="nostyleinput" id='nostyleinputMenor'
                                                        placeholder='R$ ' type="text" disabled
                                                        value={value.preco.toString().replace(".", ",")}></MaskedInput> </td>

                                            </tr>
                                        </tbody>
                                        : null
                                })}
                            </table>
                        </div>

                        </div>
                    </div>
            )}
                </div>
            )
            }