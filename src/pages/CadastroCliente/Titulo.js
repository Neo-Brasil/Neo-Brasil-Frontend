import React, { useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import VerificaToken from '../../script/verificaToken';

export default function Titulo({ onButtonClick }) {
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [dataVenc, setDataVenc] = useState('');
    const [prazo, setPrazo] = useState('');  
    const id_usuario = localStorage.getItem("id_usuario");

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

    function handleSubmit(e) {
        e.preventDefault()
        if (prazo !== '') {
            var endereco = localStorage.getItem("endereco");
            endereco = JSON.parse(endereco);

            var nome = localStorage.getItem("nome");
            var cpf = localStorage.getItem("cpf");
            var email = localStorage.getItem("email");

            let valor = preco.replace('R$ ','').replace('.','')

            Axios.post(`http://localhost:9080/cadastro/cliente/${id_usuario}`, {
                nome: nome,
                cpf: cpf,
                email: email,
                endereco: endereco,
                titulos: [
                    {
                        titulo: titulo,
                        preco: parseFloat(preco.replace('R$ ','').replace('.','').replace('.','').replace('.','').replace('.','').replace(',','.')),
                        data_vencimento: dataVenc,
                        tempo_credito: prazo,
                        situacao: "Em aberto"
                    }
                ]
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
            }).catch(function (error) {
                VerificaToken(error)
            }).then((res) => {
                console.log(res)
            })            
            toast.success('Cadastrado com sucesso!')
            onButtonClick("pageone")

        } else {
            toast.error('Preencha os campos corretamente')
        }
    }

    return (
        <div>

            <h3>Dados do plano</h3>

            <form onSubmit={handleSubmit}>

                <div className="inputs">

                    <div className='plano'>

                        <div className="campo">
                            <input className="fixo" type="text" required
                                value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            <span>Título</span>
                        </div>

                        <div className="campo">
                            
                            <MaskedInput mask={currencyMask} id="preco" className="fixo" type="text" placeholder="R$" required
                                value={preco} onChange={(e) => setPreco(e.target.value)} />
                            <span>Preço</span>
                        </div>

                        <div className="campo">
                            <input className="fixo" type="date" required
                                value={dataVenc} onChange={(e) => setDataVenc(e.target.value)} />
                            <span>Data de vencimento</span>
                        </div>

                        <div className="campo">
                            <input className="fixo" id="prazo"
                                type="number" min={0} max={5} required
                                value={prazo} onChange={(e) => setPrazo(e.target.value)} />
                            <span>Prazo de crédito (em dias)</span>
                        </div>

                        <div className='button-color'>
                            <button className='button-green'
                                onClick={() => handleSubmit()}>
                                ENVIAR</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}