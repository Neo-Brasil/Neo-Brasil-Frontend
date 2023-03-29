import React, { useState } from "react";
import './ModalRegistrar.css';
import { FiArrowLeft } from 'react-icons/fi';

export default function ModalRegistrar({ close }) {
    const [valorPago, setValorPago] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');

    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                    <FiArrowLeft color="#000" size={25} />
                </button>

                <p id="nome-registro">Nome</p>

                <div className='detalhes-registro'>
                    <div className="column">
                        <b>Tipo de título: </b>
                        <p>Cliente Bronze</p>
                        <b>Preço: </b>
                        <p>R$50,00</p>

                    </div>

                    <div className="column">
                        <b>Valor pago: </b>
                        <input className="input-modal" placeholder="R$" type="number" min={49} required
                            value={valorPago} onChange={(e) => setValorPago(e.target.value)} />
                    
                        <b>Data de pagamento: </b>
                        <input className="input-modal" type="date" required
                            value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)} />
                    </div>

                </div>

                <div className='button-color'>
                    <button className='button-green-modal'>REGISTRAR</button>
                </div>

            </div>
        </div>
    )
}