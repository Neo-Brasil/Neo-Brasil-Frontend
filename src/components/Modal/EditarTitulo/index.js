import React, { useState, useEffect } from 'react';
import Axios from "axios";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import { FiArrowLeft } from 'react-icons/fi';
import VerificaToken from '../../../script/verificaToken';
import { useParams } from 'react-router-dom';

export default function ModalEditarTitulo({ close }) {
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [dataVenc, setDataVenc] = useState('');
    const [prazo, setPrazo] = useState('');
    const id_usuario = localStorage.getItem("id_usuario");
    const id_titulo = localStorage.getItem("id_titulo")
    const { id } = useParams();

    const [tituloP, setTitulop] = useState('');
    const [precoP, setPrecop] = useState('');
    const [dataVencP, setDataVencp] = useState('');
    const [prazoP, setPrazop] = useState('');

    const currencyMask = createNumberMask({
        prefix: 'R$ ', suffix: '',
        includeThousandsSeparator: true, thousandsSeparatorSymbol: '.',
        allowDecimal: false, decimalSymbol: ',', decimalLimit: 2,
        integerLimit: 13, requireDecimal: true,
        allowNegative: false, allowLeadingZeroes: false
    });

    
    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/titulos/${id_titulo}`, {
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
      }, []);      

    function handleSubmit() {
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
        localStorage.setItem("chave", "ok")
        close()
    }

    return (
        <div className="modal">
            {titulo.lenght === 0 ? (
                <div className='none'>
                    <p>Não foi encontrado...</p>
                </div>
            ) : (
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiArrowLeft color="#000" size={25} />
                    </button>

                    <p id="nome-ver-editar">Editar título</p>

                    <div className='detalhes-ver-editar'>
                        <div className='inputs' style={{marginTop:"20px"}}>
                            
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
                            </div>

                        </div>
                    </div>

                    <div className='button-color' style={{marginBottom:"0"}} onClick={() => handleSubmit()}>
                        <button className='button-green'>SALVAR</button>
                    </div>

                </div>
            )}
        </div>
    )
}