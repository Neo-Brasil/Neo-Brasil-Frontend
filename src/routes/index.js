import { Routes, Route } from 'react-router-dom'

import CadastrarCliente from '../pages/CadastrarCliente'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={ <CadastrarCliente/> } />

        </Routes>
    )
}