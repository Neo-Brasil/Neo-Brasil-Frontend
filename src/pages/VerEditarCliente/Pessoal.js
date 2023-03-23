export default function Pessoal({ onButtonClick}) {
    return (
        <div>
            <h2>Dados da identificação do cliente</h2>

            <div className='inputs'>
                <div class="campo">
                    <input class="fixo" type="nome" required />
                    <span>Nome completo</span>
                </div>
                <div class="campo">
                    <input class="fixo" type="nome" required />
                    <span>CPF</span>
                </div>
                <div class="campo">
                    <input class="fixo" type="nome" required />
                    <span>Email</span>
                </div>

                <div className='button-color'>
                    <button className='button-green' 
                    onClick={() => onButtonClick("pagetwo")}>
                        PRÓXIMO</button>
                </div>

            </div>
        </div>
    )
}