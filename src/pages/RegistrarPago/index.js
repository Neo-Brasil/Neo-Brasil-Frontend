import './RegistrarPago.css';
import Header from "../../components/Header";

import { Link } from 'react-router-dom';
import { MdRule } from "react-icons/md";

export default function RegistrarPago() {
    return (
        <div>
            <Header />
            <div className="content">

                <h1>Registro de pagamento</h1>

                <div className='container-table'>

                <table>
                        <thead>
                            <tr><th scope="col">Nome</th>
                                <th scope="col">Enviar registro</th>
                            </tr>
                        </thead>
                        </table>

                    <details>
                        <summary>
                            <table>
                                <tbody>
                                    <tr>
                                        <td data-label="Nome">Primeiro nome</td>

                                        <td data-label="Registrar">
                                            <Link>
                                                <MdRule color="#FDC727" size={35} />
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </summary>
                        
                        <div className='detalhes-registro'>
                            <p><b>Tipo de título: </b>Cliente Bronze</p>
                            <p><b>Preço: </b>R$50,00</p>
                        </div>
                        
                    </details>

                    <details>
                        <summary>
                            <table>
                                <tbody>
                                    <tr>
                                        <td data-label="Nome">Segundo nome</td>

                                        <td data-label="Registrar">
                                            <Link>
                                                <MdRule color="#FDC727" size={35} />
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </summary>

                        <div className='detalhes-registro'>
                            <p><b>Tipo de título: </b>Cliente Silver</p>
                            <p><b>Preço: </b>R$150,00</p>
                        </div>

                        <div className='detalhes-registro'>
                            <p><b>Tipo de título: </b>Cliente Gold</p>
                            <p><b>Preço: </b>R$200,00</p>
                        </div>

                    </details>

                </div>

                <div className='button-color'>
                    <button className='button-green'>REGISTRAR TODOS</button>
                </div>
            </div>
        </div>

    )
}