import React, { useState, useEffect } from 'react';
import './ModalEscolher.css';
import Axios from "axios";
import { Link } from 'react-router-dom';

import ModalRegistrar from '../Registrar';
import { FiArrowLeft, FiCheckCircle, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import VerificaToken from '../../../script/verificaToken';

export default function ModalEscolher({ close }) {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [cliente, setCliente] = useState({});
    const [titulo, setTitulo] = useState({});
    
    const [titulos, setTitulos] = useState([]);
    const [prestacoes, setPrestacoes] = useState();
    const id_cliente = localStorage.getItem("id_cliente");

    const currencyMask = createNumberMask({
        prefix: 'R$ ', suffix: '',
        includeThousandsSeparator: true, allowDecimal: false,
        decimalSymbol: ',', decimalLimit: 2,
        integerLimit: 13, requireDecimal: true,
        allowNegative: false, allowLeadingZeroes: false
    });

    useEffect(() => {
        Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
        });
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id_cliente}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            var dado = resp.data
            setCliente(dado)
            let oldTitulos = dado.titulos
            let titulos = []
            oldTitulos.map((titulo) => titulos.push(titulo))
            setTitulos(titulos);
        });
    }, [])
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;
    const totalPages = Math.ceil(titulos.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = titulos.slice(indexOfFirstItem, indexOfLastItem)[0];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };


    function togglePostModal(id_prestacao, id_titulo) {
        localStorage.setItem("id_prestacao", id_prestacao);
        localStorage.setItem("id_titulo", id_titulo);
        setShowPostModal(!showPostModal);
        setDetail();
    }

    return (
        <div className="modal">
            {currentItems === undefined ? (
                <div className='none'>
                    <p>Nenhum dado encontrado...</p>
                </div>
            ) : (
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiArrowLeft color="#000" size={25} />
                    </button>

                    <p id="nome-registro">{cliente.nome}</p>

                    <div className="pagination" id='escolher'>
                            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                                <FiChevronLeft />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button key={page} onClick={() => handlePageChange(page)}
                                className={`${currentPage === page ? 'active' : ''} 
                                ${currentPage === page && 'hoverfixo'}`}>
                                {titulos[page - 1].titulo}</button>
                            ))}

                            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                                <FiChevronRight />
                            </button>
                        </div>

                    <div className='container-table' id='table-parcelas'>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Prestação</th>
                                    <th scope="col">Vencimento</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Preço</th>
                                    <th scope="col">Registrar</th>
                                </tr>
                            </thead>
                        </table>

                        <div className='scroll' id='line'>
                            <table>
                            {typeof currentItems.prestacoes !== 'undefined' && currentItems.prestacoes.map((value) => {
                                if (value.situacao === 'Inadimplente' || value.situacao === 'Em aberto') {
                                    return (
                                    <tbody key={value.indice}>
                                        <tr>
                                        <td data-label="Prestação">{value.indice}</td>
                                        <td data-label="Vencimento">
                                            <input type='date' className='noInput' id='noInput' value={value.data_vencimento}></input>
                                        </td>
                                        <td data-label="Status">{value.situacao}</td>
                                        <td data-label="Preço">
                                            <MaskedInput mask={currencyMask} className="noStylePreco" id='notEnd' type="text" placeholder="R$" 
                                            value={value.preco.toString().replace(".", ",")} disabled />
                                        </td>
                                        <td data-label="Registrar">
                                            <Link className="action" onClick={() => togglePostModal(value.id, currentItems.id)}>
                                            <FiCheckCircle color="#44A756" size={30} />
                                            </Link>
                                        </td>
                                        </tr>
                                    </tbody>
                                    );
                                } else {
                                    return null;
                                }
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