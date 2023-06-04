import React, { useEffect, useState } from "react";
import './EditarTitulo.css';
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import VerificaToken from '../../script/verificaToken';
import { FiEdit3, FiTrash2, FiPlusCircle, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import ModalEditarTitulo from "../../components/Modal/EditarTitulo";
import ModalDeletarTitulo from "../../components/Modal/DeletarTitulo";
import ModalCadastrarTitulo from "../../components/Modal/CadastrarTitulo";

export default function Titulo({ onButtonClick }) {
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [dataVenc, setDataVenc] = useState('');
    const [prazo, setPrazo] = useState('');
    const id_usuario = localStorage.getItem("id_usuario");

    const [titulosP, setTitulosp] = useState([]);
    const [tituloP, setTitulop] = useState('');
    const [precoP, setPrecop] = useState('');
    const [dataVencP, setDataVencp] = useState('');
    const [prazoP, setPrazop] = useState('');

    const [id_titulo, setId] = useState('');
    const { id } = useParams();

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    const [showPostModal2, setShowPostModal2] = useState(false);
    const [detail2, setDetail2] = useState();

    const [showPostModal3, setShowPostModal3] = useState(false);
    const [detail3, setDetail3] = useState();
    
    if(localStorage.getItem("chave") === "ok"){
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            let cliente = resp.data;
            let titulos = cliente.titulos;
            for (let k in titulos) {
                titulos[k].index = k
            }
            setTitulosp(cliente.titulos)
            if (titulos.length === 1) {
                Axios.get(`http://127.0.0.1:9080/selecionar/titulos/${titulos[0].id}`, {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                  })
                    .catch(function (error) {
                      VerificaToken(error);
                    })
                    .then((resp) => {
                      let titulo = resp.data;
                      console.log(titulo);
                      setTitulop(titulo.titulo);
                      setPrecop(titulo.preco);
                      setDataVenc(titulo.data_vencimento);
                      setPrazop(titulo.tempo_credito);
                    });
            }
        });
        localStorage.removeItem("chave")
    }

    const currencyMask = createNumberMask({
        prefix: 'R$ ', suffix: '',
        includeThousandsSeparator: true, thousandsSeparatorSymbol: '.',
        allowDecimal: false, decimalSymbol: ',', decimalLimit: 2,
        integerLimit: 13, requireDecimal: true,
        allowNegative: false, allowLeadingZeroes: false
    });

    function togglePostModal(id_titulo) {
        console.log(id);
        localStorage.setItem("id_titulo", id_titulo);
        localStorage.setItem("id_cliente", id);
        setShowPostModal(!showPostModal);
        setDetail();
    }

    function togglePostModal2(id) {
        console.log(id);
        localStorage.setItem("id_titulo", id);
        setShowPostModal2(!showPostModal2);
        setDetail2();
    }

    function togglePostModal3(id) {
        console.log(id);
        localStorage.setItem("id_titulo", id);
        setShowPostModal3(!showPostModal3);
        setDetail3();
    }

    function handleReturn(e) {
        return onButtonClick("pagetwo")
    }

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
          .then((resp) => {
            let cliente = resp.data;
            let titulos = cliente.titulos;
            for (let k in titulos) {
              titulos[k].index = k;
            }
            setTitulosp(cliente.titulos);
            if (titulos.length === 1) {
              setId(titulos[0].id);
              Axios.get(`http://127.0.0.1:9080/selecionar/titulos/${titulos[0].id}`, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
              })
                .then((resp) => {
                  let titulo = resp.data;
                  setTitulop(titulo.titulo);
                  setPrecop(titulo.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                  setDataVenc(titulo.data_vencimento);
                  setPrazop(titulo.tempo_credito);
                })
                .catch(function (error) {
                  VerificaToken(error);
                });
            }
          })
          .catch(function (error) {
            VerificaToken(error);
          });
      });      

    function handleSubmit() {
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

    function handleSubmit2() {
        Axios.put(`http://localhost:9080/atualizar/${id_usuario}`, {
            id: id,
            titulos: [
                {
                    id: id_titulo,
                    titulo: titulo,
                    preco:parseFloat(preco.replace('R$ ','').replace('.','').replace('.','').replace('.','').replace('.','').replace(',','.')),
                    tempo_credito:prazo
                }
            ] 
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((res) => {
            console.log(res)
        })
        handleSubmit()
    }

    return (
        <div>
            {titulosP === undefined ? (
                <p>Nenhum dado encontrado...</p>
            ) : (
                titulosP.length > 1 ? (
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
                                            <Link onClick={() => togglePostModal(titulo.id)}>
                                            <FiEdit3 color="#000"/></Link>
                                        </td>
                                        <td data-label="Deletar">
                                            <Link onClick={() => togglePostModal2(titulo.id)}>
                                            <FiTrash2 color="#000"/></Link>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
        
                    <div className="buttonsRow" style={{marginTop: "50px"}}>
                            <div className='button-color'>
                                <button className='button-green'
                                    onClick={() => handleReturn()}>
                                    VOLTAR</button>
                            </div>
        
                            <Link className="addTitulo" onClick={() => togglePostModal3(titulo.id)}>
                                <FiPlusCircle color="#44A754" size={35}/></Link>
        
                            <div className='button-color'>
                                <button className='button-green'
                                    onClick={() => handleSubmit()}>
                                    SALVAR</button>
                            </div>
                    </div>
        
                    {showPostModal && (
                        <ModalEditarTitulo conteudo={detail} close={togglePostModal} />
                    )}
        
                    {showPostModal2 && (
                        <ModalDeletarTitulo conteudo={detail2} close={togglePostModal2} />
                    )}
        
                    {showPostModal3 && (
                        <ModalCadastrarTitulo conteudo={detail3} close={togglePostModal3} />
                    )}
                    </div>
                ) : (
                    <div>

                    <h3>Dados do plano</h3>
        
                    <form onSubmit={handleSubmit} id="camposTitulo">
        
                        <div className='plano'>
                        <div class="campo">
                            <input class="fixo" type="text" placeholder={tituloP} 
                                value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            <span>Título</span>
                            </div>

                            <div class="campo">
                                <MaskedInput mask={currencyMask} id="preco" className="fixo" type="text" placeholder={"R$ "+precoP} value={preco} onChange={(e) => setPreco(e.target.value)} />
                                <span>Preço</span>
                            </div>
                            <div class="campo">
                                <input class="fixo" type="date"  placeholder={dataVencP} 
                                    value={dataVenc} onChange={(e) => setDataVenc(e.target.value)} />
                                <span>Data de vencimento</span>
                            </div>

                            <div class="campo">
                                <input class="fixo" id="prazo"
                                    type="number" min={0} max={5} placeholder={prazoP} 
                                    value={prazo} onChange={(e) => setPrazo(e.target.value)} />
                                <span>Prazo de crédito (em dias)</span>
                            </div>
                            <div className="buttonsRow">
                                <div className='button-color' id="button-add">
                                    <button className='button-green'
                                        onClick={() => handleReturn()}>
                                        VOLTAR</button>
                                </div>
        
                                <Link className="addTitulo" onClick={() => togglePostModal3(titulo.id)}>
                                    <FiPlusCircle color="#44A754" size={35} /></Link>
        
                                <div className='button-color' id="button-add">
                                    <button className='button-green'
                                        onClick={() => handleSubmit2()}>
                                        SALVAR</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {showPostModal3 && (
                        <ModalCadastrarTitulo conteudo={detail3} close={togglePostModal3} />
                    )}
                    </div>
                )
            )}
        </div>
      );    
}