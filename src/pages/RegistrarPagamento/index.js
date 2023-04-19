import Header from "../../components/Header/index.tsx";

import { useState, useEffect } from 'react';
import ModalEscolher from '../../components/Modal/ModalEscolher';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { MdRule } from "react-icons/md";

export default function RegistrarPago() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [list, setList] = useState([]);
    const [total, setTotal] = useState();

    localStorage.removeItem('cadastro')
    localStorage.removeItem('crudUser')
    localStorage.removeItem('relatorio')
    localStorage.removeItem('crudCli')
    localStorage.removeItem('aprova')
    localStorage.setItem('registra', 'registra-white')

    function togglePostModal(id_cliente, id_titulo) {
        // localStorage.clear();
        localStorage.setItem("id_cliente", id_cliente);
        localStorage.setItem("id_titulo", id_titulo);
        setShowPostModal(!showPostModal);
        setDetail();
    }

    useEffect(() => {
      Axios.get(`http://127.0.0.1:9080/listagem/clientes`).then((resp) => {
        var dados = resp.data
        var novoDados = []
        let total_count = 0;
            for (var k in dados) {
                total_count = total_count + 1;

                var dado = dados[k]
                var titulo = dado.titulos[0]
                if(titulo.situacao !== "Pago"){
                    var novoDado = []
                    novoDado.push(dado.id)
                    novoDado.push(dado.nome);
                    novoDado.push(dado.cpf);
                    novoDado.push(dado.email);
                    let titulo = dado.titulos
                    titulo = titulo[0]
                    novoDado.push(titulo.id);
                    novoDados.push(novoDado);
                    setList(novoDados);
                    setTotal(total_count);
                }
            }
      });
    }, [])


    return (
        <div>
            <Header />
            {list.lenght === 0 ? (
                <div className='content'>
                    <h1>Nenhum registro encontrado...</h1>
                </div>
            ) : (
            
            <div className="content">

                <h1>Registro de pagamento</h1>

                <div className='container-table'>

                <i>Total: {total}</i>

                    <table>
                    <thead>
                        <tr><th scope="col">Nome</th>
                            <th scope="col">Prestações</th>
                        </tr>
                    </thead>
                        {typeof list !== 'undefined' && list.map((value) => {
                            return !value.envio ?
                                    <tbody>
                                        <tr>
                                            <td data-label="Nome">{value[1]}</td>

                                            <td data-label="Registrar">
                                                <Link className="action" onClick={() => togglePostModal(value[0],value[4])}>
                                                    <MdRule color="#FDC727" size={35} />
                                                </Link>
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
                <ModalEscolher conteudo={detail} close={togglePostModal} />
            )}
        </div>

    )
}