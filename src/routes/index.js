import { Routes, Route } from 'react-router-dom'
import React from 'react';

import Login from '../pages/Login/index.tsx'
import CriarConta from '../pages/CriarConta/index.tsx';
import Termos from '../pages/Termos/index.js';

import CadastrarCliente from '../pages/CadastrarCliente'
import CrudCliente from '../pages/CrudCliente'
import VerEditarCliente from '../pages/VerEditarCliente'
import RegistrarPago from '../pages/RegistrarPago'
import Relatorio from '../pages/Relatorio'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={ <Login/> } /> 
            <Route path="/criar_conta" element={ <CriarConta/> } /> 
            <Route path="/termosDeUso" element={ <Termos/> } /> 
            
            <Route path="/cadastro" element={ <CadastrarCliente/> } />
            <Route path="/clientes_cadastrados" element={ <CrudCliente/> } />
            <Route path="/clientes_cadastrados/visualizar_editar/:id" element={ <VerEditarCliente/> } />

            <Route path="/registrar_pagamento" element={ <RegistrarPago/> } />
            <Route path="/relatorio" element={ <Relatorio/> } />
                       
        </Routes>
    )
}