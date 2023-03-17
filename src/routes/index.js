import { Routes, Route } from 'react-router-dom'

import CadastrarCliente from '../pages/CadastrarCliente'
import CrudCliente from '../pages/CrudCliente'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={ <CadastrarCliente/> } />
            <Route path="/clientes_cadastrados" element={ <CrudCliente/> } />
            
        </Routes>
    )
}