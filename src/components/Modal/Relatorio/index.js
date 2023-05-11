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
    const intervalo = localStorage.getItem("intervalo")
    const total = useEffect()

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
                    for (let k in dado) {             
                        dado[k].indice = parseInt(k) + 1
                    }
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
                    for (let k in dado) {             
                        dado[k].indice = parseInt(k) + 1
                        if(dado[k].situacao == "Em aberto" || dado[k].situacao == "Inadimplente"){
                            dados.push(dado[k])
                        }
                    }
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
                    for (let k in dado) {             
                        dado[k].indice = parseInt(k) + 1
                        if(dado[k].situacao == "Pago"){
                            dados.push(dado[k])
                        }
                    }
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
                    for (let k in dado) {             
                        dado[k].indice = parseInt(k) + 1
                        if(dado[k].situacao == "Creditado"){
                            dados.push(dado[k])
                        }
                    }
                    setPrestacoes(dados)
                });
            });
        }
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

                    <p>Situação: {intervalo}</p>
                    {dataInicio === "0000-00-00"?(
                        <p>Intervalo de datas: Todas as datas</p>
                    ):(
                        <p>Intervalo de datas: {dataInicio.replace("-","/").replace("-","/")} à {dataFim.replace("-","/").replace("-","/")}</p>
                    )}
                    
                    <div className='container-table' id='table-parcelas'>
                        <table id='linhaFixa'>
                            <thead>
                                <tr>
                                    <th scope="col">Prestação</th>
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
                                                <td data-label="Prestação">{value.indice}</td>
                                                
                                                <td data-label="Mês de vencimento">{value.data_vencimento}</td>

                                                <td data-label="Mês de pagamento">{value.data_pagamento}</td>

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