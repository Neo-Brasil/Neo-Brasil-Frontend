import React, { useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';

export default function Titulo() {
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [dataVenc, setDataVenc] = useState('');
    const [prazo, setPrazo] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        if (prazo != '') {
            var endereco = localStorage.getItem("endereco");
            endereco = JSON.parse(endereco);

            var nome = localStorage.getItem("nome");
            var cpf = localStorage.getItem("cpf");
            var email = localStorage.getItem("email");

            Axios.post("http://localhost:9080/cadastro/cliente" , {
                nome: nome,
                cpf: cpf,
                email: email,
                endereco: endereco,
                titulos: [
                    {
                        titulo:titulo,
                        preco:preco,
                        data_vencimento:dataVenc,
                        tempo_credito:prazo
                    }
                ]
            } ).then((res) => {
                console.log(res)
            })
            localStorage.clear();

            toast.sucess('Cadastrado com sucesso!')

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

                                <div class="campo">
                                    <input class="fixo" type="text" required 
                                    value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                    <span>Título</span>
                                </div>

                                <div class="campo">
                                    <input class="fixo" id="preco" type="number" required 
                                    value={preco} onChange={(e) => setPreco(e.target.value)} />
                                    <span>Preço</span>
                                </div>

                                <div class="campo">
                                    <input class="fixo" type="date" required 
                                    value={dataVenc} onChange={(e) => setDataVenc(e.target.value)} />
                                    <span>Data de vencimento</span>
                                </div>

                                <div class="campo">
                                    <input class="fixo" id="prazo"
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