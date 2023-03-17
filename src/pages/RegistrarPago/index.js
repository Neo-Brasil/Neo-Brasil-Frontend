import './RegistrarPago.css';
import Header from "../../components/Header";

import { Link } from 'react-router-dom';
import { MdLibraryAddCheck, 
    MdOutlineCheckBoxOutlineBlank, 
    MdOutlineCheckBox, MdRule } from "react-icons/md";

export default function RegistrarPago() {
    return (
        <div>
            <Header />
            <div className="content">

                <h1>Registro de pagamento</h1>

                <div className='container-table'>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <Link><MdLibraryAddCheck color='#44A754' size={30} /> </Link>
                                </th>
                                <th scope="col">Nome</th>
                                <th scope="col">Registrar</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td data-label="svg">
                                    <Link>
                                        <MdOutlineCheckBoxOutlineBlank color='#44A754' size={25} />
                                    </Link>
                                {/* <MdOutlineCheckBox color='#44A754' size={15} /> */}
                                </td>

                                <td data-label="Nome"></td>

                                <td data-label="Registrar">
                                    <Link> 
                                        <MdRule color="#FDC727" size={35} />
                                    </Link>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className='button-color'>
                        <button className='button-green'>ENVIAR OS SELECIONADOS</button>
                    </div>
            </div>
        </div>

    )
}