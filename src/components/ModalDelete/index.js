import './ModalDelete.css';
import { FiArrowLeft } from 'react-icons/fi';
import Axios from "axios";

export default function ModalDelete({close}){
    const id_ = localStorage.getItem("id") ; 
    const id = parseInt(id_);

    function handleSubmit() {
        Axios.delete(`http://localhost:9080/excluir/cliente/${id}`).then((res) => {
            console.log(res)
        })
        localStorage.clear();
    }

    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={ close }>
                    <FiArrowLeft color="#000" size={25}/>
                </button>

                <div className='conteudoModal'>
                    <p>Deseja deletar <b>Amanda Caires Perreira?</b></p>
                    <p className='aviso'>Esta ação não poderá ser desfeita!</p>

                    <div className='button-color' onClick={() => handleSubmit()}>
                        <button className='button-red'>DELETAR</button>
                    </div>

                </div>
            </div>
        </div>
    )
}