import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { MdSearch, MdSend } from 'react-icons/md';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaSort } from 'react-icons/fa';
import MaskedInput from "react-text-mask";
import { createNumberMask } from 'text-mask-addons';

import './Relatorio.css';
import Header from '../../components/Header';
import VerificaToken from '../../script/verificaToken';

export default function Relatorio() {
  const [valorCreditado, setValorCreditado] = useState(0);
  const [valorPago, setValorPago] = useState(0);
  const [valorEmAberto, setValorEmAberto] = useState(0);
  const [valorAtrasado, setValorAtrasado] = useState(0);

  const [intervalo, setIntervalo] = useState('Todas');
  const [dataInicio, setDataInicio] = useState('0000-00-00');
  const [dataFim, setDataFim] = useState('0000-00-00');

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');

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
    listagemPrestacoes();
    listagemClientes();
  }, []);

  function listagemClientes() {
    Axios.get(`http://localhost:9080/listagem/clientes`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    }).catch(function (error) {
      VerificaToken(error);
    }).then((resp) => {
      let clientes = resp.data;
      let prestacoes_var = [];
  
      const promises = clientes.map((cliente) => {
        cliente.titulos[0].preco = cliente.titulos[0].preco.toFixed(2).toString().replace(".", ",");
        return Promise.all(cliente.titulos.map((titulo) => {
          return Axios.get(`http://localhost:9080/listagem/titulo_prestacoes/${titulo.id}/periodo/${dataInicio}/${dataFim}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }).catch(function (error) {
            VerificaToken(error);
          }).then((resp) => {
            var prestacoesDado = resp.data;
            prestacoesDado.forEach((prestacao) => {
              if ((intervalo === "Todas") ||
                  (intervalo === "Vencimento" && (prestacao.situacao === "Em aberto" || prestacao.situacao === "Inadimplente")) ||
                  (intervalo === "Pagamento" && prestacao.situacao === "Pago") ||
                  (intervalo === "Crédito" && prestacao.situacao === "Creditado")) {
                let prestacaoNova = {
                  id: prestacao.id,
                  nome: cliente.nome,
                  titulo: titulo.titulo,
                  vencimento: prestacao.data_vencimento,
                  pagamento: prestacao.data_pagamento,
                  status: prestacao.situacao,
                  preco: "R$ " + parseFloat(prestacao.preco).toFixed(2).toString().replace(".", ",")
                };
                prestacoes_var.push(prestacaoNova);
              }
            });
          });
        }));
      });
  
      Promise.all(promises).then(() => {
        const filteredData = prestacoes_var.filter((prestacao) =>
          prestacao.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredData);
      });
    });
  }

    const itemsPerPage = 6;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setData([...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        }));
        setSortConfig({ key, direction });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    localStorage.removeItem('cadastro')
    localStorage.removeItem('crudUser')
    localStorage.removeItem('registra')
    localStorage.removeItem('crudCli')
    localStorage.removeItem('aprova')
    localStorage.setItem('relatorio', 'relatorio-white')

    function listagemPrestacoes() {
        Axios.get(`http://localhost:9080/listagem/titulos/atualizar_situacao`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            if (parseInt(dataFim.replace("-", "").replace("-", "")) < parseInt(dataInicio.replace("-", "").replace("-", ""))) {
                toast.warning('Data final não pode ser menor que a data inicial!')
            } else {
                Axios.get(`http://127.0.0.1:9080/listagem/prestacoes_valores/periodo/${dataInicio}/${dataFim}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).catch(function (error) {
                    VerificaToken(error)
                }).then((resp) => {
                    var dado = resp.data
                    let creditado = dado.creditado
                    let pago = dado.pago
                    let emAberto = dado.emAberto
                    let atrasado = dado.atrasado
                    let total = parseFloat(creditado) + parseFloat(pago) + parseFloat(emAberto) + parseFloat(atrasado)

                    creditado = parseFloat(creditado).toFixed(2);
                    pago = parseFloat(pago).toFixed(2);
                    emAberto = parseFloat(emAberto).toFixed(2);
                    atrasado = parseFloat(atrasado).toFixed(2);
                    total = parseFloat(total).toFixed(2);

                    creditado = creditado.toString().replace(".", ",");
                    pago = pago.toString().replace(".", ",");
                    emAberto = emAberto.toString().replace(".", ",");
                    atrasado = atrasado.toString().replace('.',',');
                    total = total.toString().replace('.',',');

                    setValorCreditado(creditado);
                    setValorPago(pago);
                    setValorEmAberto(emAberto);
                    setValorAtrasado(atrasado);
                });
            }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        listagemClientes()
        setSearchTerm('')
    }

    const buscarCliente = async () => {
        listagemClientes()
      };

    return (
        <div>
        <Header />

        {data.lenght === 0 ? (

            <div className='none'>
                <p>Nenhum relatório encontrado...</p>
            </div>

        ) : (

            <div className="content">

            <div className='relatorioTitle'>
                <h1>Relatório</h1></div>

            <form onSubmit={handleSubmit} id='formFilter'>

            <div className='search'>
                <input
                type="text"
                placeholder="Pesquisar cliente"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); listagemClientes();}}
                onBlur={buscarCliente}
                />
                <button className='button-orange'
                    onClick={() => handleSubmit()}
                ><MdSearch size={30} /></button>
            </div>

            <div className='filters'>
                <details>
                    <summary>Personalizar intervalo</summary>

                    <div className='filter'>
                        <p>Início</p>
                        <input type="date"
                            value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                    </div>

                    <div className='filter'>
                        <p>Fim</p>
                        <input type="date"
                            value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                    </div>

                    <div className='sendFilter'>
                        <button onClick={() => listagemClientes()}>ENVIAR</button>
                        <MdSend size={22} color='F79736' style={{ marginLeft: '5px' }} />
                    </div>

                </details>

                <details>
                    <summary>Filtro de situação</summary>
                    <div className='filter'>
                        <select onChange={(e) => setIntervalo(e.target.value)} onClick={() => listagemClientes()}>
                            <option value="Todas">Todas as situações</option>
                            <option value="Vencimento">Vencimento</option>
                            <option value="Pagamento">Pagamento</option>
                            <option value="Crédito">Crédito</option>
                        </select>
                    </div>
                </details>
            </div>
            </form>

            <div className='container-table' id='relatorio-table'>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')} scope="col">PRESTAÇÃO<FaSort size={12}/></th>
                            <th onClick={() => handleSort('nome')} scope="col" className='largura-dobrada'>CLIENTE<FaSort size={12}/></th>
                            <th onClick={() => handleSort('titulo')} scope="col">TÍTULO<FaSort size={12}/></th>
                            <th onClick={() => handleSort('vencimento')} scope="col">VENCIMENTO<FaSort size={12}/></th>
                            <th onClick={() => handleSort('pagamento')} scope="col">PAGAMENTO<FaSort size={12}/></th>
                            <th onClick={() => handleSort('id')} scope="col">STATUS<FaSort size={12}/></th>
                            <th onClick={() => handleSort('preco')} scope="col">PREÇO<FaSort size={12}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td className='largura-dobrada'>{item.nome}</td>
                                <td>{item.titulo}</td>
                                <td><input type='date' className='noInput' id='noInput'
                                    value={item.vencimento}></input></td>

                                {item.pagamento !== "0000-00-00" ? (
                                <td data-label="Pagamento">
                                    <input type='date' className='noInput' id='noInput'
                                    value={item.pagamento}></input></td>
                                ) : (
                                    <td data-label="Pagamento">-</td>
                                )}
                                <td>{item.status}</td>
                                <td id='nostyleinput'>{item.preco}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='infoFIltro'>

                {dataInicio !== "0000-00-00" && dataFim !== "0000-00-00"?(
                    <p className='intervalo'><b>Intervalo de datas: </b>
                    <input type='date' className='noInput' 
                        value={dataInicio}></input> 
                    à 
                    <input type='date' className='noInput' 
                        value={dataFim}></input>
                </p>
                ):(
                    <p className='intervalo'><b>Intervalo de datas: </b> Todas as datas</p>
                )}

                <p className='intervalo'><b>Situação: </b>{intervalo}</p>
                
                </div>

                <div className="pagination">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                        <FiChevronLeft />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    ))}

                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                        <FiChevronRight />
                    </button>
                </div>
                </div>
                    <div className='financialArea'>
                        <div className='values'>
                            <i>Total em aberto: <MaskedInput mask={currencyMask} 
                                className="nostyleinput" type="text" disabled
                                value={valorEmAberto.toString().replace(".", ",")}></MaskedInput>
                            </i>

                            <i>Total atrasado: <MaskedInput mask={currencyMask} 
                                className="nostyleinput" type="text" disabled
                                value={valorAtrasado.toString().replace(".", ",")}></MaskedInput>
                            </i>
                        </div>

                        <div className='values'>
                            <i>Total creditado: <MaskedInput mask={currencyMask} 
                                className="nostyleinput" type="text" disabled
                                value={valorCreditado.toString().replace(".", ",")}></MaskedInput>
                            </i>

                            <i>Total pago: <MaskedInput mask={currencyMask} 
                                className="nostyleinput" type="text" disabled
                                value={valorPago.toString().replace(".", ",")}></MaskedInput>
                            </i>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
