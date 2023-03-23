import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi"

export default function Titulo({ onButtonClick }) {
    const [formValue, setFormValue] = useState([{ escolas: "" }])


    let handleChange = (i, e) => {
        let newFormValue = [...formValue];
        newFormValue[i][e.target.name] = e.target.value;
        setFormValue(newFormValue);
    }

    let addFormField = () => {
        setFormValue([...formValue, { escolas: "" }])
    }

    let removeFormField = (i) => {
        let newFormValue = [...formValue];
        newFormValue.splice(i, 1);
        setFormValue(newFormValue)
    }
    return (
        <div>

            <h3>Dados do plano</h3>

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
                    <input class="fixo" type="nome" required />
                    <span>Preço</span>
                </div>

                <div class="campo">
                    <input class="fixo" type="date" required />
                    <span>Data de vencimento</span>
                </div>

                <div class="campo">
                    <input class="fixo" id="prazo"
                    type="number" min= {0} max={5} required />
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
                    <button className='button-green'>ENVIAR</button>
                </div>
            </div>
        </div>
    )
}