import React, { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { cpf } from 'cpf-cnpj-validator';
import { toast } from 'react-toastify';
import VerificaToken from "../../script/verificaToken";
import Axios from "axios";

export default function Pessoal({ onButtonClick }) {   
    const [nome, setNome] = useState('');
    const [cpfe, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [clientes, setClientes] = useState();

    const checkCpf = (e) => {
        const cpfe = e.target.value.replace(/\D/g, '');
        if (cpf.isValid(cpfe) === false) {
            toast.warning("CPF inválido")
        }
    }    

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/clientes`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
        .catch(function (error) {
          VerificaToken(error);
        })
        .then((resp) => {
          setClientes(resp.data);
        });
      }, []);      

      function handleSubmit(e) {
        e.preventDefault();
        if (!cpf.isValid(cpfe)) {
          toast.error("Preencha os campos corretamente");
          return;
        }
        if (clientes.some((cliente) => cliente.email === email)) {
          toast.error("Email já usado");
          return;
        }
        if (clientes.some((cliente) => cliente.cpf === cpfe)) {
          toast.error("CPF já usado");
          return;
        }
        localStorage.setItem("nome", nome);
        localStorage.setItem("cpf", cpfe);
        localStorage.setItem("email", email);
        onButtonClick("pagetwo");
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
                    <IMaskInput mask="000.000.000-00" className="fixo" maxLength="14" value={cpfe} onBlur={checkCpf} onChange={(e) => setCpf(e.target.value)} required />
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