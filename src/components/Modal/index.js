import './Modal.css';
import { FiArrowLeft } from 'react-icons/fi';

export default function Modal({close}){
    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={ close }>
                    <FiArrowLeft color="#000" size={25}/>
                </button>

                <div className='conteudoModal'>
                    <p>Deseja deletar <b>Amanda Caires Perreira?</b></p>
                    <p className='aviso'>Esta ação não poderá ser desfeita!</p>

                    <div className='button-color'>
                        <button className='button-red'>DELETAR</button>
                    </div>

                </div>
            </div>
        </div>
    )
}