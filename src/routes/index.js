import { Routes, Route } from 'react-router-dom'

import CadastrarCliente from '../pages/CadastrarCliente'
import CrudCliente from '../pages/CrudCliente'
import Login from '../pages/Login'
import RegistrarPago from '../pages/RegistrarPago'
import Relatorio from '../pages/Relatorio'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={ <CadastrarCliente/> } />
            <Route path="/clientes_cadastrados" element={ <CrudCliente/> } />
            <Route path="/registrar_pagamento" element={ <RegistrarPago/> } />
            <Route path="/relatorio" element={ <Relatorio/> } />
            <Route path="/login" element={ <Login/> } />            
        </Routes>
    )
}