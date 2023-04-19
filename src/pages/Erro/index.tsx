import './Erro.css'
import { FiFrown } from "react-icons/fi";
import React from 'react';

export default function SemAcesso() {
  return (
    <div>

      <div className='erro'>

        <FiFrown size={65} />

        <b>404</b>
        <p>Página não encontrada</p>

      </div>

    </div>
  )
}