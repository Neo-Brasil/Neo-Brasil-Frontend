export default function Endereco({ onButtonClick }) {
    return (
        <div>

            <h3>Dados de endereço</h3>

            <div className="inputs">

                <div class="campo">
                    <input class="fixo" type="nome" required />
                    <span>CEP</span>
                </div>
                <div class="campo">
                    <input class="fixo" type="nome" required />
                    <span>Logradouro</span>
                </div>
                <div class="campo">
                    <input class="fixo" type="nome" required />
                    <span>Bairro</span>
                </div>
                <div class="campo row">
                    <div className="cidade">
                        <input class="fixo" type="nome" required />
                        <span>Localidade</span>
                    </div>

                    <div className="uf">
                        <input class="fixo" type="nome" required />
                        <span>UF</span>
                    </div>
                </div>

                <div class="campo">
                    <input class="fixo" type="nome" required />
                    <span>Complemento</span>
                </div>

                <div className='button-color'>
                    <button className='button-green'
                        onClick={() => onButtonClick("pagethree")}>
                        PRÓXIMO</button>
                </div>
            </div>

        </div>

    )
}