import React from 'react'
import { FiHome, FiUser, FiDollarSign } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'

import './styles.css'

const Sidebar = () => {
    return (
        <aside id="sidebar">
            <header>
                <img src={Logo} alt="Logo"/>
                <h2>dashboard</h2>
            </header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="activeNavBtn">
                            <FiHome size={18}/>
                            <strong>Home</strong>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/payers" activeClassName="activeNavBtn">
                            <FiUser size={18}/>
                            <strong>Pagadores</strong>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/spents" activeClassName="activeNavBtn">
                            <FiDollarSign size={18}/>
                            <strong>Gastos</strong>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <footer></footer>
        </aside>
    )
}

export default Sidebar