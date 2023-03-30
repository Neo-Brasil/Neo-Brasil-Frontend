import React, { useEffect, useState } from "react";
import Axios from "axios";
import { IMaskInput } from "react-imask";
import { cpf } from 'cpf-cnpj-validator';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

export default function Pessoal({ onButtonClick }) {
    const [nome, setNome] = useState('');
    const [cpfe, setCpf] = useState('');
    const [email, setEmail] = useState('');

    const [nomeP, setNomep] = useState('');
    const [cpfP, setCpfp] = useState('');
    const [emailP, setEmailp] = useState('');

    const {id} = useParams();

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/selecionar/cliente/${id}`).then((resp) => {
        let cliente = resp.data;
        setNomep(cliente.nome);
        setCpfp(cliente.cpf);
        setEmailp(cliente.email);
        });
      }, [])

    const checkCpf = (e) => {
        const cpfe = e.target.value.replace(/\D/g, '');
        if (cpf.isValid(cpfe) === false) {
            toast.warning("CPF inválido ou clicado e não editado")
        }
    }    

    function handleSubmit(e) {
        e.preventDefault()
        if(nome !== '' && cpfe !== '' && email !== ''){
            if (cpf.isValid(cpfe) === true) {
                localStorage.setItem("nome", nome);
                localStorage.setItem("cpf", cpfe);
                localStorage.setItem("email", email);

                onButtonClick("pagetwo")
            } else {
                toast.error('Campo foi clicado, mas não editado')
                toast.info("Atualize a página ou digite os dados novamente")
            }
        }else{
            localStorage.setItem("nome", nome);
            localStorage.setItem("email", email);
            //toast.info('Editado')
            onButtonClick("pagetwo")
        }
    }

    return (
        <div>
            <h2>Dados da identificação do cliente</h2>

            <form onSubmit={handleSubmit}>

            <div className='inputs'>
                <div className="campo">
                    <input type="text" placeholder={nomeP} className="fixo" maxLength="60" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <span>Nome completo</span>
                </div>
                <div className="campo">
                    <IMaskInput mask="000.000.000-00" placeholder={cpfP} maxLength='14' id="cpf" className="fixo" value={cpfe} onBlur={checkCpf} onChange={(e) => setCpf(e.target.value)} />
                    <span>CPF</span>
                </div>
                <div className="campo">
                    <input type="email" placeholder={emailP} className="fixo" value={email} onChange={(e) => setEmail(e.target.value)} />
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