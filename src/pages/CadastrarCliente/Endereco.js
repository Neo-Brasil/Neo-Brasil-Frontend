import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { toast } from 'react-toastify';

export default function Endereco({ onButtonClick }) {
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [city, setCity] = useState('');
    const [estado, setEstado] = useState('');
    const [comp, setComp] = useState('');

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
          console.log(data);
          // register({ name: 'address', value: data.logradouro });
          setRua(data.logradouro);
          setBairro(data.bairro);
          setCity(data.localidade);
          setEstado(data.uf);
        }).catch((err) => toast.warning("CEP inválido"))
      }

    function handleSubmit(e) {
        e.preventDefault()
        if (rua !== '') {
            var endereco =  {
                cep: cep,
                numero: numero,
                logradouro: rua,
                bairro: bairro,
                localidade: city,
                uf: estado,
                complemento: comp
            }
            localStorage.setItem("endereco", JSON.stringify(endereco));
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

                <div className="campo">
                    <IMaskInput mask="00.000-000" className="fixo" maxLength="11" value={cep} onBlur={checkCEP} onChange={(e) => setCep(e.target.value)} required />
                    <span>CEP</span>
                </div>
                <div className="campo row">
                    <div className="endereco1">
                        <input type="text" className="fixo" value={rua} onChange={(e) => setRua(e.target.value)} required />
                        <span>Logradouro</span>
                    </div>

                    <div className="endereco2">
                        <input type="number" id="num" className="fixo" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                        <span>Número</span>
                    </div>
                </div>
                <div className="campo">
                    <input type="text" className="fixo" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                    <span>Bairro</span>
                </div>
                <div className="campo row">
                    <div className="endereco1">
                        <input type="text" className="fixo" value={city} onChange={(e) => setCity(e.target.value)} required />
                        <span>Localidade</span>
                    </div>

                    <div className="endereco2">
                        <input type="text" className="fixo" maxLength='2' value={estado} onChange={(e) => setEstado(e.target.value)} required />
                        <span>UF</span>
                    </div>
                </div>

                <div className="campo">
                    <input type="text" className="fixo" value={comp} onChange={(e) => setComp(e.target.value)} required />
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