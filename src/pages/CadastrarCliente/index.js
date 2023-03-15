import './CadastrarCliente.css';
import Header from "../../components/Header";
import { IMaskInput } from "react-imask";

export default function CadastrarCliente() {
    return (
        <div>
            <Header />
            <div className="content">

                <h1>Cadastro de cliente</h1>

                <div className='progress-bar'>

                </div>

                <div className='inputs'>
                    <div class="campo">
                        <input type="nome" required />
                        <span>Nome completo</span>
                    </div>
                    <div class="campo">
                        <IMaskInput mask="000.000.000-00"/>
                        <span>CPF</span>
                    </div>
                    <div class="campo">
                        <input type="nome" required />
                        <span>Email</span>
                    </div>

                    <div className='button-green'>
                        <button>PRÓXIMO</button>
                    </div>

                </div>
            </div>
        </div>

    )
}