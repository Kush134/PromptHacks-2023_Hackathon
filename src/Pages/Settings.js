import React from 'react'
import { Link } from 'react-router-dom'
import About from './About'
import ClearData from './ClearData'

const Settings = () => {
    return (
        <div>
            <ul>
                <li><Link to="/cleardata" element={<ClearData />}>Clear Chats</Link></li>
                <li><Link to="/about" element={<About />}>About</Link></li>
            </ul>
        </div>
    )
}

export default Settings