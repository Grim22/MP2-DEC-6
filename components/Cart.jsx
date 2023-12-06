import React, {useContext} from 'react'
import { useState } from 'react';
import ProductData from './ProductData';
import ProductContext from './Product-Context';
import { CartItem } from "./Cart-Item";
import { Link, useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/offcanvas';
import Checkout from './Checkout';
import '../css/Offcanvas.css'
import '../css/CartHero.css'
import carthero from '../assets/carthero.jpg'
import Nav from './Nav'
import { MdOutlineClose } from "react-icons/md";
import '../css/Modal.css'



    const Cart = () => {
    const {cartItems, getTotalCartAmount, getTotalCheckoutPrice} = useContext(ProductContext)
    const totalAmount = getTotalCartAmount()
    const checkoutPrice = getTotalCheckoutPrice()
    const navigate = useNavigate()
    const [show,setShow] = useState(false);
    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}
    const [modal,setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }
    return (
        <div className='cart'>   
        <Nav/>
            <div className='carthero'>
                <img src={carthero} alt="" />
                <p className='heading'>CART</p>
            </div>
            <div className='cartItems'>
                {ProductData.map((product) => {
                if (cartItems[product.id] !== 0 ){
                    return <CartItem data={product} />;
                }
                })}
                {totalAmount > 0 ?
                
                <div className='checkout'>
                    <p hidden>Subtotal: ${totalAmount}</p>
                    <button onClick={() => navigate("/product")}>Continue Shopping</button>
                    <button className='checkoutButton' onClick={handleShow}>Checkout</button>
                </div>
                :
                <div className='empty'>
                    <p className=''>
                        Your Cart is Empty :(
                    </p>
                    <button onClick={() => navigate("/product")}>
                        Continue Shopping
                    </button>
                </div>}
            </div>
            
            <>
                <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <MdOutlineClose />
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='heading'>
                        <p>Checkout</p>
                    </div>
                    
                    <div>
                    {ProductData.map((product) => {
                    if (cartItems[product.id] !== 0 ){
                        return <Checkout data={product} />;
                    }
                    })}
                    </div>
                
                    <div className='totals'>
                        <p>Subtotal: ₱{totalAmount}</p>
                        <p>Shipping Fee: ₱13</p>
                        <p>GrandTotal: ₱{checkoutPrice}</p>
                        <button onClick={toggleModal}>Place order</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            </>
            
            {modal && (
                <div className='modal'>
                    <div className='overlay'></div>
                    <div className='modal-content'>
                        <p className='heading'>Thank You for Your Purchase on Keebs <br /> Your New Keyboard is on its Way!</p>
                        <p className='subtext'>We are thrilled to inform you that your recent purchase on Keebs has been successfully processed! Your satisfaction is our top priority, and we can't wait for you to experience the exceptional features of your new keyboard. 
                        </p>
                        <Link to='/'>
                            <button className='close-modal'>
                                <MdOutlineClose />
                            </button>
                        </Link>
                    </div>
                </div>
            )}
    </div>
    )
}

export default Cart