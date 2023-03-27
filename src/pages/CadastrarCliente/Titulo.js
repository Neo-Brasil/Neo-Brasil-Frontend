import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi"
import Axios from "axios";
import { toast } from 'react-toastify';

export default function Titulo() {
    const [titulos, setTitulos] = useState('');
    const [preco, setPreco] = useState('');
    const [dataVenc, setDataVenc] = useState('');
    const [prazo, setPrazo] = useState('');

    const [formValue, setFormValue] = useState([{ tituloNovo: "" }])

    let handleChange = (i, e) => {
        let newFormValue = [...formValue];
        newFormValue[i][e.target.name] = e.target.value;
        setFormValue(newFormValue);
    }

    let addFormField = () => {
        setFormValue([...formValue, { tituloNovo: "" }])
    }

    let removeFormField = (i) => {
        let newFormValue = [...formValue];
        newFormValue.splice(i, 1);
        setFormValue(newFormValue)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (0 == "") {
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

                    {formValue.map((e, index) => (
                        <>

                            <div className='plano' key={index}>

                                <div class="opcoes">
                                    <select required>
                                        <option value="0">Tipos de títulos</option>
                                        <option value="1">Cliente Bronze</option>
                                        <option value="1">Cliente Silver</option>
                                        <option value="1">Cliente Gold</option>
                                    </select>
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

                                {index ?
                                    <div className='button-color'>
                                        <button className='button-red-light' onClick={() => removeFormField(index)}>REMOVER</button>
                                    </div>
                                    : null}
                            </div>

                        </>
                    ))}

                    <div className='add'>
                        <a onClick={() => addFormField()} >
                            <FiPlusCircle size={25} />
                        </a>
                    </div>

                    <div className='button-color'>
                        <button className='button-green' 
                            onClick={() => handleSubmit()}>
                            ENVIAR</button>
                    </div>
                </div>
            </form>
        </div>
    )
}