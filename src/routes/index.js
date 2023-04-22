import { Routes, Route } from 'react-router-dom'
import React from 'react';

import Login from '../pages/Login'

import CriarConta from '../pages/CriarConta'
import Termos from '../pages/Termos'

import AprovarConta from '../pages/AprovacaoContas'
import CrudUsuario from '../pages/UsuariosCadastrados'

import CadastrarCliente from '../pages/CadastroCliente'
import CrudCliente from '../pages/ClientesCadastrados'
import VerEditarCliente from '../pages/VerEditarCliente'

import RegistrarPago from '../pages/RegistrarPagamento'
import Relatorio from '../pages/Relatorio'

import Erro from '../pages/Erro/index.tsx'
import SemAcesso from '../pages/SemAcesso/index.tsx';

export default function RoutesApp(){
    const acesso = localStorage.getItem("acesso")
    if(acesso == null || acesso == 0){
        return(
            <Routes>
                <Route path="/" element={ <Login/> } /> 
                <Route path="/criar_conta" element={ <CriarConta/> } /> 
                <Route path="/termosDeUso" element={ <Termos/> } /> 
            </Routes>
        )
    }else{
        if(acesso == "1"){
            return(
                <Routes> 
                    <Route path="/" element={ <Login/> } />                
                    <Route path="/aprovar_contas" element={ <AprovarConta/> } />
                    <Route path="/usuarios_cadastrados" element={ <CrudUsuario/> } />
                    
                    <Route path="/cadastro" element={ <CadastrarCliente/> } />
                    <Route path="/clientes_cadastrados" element={ <CrudCliente/> } />
                    <Route path="/clientes_cadastrados/visualizar_editar/:id" element={ <VerEditarCliente/> } />
        
                    <Route path="/registrar_pagamento" element={ <RegistrarPago/> } />
                    <Route path="/relatorio" element={ <Relatorio/> } />

                    <Route path="*" element={ <Erro/> } />   
                </Routes>
            )
        }else if(acesso == "2"){
            return(
                <Routes>     
                    <Route path="/" element={ <Login/> } />                
                    <Route path="/cadastro" element={ <CadastrarCliente/> } />
                    <Route path="/clientes_cadastrados" element={ <CrudCliente/> } />
                    <Route path="/clientes_cadastrados/visualizar_editar/:id" element={ <VerEditarCliente/> } />
    
                    <Route path="/relatorio" element={ <Relatorio/> } />    
    
                    <Route path="*" element={ <Erro/> } />
    
                    <Route path="/aprovar_contas" element={ <SemAcesso/> } />
                    <Route path="/usuarios_cadastrados" element={ <SemAcesso/> } />
                    <Route path="/registrar_pagamento" element={ <SemAcesso/> } />          
                </Routes>
            )     
        }else if(acesso == "3"){
            return(
                <Routes>  
                    <Route path="/" element={ <Login/> } />       
                    <Route path="/registrar_pagamento" element={ <RegistrarPago/> } />
                    <Route path="/relatorio" element={ <Relatorio/> } />
        
                    <Route path="*" element={ <Erro/> } />
    
                    <Route path="/cadastro" element={ <SemAcesso/> } />
                    <Route path="/clientes_cadastrados" element={ <SemAcesso/> } />
                    <Route path="/clientes_cadastrados/visualizar_editar/:id" element={ <SemAcesso/> } />
                    <Route path="/aprovar_contas" element={ <SemAcesso/> } />
                    <Route path="/usuarios_cadastrados" element={ <SemAcesso/> } />
                </Routes>
            )
        }else{
            return(
                <Route path="*" element={ <Erro/> } />
            )
        }
    }
}