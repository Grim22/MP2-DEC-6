import React, {useContext} from 'react'
import ProductContext from './Product-Context';
import '../css/CartHero.css'
import '../css/CartItem.css'

export const CartItem = (props) => {
    const{id, name, model, image, price} = props.data;
    const {cartItems, addToCart, removeFromCart, updateCartAmount} = useContext(ProductContext)
    return ( 
        <div className='cartItem'>
            <img src={image} />
            <div className='description'>
                <p>{name}</p>
                <p>₱{price}</p>
            </div>
        </div>
    )
}