import React, { useState } from 'react'
import '../css/Login.css'
import loginimg from '../assets/loginimg.png'
import { Link } from 'react-router-dom'
import { IoPersonSharp } from "react-icons/io5"
import { FaLock } from "react-icons/fa6";
import logo from '../assets/LogoWhite.png'
import Aos from 'aos'

const users = [
    {
        name: "Grim",
        username: "Grim",
        password:"123456",
        shipping_info:{
            address:"Brgy. I, Mataasnakahoy Batangas",
            zip_code:4223,
        }
    }
]

const Login = () => {
    const [showError,setShowError] = useState(null);
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);

    const handleSubmit = (event) => {
        let user_login = {}
        let login_success = false

        users.map(
            (user) => {
                if(user.username == username && user.password == password) {
                    user_login = user;
                    login_success = true;
                }
            }
        )

        if(login_success) {
            window.localStorage.setItem("user", JSON.stringify(user_login));
            window.location.href = '/'
            event.preventDefault();
        } else {
            setShowError(<p className='error'>Incorrect username or password!</p>)
            event.preventDefault();
        }
    }

    const changeUsername = (event) => {
        setUsername(event.target.value)
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }


    return (
        <>
        <div className='login-container'>
            <div className='form-container' data-aos='fade-up'>

                <form onSubmit={handleSubmit}>
                    <Link to="/"><img className="logo" src={logo} alt="" /></Link>
                    
                    <div className="input-box" >
                        <input className="username" type="username" placeholder='   Username' onChange={changeUsername.bind(this)}/>
                        <i className='user-icon'><IoPersonSharp /></i>
                    </div>
                    
                    <div className="input-box">
                        <input className="password" type="password" placeholder='   Password' onChange={changePassword.bind(this)} />
                        <i className='pass-icon'><FaLock /></i>
    
                        <div className="remember-forgot">
                            <div className="remember">
                                <input className="check-box" type="checkbox" />
                                <label htmlFor="">Remember me </label>
                            </div>
                            <div className='error-container'> 
                                {showError}
                            </div>

                            <button type='submit' className='submit-btn'>Login</button>
                            
                            <div className="register-link">
                                <p>Don't have an account? <Link to="/signup">Register</Link></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='image-container' data-aos='fade-down'>
                <img src={loginimg} alt="" />
            </div>
        </div>
        </>
    )
}



export default Login