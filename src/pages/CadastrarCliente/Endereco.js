import React, { useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';

export default function Endereco({ onButtonClick }) {
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    //const [num, setNum] = useState('');
    const [city, setCity] = useState('');
    const [estado, setEstado] = useState('');
    const [comp, setComp] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        if (rua !== '') {
            return  onButtonClick("pagethree")
        } else {
            toast.error('Preencha os campos corretamente')
        }

    }

    return (
        <div>

            <h3>Dados de endereço</h3>

            <form onSubmit={handleSubmit}>

            <div className="inputs">

                <div class="campo">
                    <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} required />
                    <span>CEP</span>
                </div>
                <div class="campo">
                    <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} required />
                    <span>Logradouro</span>
                </div>
                <div class="campo">
                    <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                    <span>Bairro</span>
                </div>
                <div class="campo row">
                    <div className="cidade">
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                        <span>Localidade</span>
                    </div>

                    <div className="uf">
                        <input type="text" maxLength='2' value={estado} onChange={(e) => setEstado(e.target.value)} required />
                        <span>UF</span>
                    </div>
                </div>

                <div class="campo">
                    <input type="text" value={comp} onChange={(e) => setComp(e.target.value)} required />
                    <span>Complemento</span>
                </div>

                <div className='button-color'>
                    <button className='button-green'
                        onClick={() => handleSubmit()}>
                        PRÓXIMO</button>
                </div>
            </div>

            </form>

        </div>

    )
}