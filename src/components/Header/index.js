import './header.css';
import logo from '../../assets/logo-transparent.png';
import lotus from '../../assets/lotus.png';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FiUserPlus, FiUser, FiFileText, FiLogOut } from "react-icons/fi";
import { MdAddCard } from "react-icons/md";
import { RiShieldCheckFill, RiShieldUserFill } from "react-icons/ri";

export default function Header() {
    const acesso = localStorage.getItem("acesso")

    const aprova = localStorage.getItem('aprova')
    const crudUser = localStorage.getItem('crudUser')
    const cadastro = localStorage.getItem('cadastro')
    const crudCli = localStorage.getItem('crudCli')
    const registra = localStorage.getItem('registra')
    const relatorio = localStorage.getItem('relatorio')

    const [navopen, setNavopen] = useState(false);

    function handleNav() {
        setNavopen(!navopen);
    }

    if (acesso == "ADM") {
        return (
            <div className={navopen ? "sidebar_open" : "sidebar"}>

                <div className='headerLogo'>
                    <picture>
                        <source media="(max-width: 700px)" srcSet={lotus} />
                        <img id='logoHeader' src={logo} alt="logo de folhagem e escrito Neo-Brasil" />
                    </picture>
                </div>

                <ul className="nav-links">

                    <input type="checkbox" id="checkbox_toggle" onClick={handleNav} />
                    <label htmlFor="checkbox_toggle" className="hamburger" >&#9776;</label>

                    <div className='nav'>

                        <Link to={'/aprovar_contas'} id={aprova} >
                            <RiShieldCheckFill size={30} />
                        </Link>

                        <Link to={'/usuarios_cadastrados'} id={crudUser} >
                            <RiShieldUserFill size={30} />
                        </Link>

                        <Link to={'/cadastro'} id={cadastro}>
                            <FiUserPlus size={30} />
                        </Link>

                        <Link to={'/clientes_cadastrados'} id={crudCli}>
                            <FiUser size={30} />
                        </Link>

                        <Link to={'/registrar_pagamento'} id={registra}>
                            <MdAddCard size={30} />
                        </Link>

                        <Link to={'/relatorio'} id={relatorio}>
                            <FiFileText size={30} />
                        </Link>

                        <Link to={'/'} id='signout' style={{ background: "transparent" }}>
                            <FiLogOut size={30} />
                        </Link>
                    </div>

                </ul>
            </div>
        )
    } else if (acesso == "COMERCIAL") {
        return (
            <div className={navopen ? "sidebar_open" : "sidebar"}>

                <div className='headerLogo'>
                    <picture>
                        <source media="(max-width: 700px)" srcSet={lotus} />
                        <img id='logoHeader' src={logo} alt="logo de folhagem e escrito Neo-Brasil" />
                    </picture>
                </div>

                <ul className="nav-links">

                    <input type="checkbox" id="checkbox_toggle" onClick={handleNav} />
                    <label htmlFor="checkbox_toggle" className="hamburger" >&#9776;</label>

                    <div className='nav'>

                        <Link to={'/cadastro'} id={cadastro}>
                            <FiUserPlus size={35} />
                        </Link>

                        <Link to={'/clientes_cadastrados'} id={crudCli}>
                            <FiUser size={35} />
                        </Link>

                        <Link to={'/relatorio'} id={relatorio}>
                            <FiFileText size={35} />
                        </Link>

                        <Link to={'/'} id='signoutEnd' style={{ background: "transparent" }}>
                            <FiLogOut size={30} />
                        </Link>
                    </div>

                </ul>
            </div>
        )
    } else if (acesso == "FINANCEIRO") {
        return (
            <div className={navopen ? "sidebar_open" : "sidebar"}>

                <div className='headerLogo'>
                    <picture>
                        <source media="(max-width: 700px)" srcSet={lotus} />
                        <img id='logoHeader' src={logo} alt="logo de folhagem e escrito Neo-Brasil" />
                    </picture>
                </div>

                <ul className="nav-links">

                    <input type="checkbox" id="checkbox_toggle" onClick={handleNav} />
                    <label htmlFor="checkbox_toggle" className="hamburger" >&#9776;</label>

                    <div className='nav'>
                        <Link to={'/registrar_pagamento'} id={registra}>
                            <MdAddCard size={35} />
                        </Link>

                        <Link to={'/relatorio'} id={relatorio}>
                            <FiFileText size={35} />
                        </Link>

                        <Link to={'/'} id='signoutEnd' style={{ background: "transparent" }}>
                            <FiLogOut size={30} />
                        </Link>
                    </div>

                </ul>
            </div>
        )
    }
}