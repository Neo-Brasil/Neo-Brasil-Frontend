import Header from "../../components/Header/index";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import ModalAprovar from '../../components/Modal/Aprovar';
import Axios from "axios";
import { Link } from 'react-router-dom';
import { MdRule } from "react-icons/md";
import VerificaToken from "../../script/verificaToken.js";

export default function AprovarConta() {
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [list, setList] = useState([]);

    if(localStorage.getItem("login") === "ok"){
        toast.success('Bem-vindo!')
        localStorage.removeItem("login");
    }
    
    if(localStorage.getItem("update") === "1"){
        localStorage.removeItem('update')
        toast.success('Realizado com sucesso!')
    } 

    localStorage.removeItem('cadastro')
    localStorage.removeItem('crudUser')
    localStorage.removeItem('registra')
    localStorage.removeItem('relatorio')
    localStorage.removeItem('crudCli')
    localStorage.setItem('aprova', 'aprova-white')
    

    function togglePostModal(id) {
        // localStorage.clear();
        localStorage.setItem("id", id);
        setShowPostModal(!showPostModal);
        setDetail();
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
            for (var k in dados) {
                var novoDado = []
                if(dados[k].autorizado != "sim"){
                    novoDado.push(dados[k].id)
                    novoDado.push(dados[k].email);
                    novoDados.push(novoDado)
                }
            }
            setList(novoDados);
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
                        <tr><th scope="col">Email</th>
                            <th scope="col">Analisar</th>
                        </tr>
                    </thead>
                        {typeof list !== 'undefined' && list.map((value) => {
                            return !value.envio ?
                                    <tbody>
                                        <tr>
                                            <td data-label="Email">{value[1]}</td>

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