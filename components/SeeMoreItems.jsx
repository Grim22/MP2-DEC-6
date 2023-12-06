import React, {useContext, useEffect} from 'react'
import ProductContext from './Product-Context';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { LuHeart } from "react-icons/lu";
import '../css/SeeMoreHero.css'
import '../css/SeeMoreBody.css'
import '../css/SeeMoreSpecs.css'
import Nav from './Nav';
import Aos from 'aos';
import 'aos/dist/aos.css'
import logo from '../assets/LogoWhite.png'
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Footer from './Footer'

export const SeeMoreItems = (props) => {
        const{id,
            name,
            image,
            price,
            heroDescription,
            hero,
            contentImg1,
            contentTitle1,
            contentDescription1,
            contentImg2,
            contentTitle2,
            contentDescription2,
            contentImg3,
            contentTitle3,
            contentDescription3,
            dark
        } = props.data;
        const { seeMore } = useContext(ProductContext)


        useEffect(()=> {
            Aos.init({duration: 2000})
        },[])
    
    return ( 
        <div className='seemore-container'>
            <div className='top-bar'>
                <img  className='logo' src={logo} alt="" />
                <div className='btn-container'>
                    <MdOutlineArrowBackIosNew />
                    <Link to='/product'>
                        <button onClick={()=>seeMore(id)}>BACK</button>
                    </Link>
                </div>
            </div>
            <div className='hero-section' data-aos='zoom-in'>
                <img data-aos="fade-in" className='sm-hero' src={hero} alt="" />

                <div className="text-container">
                    <div className="heading">
                        <p className={dark}>{name}</p>
                    </div>

                    <div className="subtext">
                        <p className={dark} >{heroDescription}</p>
                    </div>

                    <div className="price">
                        <p className={dark}>₱{price}</p>
                    </div>
                </div>

                <div className='pic-area' data-aos='zoom-in'>
                    <img data-aos="fade-in" className='sm-img' src={image} />
                </div>

                <div className='buttons-container'>
                    <Link to= '/product'>
                        <button className="removeWishlist" onClick={()=>seeMore(id)}><RiArrowGoBackFill />
                        </button>
                    </Link>

                        <button>
                            <FiShoppingCart />
                        </button>
                    
                        <button>
                            <LuHeart/>
                        </button>
                </div>
            </div>

            <div className='content-container'>
                <div className='row-1' data-aos='fade-left'>
                    <div className='img-container'>
                        <img src={contentImg1} alt="" />
                    </div>
                    <div className='text-container-container'>
                        <div className='text-container'>
                            <div className='title-box'>
                                {contentTitle1}
                            </div>
                            <div className='description'>
                                {contentDescription1}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row-2' data-aos='fade-right'>
                    <div className='img-container'>
                        <img src={contentImg2} alt="" />
                    </div>
                    <div className='text-container-container'>
                        <div className='text-container'>
                            <div className='title-box'>
                                {contentTitle2}
                            </div>
                            <div className='description'>
                                {contentDescription2}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row-1' data-aos='fade-left'>
                    <div className='img-container'>
                        <img src={contentImg3} alt="" />
                    </div>
                    <div className='text-container-container'>
                        <div className='text-container'>
                            <div className='title-box'>
                                {contentTitle3}
                            </div>
                            <div className='description'>
                                {contentDescription3}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='specs-container' data-aos='zoom-in'>
                <div className='title'>
                    <p>Specifications</p>
                </div>

                <div className='grid1'>
                    <div className='no1'>
                        <div>No.</div>
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                        <div>8</div>
                        <div>9</div>
                        <div>10</div>
                        <div>11</div>
                    </div>
                    <div className='items1'>
                        <div>ITEMS</div>
                        <div>Product Number</div>
                        <div>Structure</div>
                        <div>Trigger switch</div>
                        <div>LED</div>
                        <div>Connection interface</div>
                        <div>Keycap material</div>
                        <div>Output key number</div>
                        <div>Printing technology</div>
                        <div>Dimensions</div>
                        <div>Weight</div>
                        <div>Origin of production</div>
                    </div>

                    <div className='detail1'>
                        <div>DETAILS</div>
                        <div>DKON2108ST</div>
                        <div>Mechanical structure</div>
                        <div>Cherry MX / Kailh / Gateron</div>
                        <div>RGB</div>
                        <div>USB 2.0</div>
                        <div>PBT</div>
                        <div>USB N-Key Rollover</div>
                        <div>Double-shot</div>
                        <div>450x140x40mm</div>
                        <div>1123g</div>
                        <div>Taiwan</div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}