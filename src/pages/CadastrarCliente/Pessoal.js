export default function Pessoal() {
    return (
        <div>
            <h2>Dados da identificação do cliente</h2>

            <div className='inputs'>
                <div class="campo">
                    <input type="nome" required />
                    <span>Nome completo</span>
                </div>
                <div class="campo">
                    <input type="nome" required />
                    <span>CPF</span>
                </div>
                <div class="campo">
                    <input type="nome" required />
                    <span>Email</span>
                </div>

                <div className='button-color'>
                    <button className='button-green'>PRÓXIMO</button>
                </div>

            </div>
        </div>
    )
}