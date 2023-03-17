import './header.css';
import logo from '../../assets/logo-transparent.png';

import { Link } from 'react-router-dom';
import { FiUserPlus, FiUser, FiFileText, FiLogOut } from "react-icons/fi";
import { MdAddCard } from "react-icons/md";
// import { GiLindenLeaf } from "react-icons/gi";

export default function Header() {
    return (
        <div className="sidebar">

            <div className='nav'>

            <img src={logo} alt="logo com uma folhagem e escrita Neo-Brasil" />

            <Link to={'/'}>
                    <FiUserPlus size={35} />
                </Link>

                <Link to={'/clientes_cadastrados'}>
                    <FiUser size={35} />
                </Link>

                <Link>
                    <MdAddCard size={35} />
                </Link>

                <Link>
                    <FiFileText size={35} />
                </Link>

                {/* <li className='list'><Link><FiFileText size={35} /></Link></li> */}
            </div>

            <div className='signout'>
                {/* <Link>
                    <GiLindenLeaf size={200} />
                </Link> */}

                <Link>
                    <FiLogOut size={35} />
                </Link>
            </div>

        </div>
    )
}