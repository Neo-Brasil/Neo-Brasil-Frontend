import React, { useState, useEffect } from 'react';
import './ModalEscolher.css';
import Axios from "axios";
import { Link } from 'react-router-dom';

import ModalRegistrar from '../Registrar';
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

export default function ModalEscolher({ close }) {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [cliente, setCliente] = useState({});
    const [titulo, setTitulo] = useState({});
    const [prestacoes, setPrestacoes] = useState();
    const id_cliente = localStorage.getItem("id_cliente");
    const id_titulo = localStorage.getItem("id_titulo");

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
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id_cliente}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((resp) => {
            var dado = resp.data
            setCliente(dado)
        });
        Axios.get(`http://localhost:9080/selecionar/titulos/${id_titulo}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((resp) => {
            var dado = resp.data
            let pre_prestacoes = []
            for (let k in dado.prestacoes) {
                if (dado.prestacoes[k].situacao == "Em aberto") {
                    pre_prestacoes.push(dado.prestacoes[k])
                }
            }
            setPrestacoes(pre_prestacoes)
            setTitulo(dado)
        });
    }, [])

    function togglePostModal(id_prestacao) {
        // localStorage.clear();
        localStorage.setItem("id_prestacao", id_prestacao);
        localStorage.setItem("id_titulo", id_titulo);
        setShowPostModal(!showPostModal);
        setDetail();
    }

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

                        <table>
                            <thead>
                                <tr><th scope="col">Mês</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Preço</th>
                                    <th scope="col">Registrar</th>
                                </tr>
                            </thead>
                        </table>

                        <div className='scroll'>
                            <table>
                                {typeof prestacoes !== 'undefined' && prestacoes.map((value) => {
                                    return !value.envio ?
                                        <tbody>
                                            <tr>
                                                <td data-label="Mês">{value.data_vencimento}</td>

                                                <td data-label="Status">{value.situacao}</td>

                                                <td data-label="Preço">
                                                    <MaskedInput mask={currencyMask} className="nostyleinput"
                                                        type="text" placeholder="R$" value={value.preco.toString().replace(".", ",")} disabled /></td>

                                                <td data-label="Registrar">
                                                    <Link className="action" onClick={() => togglePostModal(value.id)}>
                                                        <FiCheckCircle color="#44A756" size={30} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                        : null
                                })}
                            </table>
                        </div>

                    </div>
                </div>
            )}
            {showPostModal && (
                <ModalRegistrar conteudo={detail} close={togglePostModal} />
            )}
        </div>
    )
}