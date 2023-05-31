import React, { useEffect, useState } from "react";
import './EditarTitulo.css';
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import VerificaToken from '../../script/verificaToken';
import { FiEdit3, FiTrash2, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import ModalEditarTitulo from "../../components/Modal/EditarTitulo";

export default function Titulo({ onButtonClick }) {
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [dataVenc, setDataVenc] = useState('');
    const [prazo, setPrazo] = useState('');
    const  id_usuario = localStorage.getItem("id_usuario");

    const [titulosP, setTitulosp] = useState([]);
    const [tituloP, setTitulop] = useState('');
    const [precoP, setPrecop] = useState('');
    const [dataVencP, setDataVencp] = useState('');
    const [prazoP, setPrazop] = useState('');

    const [id_titulo, setId] = useState('');
    const {id} = useParams();
    
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

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

    function togglePostModal(id) {
        console.log(id);
        localStorage.setItem("id_titulo", id);
        setShowPostModal(!showPostModal);
        setDetail();
    }

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            let cliente = resp.data;
            let titulos = cliente.titulos;
            for(let k in titulos){
                titulos[k].index = k
            }
            setTitulosp(cliente.titulos)
        });
      }, [])

    function handleSubmit(e) {
        e.preventDefault()
        var endereco = localStorage.getItem("endereco");
        endereco = JSON.parse(endereco);

        var nome = localStorage.getItem("nome");
        var cpf = localStorage.getItem("cpf");
        var email = localStorage.getItem("email");

        Axios.put(`http://localhost:9080/atualizar/${id_usuario}` , {
            id: id,
            nome: nome,
            cpf: cpf,
            email: email,
            endereco: endereco
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((res) => {
            console.log(res)
        })
        localStorage.removeItem("nome");
        localStorage.removeItem('cpf');
        localStorage.removeItem('email');
        localStorage.removeItem('endereco');
        
        localStorage.setItem("update", "1")
        window.location.href = '/clientes_cadastrados'
    }

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 1;
    const totalPages = Math.ceil(titulosP.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = titulosP.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div>

            <h3>Dados dos planos</h3>

            <div className="container-table" id="titulos-table">

                <table>
                    <thead>
                        <tr>
                            <th scope="col">Título</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Vencimento</th>
                            <th scope="col">Prazo</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Deletar</th>
                        </tr>
                    </thead>

                    {typeof titulosP !== 'undefined' && titulosP.map((titulo) => (
                        <tbody>
                            <tr>
                                <td data-label="Título">{titulo.titulo}</td>
                                <td data-label="Preço">{titulo.preco}</td>
                                <td data-label="Vencimento"><input type='date' className='noInput' 
                                    value={titulo.data_vencimento}></input></td>
                                <td data-label="Prazo">{titulo.tempo_credito}</td>
                                <td data-label="Editar">
                                    <Link className="action" onClick={() => togglePostModal(titulo.id)}>
                                    <FiEdit3 color="#000"/></Link>
                                </td>
                                <td data-label="Deletar">
                                    <Link className="action" onClick={() => togglePostModal2(titulo.id)}>
                                    <FiTrash2 color="#000"/></Link>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            {showPostModal && (
                <ModalEditarTitulo conteudo={detail} close={togglePostModal} />
            )}

            {showPostModal && (
                <ModalEditarTitulo conteudo={detail} close={togglePostModal} />
            )}
        </div>
        // <div>

        //     <h3>Dados do plano</h3>

        //     <form onSubmit={handleSubmit}>
        //         {currentItems.map((item) => (
        //             <div className="inputs">
        //             <div className="pagination">
        //                 <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1}>
        //                     <FiChevronLeft />
        //                 </button>

        //                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        //                     <button type="button"
        //                         key={page}
        //                         onClick={() => handlePageChange(page)}
        //                         className={currentPage === page ? 'active' : ''}
        //                     >
        //                         {page}
        //                     </button>
        //                 ))}

        //                 <button type="button" onClick={goToNextPage} disabled={currentPage === totalPages}>
        //                     <FiChevronRight />
        //                 </button>
        //             </div>
        //             <div className='plano'>
        //                 <div class="campo">
        //                     <input class="fixo" type="text" placeholder={item.titulo} 
        //                     value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        //                     <span>Título</span>
        //                 </div>

        //                 <div class="campo">
        //                     <MaskedInput mask={currencyMask} id="preco" className="fixo" type="text" placeholder={"R$ "+item.preco}
        //                         value={preco} onChange={(e) => setPreco(e.target.value)} />
        //                     <span>Preço</span>
        //                 </div>
        //                 <div class="campo">
        //                     <input class="fixo" type="date" placeholder={item.data_vencimento} 
        //                     value={dataVenc} onChange={(e) => setDataVenc(e.target.value)} />
        //                     <span>Data de vencimento</span>
        //                 </div>

        //                 <div class="campo">
        //                     <input class="fixo" id="prazo"
        //                         type="number" min={0} max={5} placeholder={item.tempo_credito} 
        //                         value={prazo} onChange={(e) => setPrazo(e.target.value)} />
        //                     <span>Prazo de crédito (em dias)</span>
        //                 </div>
        //                 <div className='button-color'>
        //                     <button className='button-green' 
        //                     onClick={() => handleSubmit()}>
        //                     ENVIAR</button>
        //                 </div>
        //             </div>
        //             </div>
        //         ))}
        //     </form>
        // </div>
    )
}