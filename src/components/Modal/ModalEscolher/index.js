import React, { useState, useEffect } from 'react';
import './ModalEscolher.css';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import ModalRegistrar from '../ModalRegistrar';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from "react-icons/fi";

export default function ModalEscolher({ close }) {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [cliente, setCliente] = useState({});
    const [titulo, setTitulo] = useState({});
    const [prestacoes, setPrestacoes] = useState();
    const id_cliente = localStorage.getItem("id_cliente") ; 
    const id_titulo = localStorage.getItem("id_titulo") ; 

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id_cliente}`).then((resp) => {
          var dado = resp.data
          setCliente(dado)
        });
        Axios.get(`http://localhost:9080/selecionar/titulos/${id_titulo}`).then((resp) => {
            var dado = resp.data
            setPrestacoes(dado.prestacoes)
            setTitulo(dado)
          });
      }, [])

    function togglePostModal(id_prestacao) {
        localStorage.clear();
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
                        {typeof prestacoes !== 'undefined' && prestacoes.map((value) => {
                            return !value.envio ?
                                    <tbody>
                                        <tr>
                                            <td data-label="Mês">{value.data_vencimento}</td>

                                            <td data-label="Status">{value.situacao}</td>

                                            <td data-label="Preço">{value.preco}</td>

                                            <td data-label="Registrar">
                                                <Link className="action" onClick={() => togglePostModal(value.id)}>
                                                    <FiCheckCircle color="#44A756" size={30} />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                            :null
                        })}
                    </table>

                </div>
            </div>
            )}
            {showPostModal && (
                <ModalRegistrar conteudo={detail} close={togglePostModal} />
            )}
        </div>
    )
}