import React from 'react'
import { Link } from 'react-router-dom'
import { FiSettings } from "react-icons/fi";
import './Navbar.css'

/* eslint-disable no-undef */
const Navbar = () => {
    const openOptions = () => {
        chrome.tabs.create({ url: 'options.html' });
    }
    return (
        <div className="nav-main">
            <div className='nav-main-left'>
                <Link to="/"><h2><span className="color-primary">Codie</span></h2></Link>
                <p>powered by OpenAI</p>
            </div>
            <div>
                <button className="nav-settings" onClick={openOptions}><FiSettings /></button>
            </div>
        </div >
    )
}

export default Navbar