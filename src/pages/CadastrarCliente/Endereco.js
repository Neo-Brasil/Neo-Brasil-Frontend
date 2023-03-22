export default function Endereco() {
    return (
        <div>

            <h3>Dados de endereço</h3>

            <div className="inputs">

                <div class="campo">
                    <input type="nome" required />
                    <span>CEP</span>
                </div>
                <div class="campo">
                    <input type="nome" required />
                    <span>Logradouro</span>
                </div>
                <div class="campo">
                    <input type="nome" required />
                    <span>Bairro</span>
                </div>
                <div class="campo">
                    <input type="nome" required />
                    <span>Localidade</span>
                </div>
                <div class="campo">
                    <input type="nome" required />
                    <span>UF</span>
                </div>
                <div class="campo">
                    <input type="nome" required />
                    <span>Complemento</span>
                </div>

                <div className='button-color'>
                    <button className='button-green'>PRÓXIMO</button>
                </div>
            </div>

        </div>

    )
}