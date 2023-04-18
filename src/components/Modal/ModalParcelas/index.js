import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { FiCheckCircle } from "react-icons/fi";

export default function ModalParcelas({ close }) {
   
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

                                            <td data-label="MêsPago">{value.data_vencimento}</td>

                                            <td data-label="Status">{value.situacao}</td>

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