import React, { useState } from "react";
import Axios from "axios";
import { cpf } from 'cpf-cnpj-validator';
import { toast } from 'react-toastify';

export default function Pessoal({ onButtonClick }) {
    const [nome, setNome] = useState('');
    const [cpfe, setCpf] = useState('');
    const [email, setEmail] = useState('');

    const checkCpf = (e) => {
        const cpfe = e.target.value.replace(/\D/g, '');
        if (cpf.isValid(cpfe) === false) {
            toast.warning("CPF invalido")
        }
    }    

    function handleSubmit(e) {
        e.preventDefault()

        if (cpf.isValid(cpfe) === true) {
            Axios.post("http://localhost:9080/cadastro/cliente" , {
                nome: nome,
                cpf: cpfe,
                email: email
            } ).then((res) => {
                console.log(res)
            })
            onButtonClick("pagetwo")
            console.log("sai")
            
        } else {
            toast.error('Preencha os campos corretamente')
        }
    }

    return (
        <div>
            <h2>Dados da identificação do cliente</h2>

            <form onSubmit={handleSubmit}>

            <div className='inputs'>
                <div className="campo">
                    <input type="text" className="fixo" maxLength="60" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <span>Nome completo</span>
                </div>
                <div className="campo">
                    <input type="number" id="cpf" className="fixo" maxLength="11" value={cpfe} onBlur={checkCpf} onChange={(e) => setCpf(e.target.value)} required />
                    <span>CPF</span>
                </div>
                <div className="campo">
                    <input type="email" className="fixo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <span>Email</span>
                </div>

                <div className='button-color'>
                    <button className='button-green'
                        onClick={() => handleSubmit()}
                    >PRÓXIMO</button>
                </div>

            </div>
            </form>
        </div>
    )
}