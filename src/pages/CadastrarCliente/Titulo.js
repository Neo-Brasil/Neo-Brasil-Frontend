import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi"
import Axios from "axios";
import { toast } from 'react-toastify';

export default function Titulo() {
    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [dataVenc, setDataVenc] = useState('');
    const [prazo, setPrazo] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        if (0 == true) {
            var titulo =  {
                titulo: titulo,
                preco: preco,
                vencimento: dataVenc,
                credito: prazo
            }
            localStorage.setItem("titulo", JSON.stringify(titulo));

            var cliente = localStorage.getItem("cliente");
            var endereco = localStorage.getItem("endereco");
            var titulo = localStorage.getItem("titulo");
            cliente = JSON.parse(cliente);
            endereco = JSON.parse(endereco);
            titulo = JSON.parse(titulo);
            console.log(cliente,endereco,titulo);

            Axios.post("http://localhost:9080/cadastro/cliente" , {
                cliente: cliente,
                endereco: endereco,
                titulo: titulo
            } ).then((res) => {
                console.log(res)
            })

            toast.warning("Selecione o tipo de título")
        } else {
            toast.sucess('Cadastrado com sucesso!')
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