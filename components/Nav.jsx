import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import logo from '../assets/LogoWhite.png'
import '../css/Nav.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { GiHamburgerMenu } from "react-icons/gi";




const Nav = (props) => {
    const cart_user = window.localStorage.getItem("user");

    const [user, setUser] = useState(JSON.parse(cart_user));
    
    const toggleLogout = (event) => {
        localStorage.removeItem("user");
    }

    const [toggleMenu,setToggleMenu] = useState(false)

    const [screenWidth,setScreenWidth] = useState(window.innerWidth)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {
        const changeWidth = () =>{
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])


    return (
    <nav>
        <div className='logo-mobile'> 
            <Link to='/'>
                <img className='logo' src={logo} alt="" />
            </Link>
        </div>
       
        {(toggleMenu 
        || screenWidth > 768) && (
            
            <>
            <ul className='list'>
                <Link to='/'>Home</Link>
                <Link to='/product'>Products</Link>
                <Link to='/' className='logo-wide'><img className='logo' src={logo} alt="" /></Link>
                <Link to='/aboutus'>About Us</Link>
                {user ? <div className='log-in-container'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {user.name} &#9662;
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Link to='/cart'>
                                        cart
                                    </Link>
                                    <Link to='/favorites'>
                                        favorites
                                    </Link>
                                    <Link to="/login" onClick={toggleLogout.bind(this)}>
                                        Log out
                                    </Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>  
                    :
                <div className='log-in-container'>
                    <Link to='/login' >Log in</Link>
                </div>}
            </ul>
            </>
        )}
        
        <button className='toggle-btn' onClick={toggleNav}>
            <GiHamburgerMenu />
        </button>   
    </nav>

)
}

export default Nav