import './CrudCliente.css';
import Header from "../../components/Header";

import { useState, useEffect } from 'react';
import ModalDelete from '../../components/ModalDelete';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { MdContactPage, MdDeleteForever } from "react-icons/md";

export default function CrudCliente() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [list, setList] = useState([]);

    function togglePostModal(id) {
        localStorage.clear();
        localStorage.setItem("id", id);
        setShowPostModal(!showPostModal);
        setDetail();
    }

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/clientes`).then((resp) => {
          var dados = resp.data
          var novoDados = []
          for(var k in dados){
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
                <div className='none'>
                <p>Nenhum dado encontrado...</p>
                <p>Não há relatório diário!</p>
                </div>
            ) : (
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

                        {typeof list !== 'undefined' && list.map((value) => {
                            return !value.envio ?
                            <tbody>
                                <tr>
                                    <td data-label="Nome">{value[1]}</td>

                                    <td data-label="Visualizar">
                                        <Link to={`/clientes_cadastrados/visualizar_editar/${value[0]}`}>
                                        <MdContactPage color='#2F44FF' size={25} /></Link>
                                    </td>

                                    <td data-label="Deletar">
                                        <Link className="action" onClick={() => togglePostModal(value[0])}>
                                        <MdDeleteForever color="#F42020" size={25} /></Link>
                                    </td>

                                </tr>

                            </tbody>
                            :null
                        })}
                    </table>
                </div>
            </div>
            )}
            {showPostModal && (
                <ModalDelete conteudo={detail} close={togglePostModal} />
            )}
        </div>

    )
}