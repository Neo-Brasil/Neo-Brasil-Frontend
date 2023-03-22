import { FiPlusCircle } from "react-icons/fi"

export default function Titulo() {
    return (
        <div>

            <h3>Dados do plano</h3>

            <div className="inputs">

                <div class="opcoes">
                    <select required>
                        <option value="0">Tipos de títulos</option>
                        <option value="1">Cliente Bronze</option>
                        <option value="1">Cliente Silver</option>
                        <option value="1">Cliente Gold</option>
                    </select>
                </div>

                <div class="campo">
                    <input class="data" type="nome" required />
                    <span>Preço</span>
                </div>

                <div class="campo">
                    <input class="data" type="date" required />
                    <span>Data</span>
                </div>

                <div className='add'>
                    {/* <button onClick={() => addFormField()}> */}
                    <a>
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