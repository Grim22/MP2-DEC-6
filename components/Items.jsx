import React, { useContext, useEffect } from 'react'
import ProductContext from './Product-Context';
import { FiShoppingCart } from "react-icons/fi"
import { LuHeart } from "react-icons/lu";
import { Link } from 'react-router-dom';
import '../css/Product.css'
import { SeeMore } from './SeeMore';
import Aos from 'aos';
import 'aos/dist/aos.css'


    const Items = (props) => {

    const{id, name, category, image, price} = props.data;
    const {addToCart, cartItems, addToWishList, wishItems,seeMore} = useContext(ProductContext)
    const cartAmount = cartItems[id]
    
    useEffect(()=> {
        Aos.init({duration: 1000})
    },[])

    return  (
        <div className='items' data-aos='fade-up'>
            <div className='items-display'>
                <div className='category-container'>
                    <p className='category'>{category}</p>
                </div>
                <img src={image} />
                <p className='name'>{name}</p>
                <p className='price'>₱{price}</p>
            </div>
            <div className='hidden-buttons'>
                <Link to='/seemore'><button className='viewmore btns' onClick={() => seeMore(id)}>View More</button></Link>
                <button className='add-to-cart btns' onClick={()=> addToCart(id)}><FiShoppingCart /></button>
                <button
                    className="add-to-wish-list btns"
                    onClick={() => addToWishList(id)}
                >
                    <LuHeart/>
                </button>
            </div>       
        </div>  
    )
}

export default Items