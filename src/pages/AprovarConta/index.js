import Header from "../../components/Header";

import { useState, useEffect } from 'react';
import ModalAprovar from '../../components/ModalAprovar';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { MdRule } from "react-icons/md";

export default function AprovarConta() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [list, setList] = useState([]);

    localStorage.removeItem('cadastro')
    localStorage.removeItem('crudUser')
    localStorage.removeItem('registra')
    localStorage.removeItem('relatorio')
    localStorage.removeItem('crudCli')
    localStorage.setItem('aprova', 'aprova-white')
    

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
            var dado = dados[k]
            var titulo = dado.titulos[0]
            if(titulo.situacao !== "Pago"){
                var novoDado = []
                novoDado.push(dado.id)
                novoDado.push(dado.nome);
                novoDado.push(dado.cpf);
                novoDado.push(dado.email);
                novoDados.push(novoDado)
                setList(novoDados);
            }
        }
      });
    }, [])


    return (
        <div>
            <Header />
            {list.lenght === 0 ? (
                <div className='content'>
                    <h1>Nenhuma conta para aprovar...</h1>
                </div>
            ) : (
            
            <div className="content">

                <h1>Aprovação de contas</h1>

                <div className='container-table'>

                    <table>
                    <thead>
                        <tr><th scope="col">Nome</th>
                            <th scope="col">Analisar</th>
                        </tr>
                    </thead>
                        {typeof list !== 'undefined' && list.map((value) => {
                            return !value.envio ?
                                    <tbody>
                                        <tr>
                                            <td data-label="Nome">{value[1]}</td>

                                            <td data-label="Analisar">
                                                <Link className="action" onClick={() => togglePostModal(value[0])}>
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
                <ModalAprovar conteudo={detail} close={togglePostModal} />
            )}
        </div>

    )
}