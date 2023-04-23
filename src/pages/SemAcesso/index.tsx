import './SemAcesso.css'
import { MdGroupOff } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FiUserPlus, FiUser, FiFileText } from "react-icons/fi";
import { MdAddCard } from "react-icons/md";
import React from 'react';

export default function SemAcesso() {
  const acesso = localStorage.getItem("acesso")
  if(acesso == "COMERCIAL"){
    return (
      <div>
  
        <div className='semacesso'>
  
          <MdGroupOff size={100} />
  
          <b>Acesso negado</b>
          <p>O setor Comercial não possui o acesso dessa URL</p>
          <p id='permitido'>Páginas disponibilizadas para o seu setor: </p>
  
          <div className='link'>
            <Link to={'/cadastro'}>
              <FiUserPlus size={35} />
              <p>Cadastro de clientes</p>
            </Link>
          </div>
  
          <div className='link'>
            <Link to={'/clientes_cadastrados'}>
              <FiUser size={35} />
              <p>Clientes cadastrados</p>
            </Link>
          </div>
  
          <div className='link'>
            <Link to={'/relatorio'}>
              <FiFileText size={35} />
              <p>Relatório de pagamento</p>
            </Link>
          </div>
  
        </div>
  
      </div>
    );
  }else if(acesso =="FINANCEIRO"){
    return (
      <div>
  
        <div className='semacesso'>
  
          <MdGroupOff size={100} />
  
          <b>Acesso negado</b>
          <p>O setor Financeiro não possui o acesso dessa URL</p>
          <p id='permitido'>Páginas disponibilizadas para o seu setor: </p>
  
          <div className='link'>
            <Link to={'/registrar_pagamento'}>
              <MdAddCard size={35} />
              <p>Registro de pagamento</p>
            </Link>
          </div>
  
          <div className='link'>
            <Link to={'/relatorio'}>
              <FiFileText size={35} />
              <p>Relatório de pagamento</p>
            </Link>
          </div>
  
        </div>
  
      </div>
    );
  }
}