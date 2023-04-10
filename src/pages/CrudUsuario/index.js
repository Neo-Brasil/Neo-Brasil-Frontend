import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { MdContactPage, MdDeleteForever } from "react-icons/md";

import ModalDelete from '../../components/ModalDelete';

export default function CrudUsuario() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [list, setList] = useState([]);

    const [showPostModal2, setShowPostModal2] = useState(false);
    const [detail2, setDetail2] = useState();
    
    function togglePostModal(id) {
        localStorage.clear();
        localStorage.setItem("id", id);
        setShowPostModal(!showPostModal);
        setDetail();
    }

    function togglePostModal2(id) {
        localStorage.clear();
        localStorage.setItem("id", id);
        setShowPostModal2(!showPostModal2);
        setDetail2();
    }

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/clientes`).then((resp) => {
            var dados = resp.data
            var novoDados = []
            for (var k in dados) {
                var novoDado = []
                novoDado.push(dados[k].id)
                novoDado.push(dados[k].nome);
                novoDados.push(novoDado)
            }
            setList(novoDados);
        });
    }, [])

    return (
        <div>
            <Header />
            {list.lenght === 0 ? (
                <div className='content'>
                    <h1>Nenhum cliente foi cadastrado...</h1>
                </div>
            ) : (
                <div className="content">

                    <h1>Usuários cadastrados</h1>

                    <div className='container-table'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Visualizar</th>
                                    <th scope="col">Deletar</th>
                                </tr>
                            </thead>

                            {typeof list !== 'undefined' && list.map((value) => {
                                return !value.envio ?
                                    <tbody>
                                        <tr>
                                            <td data-label="Nome">{value[1]}</td>

                                            <td data-label="Visualizar">
                                                <Link className="action" onClick={() => togglePostModal(value[0])}>
                                                    <MdContactPage color='#2F44FF' size={25} /></Link>
                                            </td>

                                            <td data-label="Deletar">
                                                <Link className="action" onClick={() => togglePostModal2(value[0])}>
                                                    <MdDeleteForever color="#F42020" size={25} /></Link>
                                            </td>

                                        </tr>

                                    </tbody>
                                    : null
                            })}
                        </table>
                    </div>
                </div>
            )}
            {showPostModal && (
                <ModalDelete conteudo={detail} close={togglePostModal} />
            )}

            {showPostModal2 && (
                <ModalDelete conteudo={detail2} close={togglePostModal2} />
            )}
        </div>

    )
}