import './Login.css';
import logo from '../../assets/logo-transparent.png';


export default function Login() {
    return (
        <div>
            <div className="login">
                <div className='logo'>
                    <img src={logo} alt="logo com uma folhagem e escrita Neo-Brasil" />
                </div>

                <div className='logar'>

                    <h2 className='signIn'>Faça login</h2>

                    <div class="campo">
                        <input type="nome" required />
                        <span>Email</span>
                    </div>
                    <div class="campo">
                        <input type="nome" required />
                        <span>Senha</span>
                    </div>

                    <div className='button-color'>
                        <button className='button-white'>PRÓXIMO</button>
                    </div>
                </div>


            </div>
        </div>

    )
}