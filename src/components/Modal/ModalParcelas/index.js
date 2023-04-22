import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import "./ModalParcelas.css"

export default function ModalParcelas({ close }) {
   
    const [cliente, setCliente] = useState({});
    const [prestacoes, setPrestacoes] = useState();
    const id_titulo = localStorage.getItem("id_titulo"); 
    const dataInicio = localStorage.getItem("dataInicio"); 
    const dataFim = localStorage.getItem("dataFim"); 


    useEffect(() => {
        Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
          });
        Axios.get(`http://localhost:9080/listagem/titulo_prestacoes/${id_titulo}/periodo/${dataInicio}/${dataFim}`,{
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

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Mês de vencimento</th>
                                <th scope="col">Mês de pagamento</th>
                                <th scope="col">Status</th>
                                <th scope="col">Preço</th>
                            </tr>
                        </thead>
                        {typeof prestacoes !== 'undefined' && prestacoes.map((value) => {
                            return !value.envio ?
                                    <tbody>
                                        <tr>
                                            <td data-label="MêsVence">{value.data_vencimento}</td>

                                            <td data-label="MêsPago">{value.data_pagamento}</td>

                                            <td id={value.situacao} data-label="Status">{value.situacao}</td>

                                            <td data-label="Preço">{value.preco}</td>
                                        </tr>
                                    </tbody>
                            :null
                        })}
                    </table>

                </div>
            </div>
            )}
        </div>
    )
}