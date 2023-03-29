import Header from "../../components/Header";

import { useState, useEffect } from 'react';
import ModalRegistrar from '../../components/ModalRegistrar';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { MdRule } from "react-icons/md";

export default function RegistrarPago() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [list, setList] = useState([]);

    function togglePostModal() {
        setShowPostModal(!showPostModal);
        setDetail();
    }

    useEffect(() => {
      Axios.get(`http://127.0.0.1:9080/listagem/clientes`).then((resp) => {
        var dados = resp.data
        var novoDados = []
        for(var k in dados){
            var novoDado = []
            novoDado.push(dados[k].nome);
            novoDado.push(dados[k].cpf);
            novoDado.push(dados[k].email);
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

                <h1>Registro de pagamento</h1>

                <div className='container-table'>

                    <table>
                    <thead>
                        <tr><th scope="col">Nome</th>
                            <th scope="col">Enviar registro</th>
                        </tr>
                    </thead>
                        {typeof list !== 'undefined' && list.map((value) => {
                            return !value.envio ?
                                    <tbody>
                                        <tr>
                                            <td data-label="Nome">{value[0]}</td>

                                            <td data-label="Registrar">
                                                <Link className="action" onClick={() => togglePostModal()}>
                                                    <MdRule color="#FDC727" size={35} />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                            :null
                        })}
                    </table>

                </div>

                <div className='button-color'>
                    <button className='button-all'>REGISTRAR TODOS</button>
                </div>
            </div>
            )}
            {showPostModal && (
                <ModalRegistrar conteudo={detail} close={togglePostModal} />
            )}
        </div>

    )
}