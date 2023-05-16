import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import "./ModalRelatorio.css"

import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import VerificaToken from '../../../script/verificaToken';

export default function ModalRelatorio({ close }) {
    const [cliente, setCliente] = useState({});
    const [prestacoes, setPrestacoes] = useState();
    const id_titulo = localStorage.getItem("id_titulo");
    const dataInicio = localStorage.getItem("dataInicio");
    const dataFim = localStorage.getItem("dataFim");
    const intervalo = localStorage.getItem("intervalo");
    const [total, setTotal] = useState('');
    const [quantia, setQuantia] = useState(0);

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
        if(intervalo == "Todas"){
            Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(function (error) {
                VerificaToken(error)
            }).then((resp) => {
                Axios.get(`http://localhost:9080/listagem/titulo_prestacoes/${id_titulo}/periodo/${dataInicio}/${dataFim}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).catch(function (error) {
                    VerificaToken(error)
                }).then((resp) => {
                    var dado = resp.data
                    var totalparcial = 0
                    var quantiaparcial = 0 
                    for (let k in dado) {             
                        dado[k].indice = parseInt(k) + 1
                        totalparcial += dado[k].preco
                        quantiaparcial += 1
                        dado[k].preco = dado[k].preco.toFixed(2).toString().replace(".",",");
                    }
                    setTotal(totalparcial.toFixed(2).toString().replace(".",","))
                    setQuantia(quantiaparcial)
                    setPrestacoes(dado)
                });
            });
        } else if(intervalo == "Vencimento"){
            Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(function (error) {
                VerificaToken(error)
            }).then((resp) => {
                Axios.get(`http://localhost:9080/listagem/titulo_prestacoes/${id_titulo}/periodo/${dataInicio}/${dataFim}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).catch(function (error) {
                    VerificaToken(error)
                }).then((resp) => {
                    var dado = resp.data
                    var dados = []
                    var totalparcial = 0
                    var quantiaparcial = 0 
                    for (let k in dado) {             
                        dado[k].indice = parseInt(k) + 1
                        if(dado[k].situacao == "Em aberto" || dado[k].situacao == "Inadimplente"){
                            dados.push(dado[k])
                            totalparcial += dado[k].preco
                            quantiaparcial += 1
                            dado[k].preco = dado[k].preco.toFixed(2).toString().replace(".",",");
                        }
                    }
                    setTotal(totalparcial.toFixed(2).toString().replace(".",","))
                    setQuantia(quantiaparcial)
                    setPrestacoes(dados)
                });
            });
        } else if(intervalo == "Pagamento"){
            Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(function (error) {
                VerificaToken(error)
            }).then((resp) => {
                Axios.get(`http://localhost:9080/listagem/titulo_prestacoes/${id_titulo}/periodo/${dataInicio}/${dataFim}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).catch(function (error) {
                    VerificaToken(error)
                }).then((resp) => {
                    var dado = resp.data
                    var dados = []
                    var totalparcial = 0
                    var quantiaparcial = 0 
                    for (let k in dado) {             
                        dado[k].indice = parseInt(k) + 1
                        if(dado[k].situacao == "Pago"){
                            dados.push(dado[k])
                            totalparcial += dado[k].preco
                            quantiaparcial += 1
                            dado[k].preco = dado[k].preco.toFixed(2).toString().replace(".",",");
                        }
                    }
                    setTotal(totalparcial.toFixed(2).toString().replace(".",","))
                    setQuantia(quantiaparcial)
                    setPrestacoes(dados)
                });
            });
        } else if(intervalo == "Crédito"){
            Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(function (error) {
                VerificaToken(error)
            }).then((resp) => {
                Axios.get(`http://localhost:9080/listagem/titulo_prestacoes/${id_titulo}/periodo/${dataInicio}/${dataFim}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).catch(function (error) {
                    VerificaToken(error)
                }).then((resp) => {
                    var dado = resp.data
                    var dados = []
                    var totalparcial = 0
                    var quantiaparcial = 0 
                    for (let k in dado) {             
                        dado[k].indice = parseInt(k) + 1
                        if(dado[k].situacao == "Creditado"){
                            dados.push(dado[k])
                            totalparcial += dado[k].preco
                            quantiaparcial += 1
                            dado[k].preco = dado[k].preco.toFixed(2).toString().replace(".",",");
                        }
                    }
                    setTotal(totalparcial.toFixed(2).toString().replace(".",","))
                    setQuantia(quantiaparcial)
                    setPrestacoes(dados)
                });
            });
        }
    }, [])

    return (
        <div className="modal">
            {total === 0 ? (
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiArrowLeft color="#000" size={25} />
                    </button>

                    <p><b>Situação: </b>{intervalo}</p>
                    {dataInicio === "0000-00-00"?(
                        <p><b>Intervalo de datas: </b> Todas as datas</p>
                    ):(
                        <p className='intervalo'><b>Intervalo de datas: </b>
                            <input type='date' className='noInput' 
                                value={dataInicio}></input> 
                            à 
                            <input type='date' className='noInput' 
                                value={dataFim}></input>
                        </p>
                    )}
                    <div className='none'>
                        <p>Nenhum dado encontrado...</p>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiArrowLeft color="#000" size={25} />
                    </button>

                    <p><b>Situação: </b>{intervalo}</p>
                    {dataInicio === "0000-00-00"?(
                        <p><b>Intervalo de datas: </b> Todas as datas</p>
                    ):(
                        <p className='intervalo'><b>Intervalo de datas: </b>
                            <input type='date' className='noInput' 
                                value={dataInicio}></input> 
                            à 
                            <input type='date' className='noInput' 
                                value={dataFim}></input>
                        </p>
                    )}

                    <div className='container-table' id='table-parcelas'>
                        <table id='linhaFixa'>
                            <thead>
                                <tr>
                                    <th scope="col">Prestação</th>
                                    <th scope="col">Vencimento</th>
                                    <th scope="col">Pagamento</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Preço</th>
                                </tr>
                                </thead>
                        </table>

                        <div className={quantia > 6 ? ("scroll") : ("")} id='line'>
                            <table>
                                {typeof prestacoes !== 'undefined' && prestacoes.map((value) => {
                                    return !value.envio ?
                                        <tbody>
                                            <tr>                                                
                                                <td data-label="Prestação">{value.indice}</td>

                                                <td data-label="Vencimento">
                                                    <input type='date' className='noInput' id='noInput'
                                                    value={value.data_vencimento}></input></td>

                                                    {value.data_pagamento !== "0000-00-00" ? (
                                                    <td data-label="Pagamento">
                                                    <input type='date' className='noInput' id='noInput'
                                                    value={value.data_pagamento}></input></td>
                                                    ) : (
                                                        <td data-label="Pagamento">-</td>
                                                    )}

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
                            <i>Total: 
                                <MaskedInput mask={currencyMask} className="nostyleinput" id='nostyleinputMenor'
                                placeholder='R$ ' type="text" disabled
                                value={total.toString().replace(".", ",")}></MaskedInput>
                            </i>
                        </div>
                    </div>
            )}
                </div>
            )
            }