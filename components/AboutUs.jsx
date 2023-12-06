import React from 'react'
import '../css/AboutUs.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import abthero from '../assets/abt-hero.png'
import herovid from '../assets/hero.mp4'
import logo from '../assets/LogoWhite.png'
import razer from '../assets/razer.png'
import logitech from '../assets/logitech.png'
import hyperx from '../assets/hyperx.png'


function AboutUs() {

    useEffect(()=> {
        Aos.init({duration: 2000})
    },[])

    return (
    <>
    <Nav/>

    {/*HERO*/}
    <div className=''>
        <div className='abt-hero-container'>
            <img className='abt-img' src={abthero} alt="" />
            <div className='text-container'>
                <p className='text1'>SWITCH THE WORLD</p>
                <p className='text2'>About Keebs</p>
                <p className='text3'>One of the professional mechanical keyboard manufacturers around the world</p>
            </div>
        </div>
    </div>
    



    {/*CONTENT*/}
    <div className=''>
        <div className='abt-content-container' data-aos = "zoom-in">
            <div className='abt-left' >
                <div className='heading-container'>
                    <p className='title'>
                        More innovative <br />more progressive <br />focus on  what we do
                    </p>
                </div>
                <div className='text-container'>
                    <p className='heading'>
                        Keebs keyboard
                    </p>
                    <p className='subtext'>
                    Based in Philippines, Keebs founded its own brand in 2008 and became a manufacturing company that has strived to provide users with mechanical keyboards of the highest standard since day one. Fast forward to now, we are one of the top mechanical keyboard manufacturers in the Philippines and have built a reputation for providing products that are innovative, performance oriented and solidly built. Our ultimate goal is to have our logo be synonymous with excellence and product satisfaction. 
                    </p>
                    <br />
                    <p className='subtext'>
                    Having already established business partnerships in over 10 countries, Keebs has established a reputation throughout Asia. We are eager to continue expanding, giving consumers in every corner of the world a channel to purchase and experience Keebs products.
                    Moving forward, we will be aiming to reach even greater heights, tirelessly figuring out ways to come up with products that help users optimize their typing experience. Whether you're working or playing, give your fingers the comfort they deserve.
                    </p>
                </div>

                <div className='box-container' data-aos = "fade-in">
                    <div className='box1'>
                        <img src={razer} alt="" />
                    </div>
                    <div className='box2'>
                        <img src={logitech} alt="" />
                    </div>
                    <div className='box1'>
                        <img src={hyperx} alt="" />
                    </div>
                </div>
            </div>    


            <div className='abt-right'>
                <div className='vid-container'> 
                    <video autoPlay loop><source src={herovid}/></video>
                </div>

                <div className='text-container'>
                    <p className='heading'>
                        Keeb's Partner <br /> Companies
                    </p>
                    <p className='subtext'>
                        Razer, Logitech, HyperX
                    </p>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
    )
}

export default AboutUs