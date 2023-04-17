import './header.css';
import logo from '../../assets/logo-transparent.png';

import { Link } from 'react-router-dom';
import { FiUserPlus, FiUser, FiFileText, FiLogOut } from "react-icons/fi";
import { MdAddCard } from "react-icons/md";
import { RiShieldCheckFill, RiShieldUserFill } from "react-icons/ri";

// import { GiLindenLeaf } from "react-icons/gi";

export default function Header() {

    const aprova = localStorage.getItem('aprova')
    const crudUser = localStorage.getItem('crudUser')
    const cadastro = localStorage.getItem('cadastro')
    const crudCli = localStorage.getItem('crudCli')
    const registra = localStorage.getItem('registra')
    const relatorio = localStorage.getItem('relatorio')

    return (
        <div className="sidebar">

            <div className='nav'>

                <img src={logo} alt="logo com uma folhagem e escrita Neo-Brasil" />

                <Link to={'/aprovar_contas'} id={aprova} >
                    <RiShieldCheckFill size={35} />
                </Link>

                <Link to={'/usuarios_cadastrados'} id={crudUser} >
                    <RiShieldUserFill size={35} />
                </Link>

                <Link to={'/cadastro'} id={cadastro}>
                    <FiUserPlus size={35} />
                </Link>

                <Link to={'/clientes_cadastrados'} id={crudCli}>
                    <FiUser size={35} />
                </Link>

                <Link to={'/registrar_pagamento'} id={registra}>
                    <MdAddCard size={35} />
                </Link>

                <Link to={'/relatorio'} id={relatorio}>
                    <FiFileText size={35} />
                </Link>

            </div>

            <div className='signout'>

                <Link to={'/'}>
                    <FiLogOut size={35} />
                </Link>
            </div>

        </div>
    )
}