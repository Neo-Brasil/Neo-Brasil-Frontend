import './header.css';
import logo from '../../assets/logo-transparent.png';

import { Link } from 'react-router-dom';
import { FiUserPlus, FiUser, FiFileText, FiLogOut } from "react-icons/fi";
import { MdAddCard } from "react-icons/md";
import { RiShieldCheckFill, RiShieldUserFill } from "react-icons/ri";

// import { GiLindenLeaf } from "react-icons/gi";

export default function Header() {
    return (
        <div className="sidebar">

            <div className='nav'>

                <img src={logo} alt="logo com uma folhagem e escrita Neo-Brasil" />

                <Link to={'/aprovar_contas'}>
                    <RiShieldCheckFill size={35} />
                </Link>

                <Link to={'/usuarios_cadastrados'}>
                    <RiShieldUserFill size={35} />
                </Link>

                <Link to={'/cadastro'}>
                    <FiUserPlus size={35} />
                </Link>

                <Link to={'/clientes_cadastrados'}>
                    <FiUser size={35} />
                </Link>

                <Link to={'/registrar_pagamento'}>
                    <MdAddCard size={35} />
                </Link>

                <Link to={'/relatorio'}>
                    <FiFileText size={35} />
                </Link>

                {/* <li className='list'><Link><FiFileText size={35} /></Link></li> */}
            </div>

            <div className='signout'>
                {/* <Link>
                    <GiLindenLeaf size={200} />
                </Link> */}

                <Link to={'/'}>
                    <FiLogOut size={35} />
                </Link>
            </div>

        </div>
    )
}