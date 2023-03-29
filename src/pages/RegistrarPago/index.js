import Header from "../../components/Header";

import { useState } from 'react';
import ModalRegistrar from '../../components/ModalRegistrar';

import { Link } from 'react-router-dom';
import { MdRule } from "react-icons/md";

export default function RegistrarPago() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    function togglePostModal() {
        setShowPostModal(!showPostModal);
        setDetail();
    }

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
                        <tbody>
                            <tr>
                                <td data-label="Nome">Primeiro nome</td>

                                <td data-label="Registrar">
                                    <Link className="action" onClick={() => togglePostModal()}>
                                        <MdRule color="#FDC727" size={35} />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className='button-color'>
                    <button className='button-all'>REGISTRAR TODOS</button>
                </div>
            </div>
            {showPostModal && (
                <ModalRegistrar conteudo={detail} close={togglePostModal} />
            )}
        </div>

    )
}