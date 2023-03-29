import './Relatorio.css';
import Header from "../../components/Header";


export default function Relatorio() {
    return (
        <div>
            <Header />
            <div className="content">

                <h1>Relatório de pagamento</h1>

                <div className='cards'>
                    <div className='card'>
                        <p className='bold'>Expectativa de valor:</p>
                        <p className='alignEnd'>R$ 1000,00</p>
                    </div>

                    <div className='card'>
                        <p className='bold'>Valor recebido:</p>
                        <p className='alignEnd'>R$ 500,00</p>
                    </div>

                    <div className='card'>
                        <p className='bold'>Valor faltante:</p>
                        <p className='alignEnd'>R$ 500,00</p>
                    </div>

                </div>

                <div className='container-table'>

                <table>
                        <thead>
                            <tr><th scope="col">Nome</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        </table>

                    <details>
                        <summary>
                            <table>
                                <tbody>
                                    <tr>
                                        <td data-label="Nome">Primeiro nome</td>

                                        <td data-label="Status">
                                            <p className='inadimplente'>Inadimplente</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </summary>
                        
                        <div className='detalhes-relatorio'>
                            <div className='dados-titulo'>
                                <p><b>Tipo de título: </b>Cliente Bronze</p>
                                <p><b>Preço: </b>R$50,00</p>
                                <p><b>Data de vencimento: </b>09/03/2023</p>
                                <p><b>Data de pagamento: </b>05/03/2023</p>
                                <p><b>Data de crédito: </b>08/03/2023</p>
                            </div>
                        </div>
                        
                    </details>

                    <details>
                        <summary>
                            <table>
                                <tbody>
                                    <tr>
                                        <td data-label="Nome">Segundo nome</td>

                                        <td data-label="Status">
                                            <p className='pago'>Pago</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </summary>
                        
                        <div className='detalhes-relatorio'>
                            <div className='dados-titulo'>
                                <p><b>Tipo de título: </b>Cliente Bronze</p>
                                <p><b>Preço: </b>R$50,00</p>
                                <p><b>Data de vencimento: </b>09/03/2023</p>
                                <p><b>Data de pagamento: </b>05/03/2023</p>
                                <p><b>Data de crédito: </b>08/03/2023</p>
                            </div>

                            <div className='dados-titulo'>
                                <p><b>Tipo de título: </b>Cliente Silver</p>
                                <p><b>Preço: </b>R$150,00</p>
                                <p><b>Data de vencimento: </b>09/03/2023</p>
                                <p><b>Data de pagamento: </b>05/03/2023</p>
                                <p><b>Data de crédito: </b>08/03/2023</p>
                            </div>
                        </div>
                        
                    </details>

                    <details>
                        <summary>
                            <table>
                                <tbody>
                                    <tr>
                                        <td data-label="Nome">Terceiro nome</td>

                                        <td data-label="Status">
                                            <p className='pago'>Pago</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </summary>
                        
                        <div className='detalhes-relatorio'>
                            <div className='dados-titulo'>
                                <p><b>Tipo de título: </b>Cliente Bronze</p>
                                <p><b>Preço: </b>R$50,00</p>
                                <p><b>Data de vencimento: </b>09/03/2023</p>
                                <p><b>Data de pagamento: </b>05/03/2023</p>
                                <p><b>Data de crédito: </b>08/03/2023</p>
                            </div>

                            <div className='dados-titulo'>
                                <p><b>Tipo de título: </b>Cliente Silver</p>
                                <p><b>Preço: </b>R$150,00</p>
                                <p><b>Data de vencimento: </b>09/03/2023</p>
                                <p><b>Data de pagamento: </b>05/03/2023</p>
                                <p><b>Data de crédito: </b>08/03/2023</p>
                            </div>

                            <div className='dados-titulo'>
                                <p><b>Tipo de título: </b>Cliente Gold</p>
                                <p><b>Preço: </b>R$200,00</p>
                                <p><b>Data de vencimento: </b>09/03/2023</p>
                                <p><b>Data de pagamento: </b>05/03/2023</p>
                                <p><b>Data de crédito: </b>08/03/2023</p>
                            </div>
                        </div>
                        
                    </details>

                    


                </div>

            </div>
        </div>

    )
}