import React from 'react'
import '../css/Footer.css'
import facebook from '../assets/facebook.svg'
import instagram from '../assets/instagram.svg'
import youtube from '../assets/youtube.svg'
import twitter from '../assets/twitter.svg'
import { Link } from 'react-router-dom'
import { CiInstagram } from "react-icons/ci"
import { CiFacebook } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

function Footer() {

return (
    <footer>
        <div className='footer-container'>
            <div className='left-section'>
                <p className='heading'>STAY UPDATED</p>
                <p className='subtext'>Input your email for latest updates</p>
                <div className='input-container'>
                    <input name="Email" placeholder='keebs4life@gmail.com' type="text"></input>
                    <button id='sub' className='subscribe-btn'>SUBSCRIBE</button>
                </div>
            </div>

            <div className='middle-section'>
                <div>
                    <p className='text'>Follow Keebs</p>
                </div>
                <div className='icons-container'>
                    <Link to='https://www.facebook.com/' target='blank' className='circle'><CiFacebook /></Link>

                    <Link to='https://www.instagram.com/' target='blank' className='circle'><CiInstagram /></Link>
                    
                    <Link to='https://www.youtube.com/' target='blank'  className='circle'><CiYoutube /></Link>
                    
                    <Link to='https://www.twitter.com/' target='blank'className='circle'><CiTwitter /></Link>
                </div>
                
            </div>
            
            <div className='right-section'>
                <div className='content-container'>
                    <p className='contact-us'>CONTACT US</p>
                    <Link to ='/aboutus'>About Us</Link>
                    <p className='number'>+63 912 345 67890</p>
                </div>
            </div>
        </div>

        <div className='keebs-container'>
        <p>Keebs © 2023.</p>  
        </div>  
    </footer>
)
}

export default Footer