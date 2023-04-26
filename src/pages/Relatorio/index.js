import './Relatorio.css';
import Header from "../../components/Header/index.tsx";

import { useState, useEffect } from 'react';
import Axios from "axios";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

import { MdSearch } from "react-icons/md";
import { FiLayers } from "react-icons/fi";
import ModalParcelas from '../../components/Modal/ModalParcelas';

export default function Relatorio() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    
    const [clientes, setClientes] = useState([]);
    const [valorFaltante, setValorFaltante] = useState(0);
    const [expectativaValor, setExpectativaValor] = useState(0);
    const [valorRecebido, setValorRecebido] = useState(0);

    const [dataInicio, setDataInicio] = useState('0000-00-00');
    const [dataFim, setDataFim] = useState('0000-00-00');

    localStorage.removeItem('cadastro')
    localStorage.removeItem('crudUser')
    localStorage.removeItem('registra')
    localStorage.removeItem('crudCli')
    localStorage.removeItem('aprova')
    localStorage.setItem('relatorio', 'relatorio-white')

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
        Axios.get(`http://localhost:9080/listagem/clientes`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
            setClientes(resp.data)
        });
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        if (dataInicio == "" || dataFim == "") {
            toast.warning('Preencha ambos os campos!')
        }else{
            Axios.get(`http://127.0.0.1:9080/listagem/prestacoes_valores/periodo/${dataInicio}/${dataFim}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
            }).then((resp) => {
                var dado = resp.data
                let recebido = dado.recebido
                let faltante = dado.faltante
                let expectativa = dado.expectativa
                setValorRecebido(recebido.toString().replace(".",","));
                setValorFaltante(faltante.toString().replace(".",","));
                setExpectativaValor(expectativa.toString().replace(".",","));
              });
        }
    }

    function togglePostModal(id_titulo) {
        if(dataInicio == "" || dataFim == ""){
            toast.warning('Escolha um intervalo de datas!')
        }else{
            localStorage.setItem("id_titulo", id_titulo)
            localStorage.setItem("dataInicio", dataInicio)
            localStorage.setItem("dataFim", dataFim)
            setShowPostModal(!showPostModal);
            setDetail();
        }
    }

        return (
            <div>
                <Header />

                {clientes.lenght === 0 ? (

                    <div className='none'>
                        <p>Nenhum relatório encontrado...</p>
                    </div>

                ) : (

                    <div className="content">

                        <h1 id='tituloRelatorio'>Relatório de pagamento</h1>

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

                                <div className='filter'>
                                    <p>Intervalo</p>
                                    <select required>
                                        <option value="TODOS">Todas as opções</option>
                                        <option value="VENCIMENTO">Vencimento</option>
                                        <option value="PAGAMENTO">Pagamento</option>
                                        <option value="CREDITO">Crédito</option>
                                    </select>
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
                                            <th scope="col">Valor à creditar</th>
                                            <th scope="col">Valor recebido</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr id='nostyleinput'>
                                            <td data-label="Expectativa">
                                                <MaskedInput mask={currencyMask} className="nostyleinput" 
                                                type="text" placeholder="R$" value={expectativaValor} disabled /></td>
                                            <td data-label="Faltante">
                                                <MaskedInput mask={currencyMask} className="nostyleinput" 
                                                type="text" placeholder="R$" value={valorFaltante} disabled /></td>
                                            <td data-label="Recebido">
                                                <MaskedInput mask={currencyMask} className="nostyleinput" 
                                                type="text" placeholder="R$" value={valorRecebido} disabled /></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </details>
                        </div>

                        <div className='container-table'>

                            <table>
                                <thead>
                                    <tr><th scope="col">Nome</th>
                                        <th scope="col">Prestações</th>
                                    </tr>
                                </thead>
                            </table>

                            {typeof clientes !== 'undefined' && clientes.map((value) => {
                                return !value.envio ?

                                    <details>
                                        <summary>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td data-label="Nome">{value.nome}</td>

                                                        <td data-label="Prestações">
                                                            <Link className="action" onClick={() => togglePostModal(value.titulos[0].id)}>
                                                                <FiLayers color="#FDC727" size={30} />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </summary>

                                        <div className='detalhes-relatorio'>
                                            <div className='dados-titulo'>
                                                <p><b>Nome do cliente: </b>{value.nome}</p>
                                                <p><b>CPF: </b>{value.cpf}</p>
                                                <p><b>Email: </b>{value.email}</p>
                                            </div>

                                            <div className='dados-titulo'>
                                                <p><b>Título do plano: </b>{value.titulos[0].titulo}</p>
                                                <p><b>Preço: </b>{value.titulos[0].preco}</p>
                                                <p><b>Dias para creditar: </b>{value.titulos[0].tempo_credito}</p>
                                            </div>
                                        </div>

                                    </details>

                                    : null
                            })}
                        </div>
                    </div>
                )}
                {showPostModal && (
                    <ModalParcelas conteudo={detail} close={togglePostModal} />
                )}
            </div>

        )
    }
