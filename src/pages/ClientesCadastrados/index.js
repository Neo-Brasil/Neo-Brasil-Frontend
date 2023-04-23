import './CrudCliente.css';
import Header from "../../components/Header/index.tsx";

import { useState, useEffect } from 'react';
import ModalDelCliente from '../../components/Modal/ModalDelCliente';
import Axios from "axios";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdContactPage, MdDeleteForever } from "react-icons/md";

export default function CrudCliente() {
    if(localStorage.getItem("update") === "1"){
        toast.success('Realizado com sucesso!')
        localStorage.removeItem("update");
    }
    
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [list, setList] = useState([]);
    const [total, setTotal] = useState();

    localStorage.removeItem('cadastro')
    localStorage.removeItem('crudUser')
    localStorage.removeItem('registra')
    localStorage.removeItem('relatorio')
    localStorage.removeItem('aprova')
    localStorage.setItem('crudCli', 'crudCli-white')
    

    function togglePostModal(id) {
        localStorage.setItem("id", id);
        setShowPostModal(!showPostModal);
        setDetail();
    }

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/clientes`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).then((resp) => {
          var dados = resp.data
          var novoDados = []
          
          let total_count = 0;
          for (var k in dados) {
              total_count = total_count + 1;

              var novoDado = []
              novoDado.push(dados[k].id)
              novoDado.push(dados[k].nome);
              novoDados.push(novoDado)
          }
          setList(novoDados);
          setTotal(total_count);
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

                <h1>Clientes cadastrados</h1>

                <div className='container-table'>
                    <i>Total: {total}</i>

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
                <ModalDelCliente conteudo={detail} close={togglePostModal} />
            )}
        </div>

    )
}