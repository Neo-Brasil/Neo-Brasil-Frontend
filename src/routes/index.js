import { Routes, Route } from 'react-router-dom'
import React from 'react';

import Login from '../pages/Login/index.js'
import CriarConta from '../pages/CriarConta/index.js';
import Termos from '../pages/Termos/index.js';

import AprovarConta from '../pages/AprovacaoContas'
import CrudUsuario from '../pages/UsuariosCadastrados'

import CadastrarCliente from '../pages/CadastroCliente'
import CrudCliente from '../pages/ClientesCadastrados'
import VerEditarCliente from '../pages/VerEditarCliente'

import RegistrarPago from '../pages/RegistrarPagamento/index.js'
import Relatorio from '../pages/Relatorio'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={ <Login/> } /> 
            <Route path="/criar_conta" element={ <CriarConta/> } /> 
            <Route path="/termosDeUso" element={ <Termos/> } /> 
            
            <Route path="/aprovar_contas" element={ <AprovarConta/> } />
            <Route path="/usuarios_cadastrados" element={ <CrudUsuario/> } />
            
            <Route path="/cadastro" element={ <CadastrarCliente/> } />
            <Route path="/clientes_cadastrados" element={ <CrudCliente/> } />
            <Route path="/clientes_cadastrados/visualizar_editar/:id" element={ <VerEditarCliente/> } />

            <Route path="/registrar_pagamento" element={ <RegistrarPago/> } />
            <Route path="/relatorio" element={ <Relatorio/> } />
                       
        </Routes>
    )
}