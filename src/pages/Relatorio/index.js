import './Relatorio.css';
import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import Axios from "axios";
import { toast } from 'react-toastify';
import { MdSearch } from "react-icons/md";

export default function Relatorio() {
    const [cliente, setCliente] = useState([]);
    const [valorRecebido, setValorRecebido] = useState(0);
    const [expectativaValor, setExpectativaValor] = useState(0);
    const [valorCreditar, setValorCreditar] = useState(0);

    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const [total, setTotal] = useState();

    localStorage.removeItem('cadastro')
    localStorage.removeItem('crudUser')
    localStorage.removeItem('registra')
    localStorage.removeItem('crudCli')
    localStorage.removeItem('aprova')
    localStorage.setItem('relatorio', 'relatorio-white')

    useEffect(() => {
        Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`).then((resp) => {
            var dados = resp.data
            var novoDados = []
            var credita = 0
            var recebe = 0
            var expectativa = 0

            let total_count = 0;
            for (var k in dados) {
                total_count = total_count + 1;

                var dado = dados[k]
                var titulo = dado.titulos[0]
                var novoDado = []
                novoDado.push(dado.id)
                novoDado.push(dado.nome);
                novoDado.push(dado.cpf);
                novoDado.push(dado.email);
                novoDado.push(titulo)
                novoDados.push(novoDado)

                if (titulo.situacao === "Creditado") {
                    recebe += titulo.ultimo_valor_pago
                }
                if (titulo.situacao === "Pago") {
                    credita += titulo.ultimo_valor_pago
                }
                expectativa += titulo.preco
            }
            setValorRecebido(recebe)
            setValorCreditar(credita)
            setExpectativaValor(expectativa)
            setCliente(novoDados);

            setTotal(total_count);
        });
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        if (dataInicio !== "" && dataFim !== "") {
            console.log("oi")
        } else {
            toast.warning('Preencha ambos os campos!')
        }
    }

    return (
        <div>
            <Header />

            {cliente.lenght === 0 ? (

                <div className='none'>
                    <p>Nenhum relatório encontrado...</p>
                </div>

            ) : (

                <div className="content">

                    <h1>Relatório de pagamento</h1>

                    <form onSubmit={handleSubmit} id='formFilter'>

                        <div className='filters'>
                            <div className='filter'>
                                <p>Início</p>
                                <input type="date" className="fixo" required
                                    value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                            </div>

                            <div className='filter'>
                                <p>Fim</p>
                                <input type="date" className="fixo" required
                                    value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                            </div>

                            <div className='button-color'>
                                <button className='button-orange' id='orange2'
                                    onClick={() => handleSubmit()}
                                ><MdSearch size={30} /></button>
                            </div>
                        </div>
                    </form>

                    <div className='container-table' id='values'>

                        <details>
                            <summary id='result'>Ver resultado de valores...</summary>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Expectativa de valor</th>
                                        <th scope="col">Valor faltante</th>
                                        <th scope="col">Valor recebido</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td data-label="Expectativa">R$ {expectativaValor}</td>
                                        <td data-label="Faltante">R$ {valorRecebido}</td>
                                        <td data-label="Recebido">R$ {valorCreditar}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </details>
                    </div>

                    {/* <div className='container-table' id='values'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Expectativa de valor</td>
                                    <td>R$ {expectativaValor}</td>
                                </tr>
                                <tr>
                                    <td>Valor faltante</td>
                                    <td>R$ {valorRecebido}</td>
                                </tr>
                                <tr>
                                    <td>Valor recebido</td>
                                    <td>R$ {valorCreditar}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}

                    <div className='container-table'>

                        <i>Total: {total}</i>

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
                                            <p><b>Título do plano: </b>{value[4].tipo}</p>
                                            <p><b>Preço: </b>{value[4].preco}</p>
                                            <p><b>Data de vencimento: </b>{value[4].data_vencimento}</p>
                                            <p><b>Data de pagamento: </b>{value[4].data_pagamento}</p>
                                            <p><b>Dias para creditar: </b>{value[4].tempo_credito}</p>
                                        </div>
                                    </div>

                                </details>

                                : null
                        })}
                    </div>
                </div>
            )}
        </div>

    )
}