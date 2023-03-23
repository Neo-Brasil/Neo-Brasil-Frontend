import './CrudCliente.css';
import Header from "../../components/Header";

import { useState } from 'react';
import Modal from '../../components/Modal';

import { Link } from 'react-router-dom';
import { MdContactPage, MdDeleteForever } from "react-icons/md";

export default function CrudCliente() {
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

                <h1>Clientes cadastrados</h1>

                <div className='container-table'>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Visualizar</th>
                                <th scope="col">Deletar</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td data-label="Nome">Teste de nome</td>

                                <td data-label="Visualizar">
                                    <Link to={'/clientes_cadastrados/visualizar_editar'}>
                                    <MdContactPage color='#2F44FF' size={25} /></Link>
                                </td>

                                <td data-label="Deletar">
                                    <Link className="action" onClick={() => togglePostModal()}>
                                    <MdDeleteForever color="#F42020" size={25} /></Link>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            {showPostModal && (
                <Modal conteudo={detail} close={togglePostModal} />
            )}
        </div>

    )
}