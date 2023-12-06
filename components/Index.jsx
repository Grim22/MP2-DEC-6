import React, { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'


import Nav from './Nav'
import Footer from './Footer'
//HERO1
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import hero1 from '../assets/hero1.jpg'
import hero2 from '../assets/hero2.jpg'
import hero3 from '../assets/hero3.jpg'
import '../css/Hero1.css'
import { Link } from 'react-router-dom';
//HERO2
import hero from '../assets/2hero.jpg'
import row1 from '../assets/row1.jpg'
import row2 from '../assets/row2.jpg'
import row3 from '../assets/row3.jpg'
import '../css/Hero2.css'
//BEST SELLER
import '../css/BestSeller.css'
import bs from "../assets/BS.jpg"
import waves from '../assets/waves.png'
//FAQS
import '../css/HowItWorks.css'
import step1 from '../assets/step1.png'
import step2 from '../assets/step2.png'
import step3 from '../assets/step3.png'
//TESTIMONY
import '../css/Testimony.css'
import profile1 from '../assets/profile1.jpg'
import profile2 from '../assets/profile2.jpg'
import profile3 from '../assets/profile3.jpg'
import profile4 from '../assets/profile4.jpg'






function Index() {

    useEffect(()=> {
        Aos.init({duration: 2000})
    },[])

    return (
        <div className=''>
        <Nav />
        

        {/*HERO1 */}
        <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
            clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
        >
            <SwiperSlide>
            <img src={hero2} />
            <h1 class="">Project D</h1>
        <h5>Tinker 65</h5>
        <Link to="/product" class="shop-button2">
            <span class="top-key"></span>
            <span class="text">Shop Now</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
        </Link>
            </SwiperSlide>

            <SwiperSlide>
            <img src={hero1} />
            <h1>Project D</h1>  
        <h5>Outlaw 65</h5>
        <Link to="/product" class="shop-button2" >
            <span class="top-key"></span>
            <span class="text">Shop Now</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span> 
        </Link>
            </SwiperSlide>

            <SwiperSlide>
            <img src={hero3} />
            <h1>Sprout</h1>
        <h4>x</h4>
        <h2 class="swiper3">Keebs</h2>
        <Link to="/product" class="shop-button2" >
            <span class="top-key"></span>
            <span class="text">EXPLORE ALL</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
        </Link>
            </SwiperSlide>
            
        </Swiper>
        



    {/*HERO2 */}
    <div className="hero2-container">
        <div className="left-section" data-aos = "fade-right">
            <img className="hero" src={hero} alt="" />
            <div className='text-container'>
                <p className="heading">Inspired Typing</p>
                <p className="subtext">Performance driven mechanical keyboards</p>
            </div>
        </div>
        <div className="right-section" data-aos = "fade-left">
                <div className="row1">
                    <div className="row1-left">
                        <p className="heading"></p>  
                        
                        <p className="subtext">Precision and Comfort</p>
                    </div>
                    <div className="row1-right">
                        <img className="row1-img" src={row2} alt=""/>
                    </div>
                </div>
                <div className="row2">
                    <div class="row2-left">
                        <img className="row2-img" src={row1} alt=""/>
                    </div>
                    <div className="row2-right">
                        <p className="heading"></p>
                        
                        <p className="subtext">Unrivaled Performance</p>
                    </div>
                </div>
                <div className="row3">
                    <div className="row3-left">
                        <p className="heading"></p>
                        
                        <p className="subtext">Engineered for the ultimate <br /> typing experience</p>
                    </div>
                    <div className="row3-right">
                        <img className="row3-img" src={row3} alt=""/>
                    </div>
                </div>
        </div>
    </div>



    {/*BEST SELLER*/}
    <div className="BS-section">
        <div className="BS-left" data-aos = 'fade-right'>
            <p className="heading">Best Selling Mechanical Keyboard</p>
            <p className="subtext">Fusing traditional art and modern technology as one</p>
            <img className="BS" src={bs} alt=""/>
        </div>
        <div className="BS-right">
            
            <p className="text" data-aos = 'fade-left'>
                The HyperX Alloy Origins 60 Percent Box is a compact mechanical gaming keyboard that offers a smaller form factor, making it popular among gamers and professionals who prefer a minimalist and portable setup. 
            </p>
            <Link to="/product">
                <button className="discover-btn" data-aos = 'fade-left'>&#x2192; Discover more products
                </button>
            </Link> 
        </div>
    </div>
    

    {/*FAQS */}
    <div className="faqs-container" data-aos = "zoom-in">
        <div className="heading-container">
            <p className="heading">HOW IT WORKS</p>
        </div>
        <div className="steps-container">
            <div className="step1">
                <div className="content">
                    <img src={step1} alt=""/>
                    <p className="heading">
                        Step 1: Discover Your Perfect Keyboard
                    </p>
                    <p className="subtext">
                        Immerse yourself in a world of keyboards on our user-friendly website. Browse through our curated selection, explore the features, and find the keyboard that perfectly matches your needs and style. With just a few clicks, add your dream keyboard to your virtual cart, where your shopping journey begins.
                    </p>
                </div>
            </div>

            <div className="step2">
                <div className="content">
                    <img src={step2} alt=""/>
                    <p className="heading">
                        Step 2: Seamless Checkout Experience
                    </p>
                    <p className="subtext">
                        Ready to make your selection yours? Head to the checkout where the magic happens. Review your cart, ensuring every detail is just right. Then, effortlessly enter your shipping and payment information in our secure, hassle-free checkout process. Your purchase is just moments away from becoming a reality.
                    </p>
                </div>
            </div>

            <div className="step3">
                <div className="content">
                    <img src={step3} alt=""/>
                    <p className="heading">
                        Step 3: Anticipate and Enjoy
                    </p>
                    <p className="subtext">
                        Congratulations, your order is confirmed! Now, sit back and relax as we prepare your keyboard with care. While you eagerly await its arrival, we'll keep you updated every step of the way. Track your package as it makes its way to your doorstep, ready to enhance your computing experience. Get ready to unbox joy – your perfect keyboard is on its way!
                    </p>
                </div>
            </div>
        </div>
    </div>



    {/*TESTIMONY */}
    <div className='main-container'>
            <div className='header-container' data-aos = "fade-down">
                <p className='header'>Trusted by thousands of
                    subscribed 
                    <br/>gamers and professionals in the Philippines
                </p>
            </div>
            <div className='card-container'>
                <div className='left-section' data-aos = "fade-right">
                    <div className="costumer-card">
                        <div className='profile-section'>
                            <img className='profile-picture' src={profile1} alt="" />
                            <p className="customer-name">
                                Bogart D
                            </p>
                        </div>
                        
                        <div className='testimony'>
                            <p> "Exceptional keyboards, seamless shopping! Found the perfect mechanical keyboard effortlessly. Quick delivery, top-notch quality – it's a typing dream. Thanks to Keebs, my desk has never looked or felt better.
                            </p>
                        </div>
                    </div>

                    <div className="costumer-card">
                        <div className='profile-section'>
                            <img className='profile-picture' src={profile2} alt="" />
                            <p className="customer-name">
                                Zach Efren
                            </p>
                        </div>
                        
                        <div className='testimony'>
                            <p>
                            "I recently purchased a mechanical keyboard from Keebs, and I couldn't be happier! The selection is fantastic, the checkout process was a breeze, and my new keyboard arrived quickly and in perfect condition. The quality is outstanding, providing a typing experience that's a game-changer. Thanks, Keebs, for making my keyboard dreams a reality!"
                            </p>
                        </div>
                    </div>
                </div>


                <div className='right-section' data-aos = "fade-left">
                    <div className="costumer-card">
                        <div className='profile-section'>
                            <img className='profile-picture' src={profile3} alt="" />
                            <p className="customer-name">
                                Kim Daniel
                            </p>
                        </div>
                        
                        <div className='testimony'>
                            <p>
                            "Absolutely thrilled with my purchase from Keebs! The mechanical keyboard I ordered not only looks sleek but delivers an incredible typing experience. The ordering process was a breeze, and the speedy delivery exceeded my expectations. If you're a keyboard enthusiast, look no further – Keebs is your go-to for quality and style!"
                            </p>
                        </div>
                    </div>

                    <div className="costumer-card">
                        <div className='profile-section'>
                            <img className='profile-picture' src={profile4} alt="" />
                            <p className="customer-name">
                                Liza Soberano
                            </p>
                        </div>
                        
                        <div className='testimony'>
                            <p>
                            "Being a girl in the spotlight, aesthetics matter as much as performance, and Keebs nailed it! The range of mechanical keyboards is not only high-quality but also exquisitely designed. Ordering was a breeze, and the swift delivery meant I could elevate my setup in no time. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    )
}

export default Index