import './Relatorio.css';
import Header from "../../components/Header/index";

import { useState, useEffect } from 'react';
import Axios from "axios";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";

import { MdSearch, MdSend } from "react-icons/md";
import { FiLayers, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaSort } from "react-icons/fa";

import ModalRelatorio from '../../components/Modal/Relatorio';
import VerificaToken from '../../script/verificaToken';

export default function Relatorio() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    const [clientes, setClientes] = useState([]);
    const [valorRecebido, setValorRecebido] = useState(0);
    const [valorReceber, setValorReceber] = useState(0);
    const [valorCreditar, setValorCreditar] = useState(0);
    const [intervalo, setIntervalo] = useState("Todas");

    const [dataInicio, setDataInicio] = useState('0000-00-00');
    const [dataFim, setDataFim] = useState('0000-00-00');

    const initialData = [
        { id: 1, name: 'João Doe', age: 25 },
        { id: 2, name: 'Zacariah', age: 30 },
        { id: 3, name: 'Bob Johnson', age: 35 },
        { id: 4, name: 'Jane Doe', age: 25 },
        { id: 5, name: 'Amanda Smith', age: 30 },
        { id: 6, name: 'Vini Junior', age: 35 },
        { id: 11, name: 'Carlos Silva', age: 25 },
        { id: 21, name: 'Julio Carvalho', age: 30 },
        { id: 31, name: 'Elen Watson', age: 35 },
        { id: 41, name: 'Lucas Barreto', age: 25 },
        { id: 51, name: 'Julia Simões', age: 30 },
        { id: 61, name: 'Gerson Noronha', age: 35 }
    ];

    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
                    let receber = dado.receber
                    let recebido = dado.recebido
                    let creditar = dado.creditar

                    receber = parseFloat(receber).toFixed(2);
                    recebido = parseFloat(recebido).toFixed(2);
                    creditar = parseFloat(creditar).toFixed(2);

                    receber = receber.toString().replace(".", ",");
                    recebido = recebido.toString().replace(".", ",");
                    creditar = creditar.toString().replace(".", ",")

                    setValorReceber(receber);
                    setValorRecebido(recebido);
                    setValorCreditar(creditar);
                });
            }
        });
    }

    useEffect(() => {
        listagemPrestacoes();
        Axios.get(`http://localhost:9080/listagem/clientes`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            let cliente = resp.data;
            for (let k in cliente) {
                cliente[k].titulos[0].preco = cliente[k].titulos[0].preco.toFixed(2).toString().replace(".", ",");
            }
            setClientes(cliente)
        });
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        listagemPrestacoes();
    }

    function togglePostModal(id_titulo) {
        localStorage.setItem("id_titulo", id_titulo)
        localStorage.setItem("dataInicio", dataInicio)
        localStorage.setItem("dataFim", dataFim)
        localStorage.setItem("intervalo", intervalo)
        setShowPostModal(!showPostModal);
        setDetail();
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

            <h1>Relatório</h1>

            <form onSubmit={handleSubmit} id='formFilter'>

            <div className='search'>
                <input type='text' placeholder='Pesquisar cliente'></input>
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
                        <button>ENVIAR</button>
                        <MdSend size={22} color='F79736' style={{ marginLeft: '5px' }} />
                    </div>

                </details>

                <details>
                    <summary>Filtro de situação</summary>

                    <div className='filter'>
                        <select onChange={(e) => setIntervalo(e.target.value)} required>
                            <option value="Todas">Todas as situações</option>
                            <option value="Vencimento">Vencimento</option>
                            <option value="Pagamento">Pagamento</option>
                            <option value="Crédito">Crédito</option>
                        </select>
                    </div>

                    {/* <div className='filter'>
                        <input type="radio" value="HTML"></input>
                            <label for="html">HTML</label>
                        <input type="radio" value="CSS"></input>
                            <label for="css">CSS</label>
                        <input type="radio" value="JavaScript"></input>
                            <label for="javascript">JavaScript</label>
                    </div> */}
                </details>
            </div>
            </form>

            <div className='container-table'>
                <table>
                    <thead>
                        <tr>
                            <th scope="col"><FaSort size={12}/>PRESTAÇÃO</th>
                            <th onClick={() => handleSort('name')} scope="col">CLIENTE</th>
                            <th onClick={() => handleSort('age')} scope="col">VENCIMENTO</th>
                            <th scope="col">PAGAMENTO</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">PREÇO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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

                    {/* <div className='container-table' id='relatorio-table'>
                        <table>
                            <thead>
                                <tr>
                                    
                                </tr>
                            </thead>

                            {typeof clientes !== 'undefined' && clientes.map((value) => {
                                return !value.envio ?

                                    <tbody>
                                        <tr className='noMargin'>
                                            <td data-label="Nome">{value.nome}</td>

                                            <td data-label="Prestações">
                                                <Link className="action" onClick={() => togglePostModal(value.titulos[0].id)}>
                                                    <FiLayers color="#F79736" size={30} />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                            : null
                            })}
                        </table>
                    </div> */}

                    <div className='financialArea'>
                        <div className='values'>
                            <i>Total em aberto: { }</i>
                            <i>Total atrasado: { }</i>
                        </div>

                        <div className='values'>
                            <i>Total creditado: { }</i>
                            <i>Total pago: { }</i>
                        </div>

                        <div className='values'>
                            <i>Total: { }</i>
                        </div>
                    </div>

                    {/* <tbody>
                                    <tr id='nostyleinput' className='noMargin'>
                                        <td data-label="Valor à receber">
                                            <MaskedInput mask={currencyMask} className="nostyleinput"
                                                type="text" placeholder="R$" value={valorReceber} disabled /></td>
                                        <td data-label="Valor recebido">
                                            <MaskedInput mask={currencyMask} className="nostyleinput"
                                                type="text" placeholder="R$" value={valorRecebido} disabled /></td>
                                        <td data-label="Valor à creditar">
                                            <MaskedInput mask={currencyMask} className="nostyleinput"
                                                type="text" placeholder="R$" value={valorCreditar} disabled /></td>
                                    </tr>
                                </tbody> */}

                </div>
            )}
            {showPostModal && (
                <ModalRelatorio conteudo={detail} close={togglePostModal} />
            )}
        </div>

    )
}
