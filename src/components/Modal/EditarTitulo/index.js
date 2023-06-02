import React, { useState, useEffect } from 'react';
import Axios from "axios";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import { FiArrowLeft } from 'react-icons/fi';
import VerificaToken from '../../../script/verificaToken';

export default function ModalEditarTitulo({ close }) {
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [dataVenc, setDataVenc] = useState('');
    const [prazo, setPrazo] = useState('');

    const currencyMask = createNumberMask({
        prefix: 'R$ ', suffix: '',
        includeThousandsSeparator: true, thousandsSeparatorSymbol: '.',
        allowDecimal: false, decimalSymbol: ',', decimalLimit: 2,
        integerLimit: 13, requireDecimal: true,
        allowNegative: false, allowLeadingZeroes: false
    });

    function handleSubmit() {
        console.log('oi')
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
                                    <input class="fixo" type="text" placeholder={titulo.titulo}
                                        value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                    <span>Título</span>
                                </div>

                                <div class="campo">
                                    <MaskedInput mask={currencyMask} id="preco" className="fixo" type="text" placeholder={"R$ " + titulo.preco} value={preco} onChange={(e) => setPreco(e.target.value)} />
                                    <span>Preço</span>
                                </div>
                                <div class="campo">
                                    <input class="fixo" type="date" placeholder={titulo.data_vencimento}
                                        value={dataVenc} onChange={(e) => setDataVenc(e.target.value)} />
                                    <span>Data de vencimento</span>
                                </div>

                                <div class="campo">
                                    <input class="fixo" id="prazo"
                                        type="number" min={0} max={5} placeholder={titulo.tempo_credito}
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