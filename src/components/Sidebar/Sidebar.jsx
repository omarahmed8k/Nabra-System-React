import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { authActions } from '../../store/auth-slice'
import { useDispatch } from 'react-redux'
import Home from '../../assets/svgs/home.svg'
import Add from '../../assets/svgs/add.svg'
import Profile from '../../assets/svgs/profile.svg'
import Logout from '../../assets/svgs/logout.svg'
import Arrow from '../../assets/svgs/arrow.svg'
import "./Sidebar.scss"

export default function Sidebar() {
    const [toggle, settoggle] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            <button className={`toggle-btn ${toggle ? 'show' : ''}`} onClick={() => settoggle(!toggle)}>
                <img className={`icon ${toggle ? 'rotate' : ''}`} src={Arrow} alt="arrow" />
            </button>
            <div className={`sidebar ${toggle ? 'show' : ''}`}>
                <Link className='link-container' to="/" onClick={() => settoggle(!toggle)}>
                    <img className='icon' src={Home} alt="home" />
                </Link>
                <Link className='link-container' to="/add-list" onClick={() => settoggle(!toggle)}>
                    <img className='icon' src={Add} alt="add" />
                </Link>
                <Link className='link-container' to="/profile" onClick={() => settoggle(!toggle)}>
                    <img className='icon' src={Profile} alt="profile" />
                </Link>
                <Link className='link-container' onClick={(e) => { e.preventDefault(); dispatch(authActions.logout()); }}>
                    <img className='icon' src={Logout} alt="logout" />
                </Link>
            </div>
            <Link className='fixed-add' to="/add-list">
                <img className='icon' src={Add} alt="add" />
            </Link>
        </>
    )
}
