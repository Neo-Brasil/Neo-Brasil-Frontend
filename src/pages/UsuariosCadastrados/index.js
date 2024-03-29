import Header from "../../components/Header/index";
import { useState, useEffect } from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { MdContactPage, MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import ModalVerEditar from '../../components/Modal/VerEditarUsuario';
import ModalDelUsuario from '../../components/Modal/DeletarUsuario';
import VerificaToken from '../../script/verificaToken';

export default function CrudUsuario() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [list, setList] = useState([]);

    const [showPostModal2, setShowPostModal2] = useState(false);
    const [detail2, setDetail2] = useState();
    const email_usuario = localStorage.getItem("email_usuario")

    const [total, setTotal] = useState();

    localStorage.removeItem('cadastro')
    localStorage.removeItem('registra')
    localStorage.removeItem('relatorio')
    localStorage.removeItem('crudCli')
    localStorage.removeItem('aprova')
    localStorage.setItem('crudUser', 'crudUser-white')

    function togglePostModal(id) {
        // localStorage.clear();
        localStorage.setItem("id", id);
        setShowPostModal(!showPostModal);
        setDetail();
    }

    function togglePostModal2(id) {
        // localStorage.clear();
        Axios.get(`http://127.0.0.1:9080/selecionar/usuario/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            var usuario = resp.data
            if(usuario.email != email_usuario){
                localStorage.setItem("id", id);
                setShowPostModal2(!showPostModal2);
                setDetail2();
            }else{
                toast.warning('Administradores não podem se excluir!')
            }
        });
    }

    useEffect(() => {
        Axios.get(`http://127.0.0.1:9080/listagem/usuarios`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
        }).catch(function (error) {
            VerificaToken(error)
        }).then((resp) => {
            var dados = resp.data
            var novoDados = []
            let total_count = 0;
            for (var k in dados) {
                total_count = total_count + 1;

                var novoDado = []
                novoDado.push(dados[k].id)
                novoDado.push(dados[k].email);
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
                    <h1>Nenhum usuário foi cadastrado...</h1>
                </div>
            ) : (
                <div className="content">

                    <h1>Usuários cadastrados</h1>

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
                <ModalVerEditar conteudo={detail} close={togglePostModal} />
            )}

            {showPostModal2 && (
                <ModalDelUsuario conteudo={detail2} close={togglePostModal2} />
            )}
        </div>

    )
}