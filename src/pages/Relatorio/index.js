import './Relatorio.css';
import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import ModalRegistrar from '../../components/ModalRegistrar';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { MdRule } from "react-icons/md";


export default function Relatorio() {
    const [cliente, setCliente] = useState([]);
    const [valorRecebido, setValorRecebido] = useState(0);
    const [expectativaValor, setExpectativaValor] = useState(0);
    const [valorCreditar, setValorCreditar] = useState(0);

    useEffect(() => {
        Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`).then((resp) => {
          var dados = resp.data
          var novoDados = []
          var credita = 0 
          var recebe = 0
          var expectativa = 0
          for(var k in dados){
            var dado = dados[k]
            var titulo = dado.titulos[0]
            var novoDado = []
            novoDado.push(dado.id)
            novoDado.push(dado.nome);
            novoDado.push(dado.cpf);
            novoDado.push(dado.email);
            novoDado.push(titulo)
            novoDados.push(novoDado)

            if(titulo.situacao == "Creditado"){
                recebe += titulo.ultimo_valor_pago
            }
            if(titulo.situacao == "Pago"){
                credita += titulo.ultimo_valor_pago
            }
            expectativa += titulo.preco
          }
          setValorRecebido(recebe)
          setValorCreditar(credita)
          setExpectativaValor(expectativa)
          setCliente(novoDados);
        });
      }, [])

    return (
        <div>
            <Header />
            {cliente.lenght === 0 ? (
                <div className='none'>
                <p>Nenhum dado encontrado...</p>
                <p>Não há relatório diário!</p>
                </div>
            ) : (
            <div className="content">

                <h1>Relatório de pagamento</h1>

                <div className='cards'>
                    <div className='card'>
                        <p className='bold'>Expectativa de valor:</p>
                        <p className='alignEnd'>R$ {expectativaValor}</p>
                    </div>

                    <div className='card'>
                        <p className='bold'>Valor recebido:</p>
                        <p className='alignEnd'>R$ {valorRecebido}</p>
                    </div>

                    <div className='card'>
                        <p className='bold'>Valor a creditar:</p>
                        <p className='alignEnd'>R$ {valorCreditar}</p>
                    </div>

                </div>

                <div className='container-table'>

                <table>
                        <thead>
                            <tr><th scope="col">Nome</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        </table>

                    {typeof cliente !== 'undefined' && cliente.map((value) => {
                            return !value.envio ?

                    <details>
                        <summary>
                            <table>
                                <tbody>
                                    <tr>
                                        <td data-label="Nome">{value[1]}</td>

                                        <td data-label="Status">
                                            <p className={value[4].situacao}>{value[4].situacao}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </summary>
                        
                        <div className='detalhes-relatorio'>
                            <div className='dados-titulo'>
                                <p><b>Tipo de título: </b>Cliente Bronze</p>
                                <p><b>Preço: </b>{value[4].preco}</p>
                                <p><b>Data de vencimento: </b>{value[4].data_vencimento}</p>
                                <p><b>Data de pagamento: </b>{value[4].data_pagamento}</p>
                                <p><b>Tempo de crédito: </b>{value[4].tempo_credito}</p>
                            </div>
                        </div>
                        
                    </details>

                    :null
                    })}
                </div>
            </div>
            )}
        </div>

    )
}