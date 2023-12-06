import React, { createContext, useState } from 'react'
import ProductData from './ProductData';

    const ProductContext = createContext(null);

const getDefaultCart = () => {
    let cart = {}
    for (let i =1; i < ProductData.length +1; i++){
        cart[i] = 0;
    }
    return cart;
};
const getDefaultWish = () => {
    let wish = {}
    for (let i =1; i < ProductData.length +1; i++){
        wish[i] = false;
    }
    return wish;
};
const getDefaultSeeMore = () => {
    let see = {}
    for (let i =1; i < ProductData.length +1; i++){
        see[i] = false;
    }
    return see;
};


export const ProductContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const [wishItems , setWishItems] = useState(getDefaultWish());

    const [seeItems , setSeeItems] = useState(getDefaultSeeMore());

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] +1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] -1 }));
    };

    const updateCartAmount = (newAmount, itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: newAmount }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0 ) {
                let itemInfo = ProductData.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }

    const getTotalCheckoutPrice = () => {
        let checkoutPrice = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0 ) {
                let itemInfo = ProductData.find((product) => product.id === Number(item));
                checkoutPrice += cartItems[item] * itemInfo.price + 13;
            }
        }
        return checkoutPrice;
    }

    const addToWishList = (itemId) => {
        setWishItems((prev) => ({...prev, [itemId]: !prev[itemId]}));
    };
    const getTotalWishList = () => {
        let totalItem = 0;
        for (const item in wishItems) {
            if (wishItems[item] > 0 ) {
                let itemInfo = ProductData.find((product) => product.id === Number(item));
                totalItem += wishItems[item] * itemInfo.price;
            }
        }
        return totalItem;
    }
    const seeMore = (itemId) => {
        setSeeItems((prev) => ({...prev, [itemId]: !prev[itemId]}));
    };

    const getTotalProductAmount = () => {
        let totalProduct = 0;
        for (const item in seeItems) {
            if (seeItems[item] > 0 ) {
                let itemInfo = ProductData.find((product) => product.id === Number(item));
                totalProduct += seeItems[item] * itemInfo.price;
            }
        }
        return totalProduct;
    }


    const contextValue = {cartItems, addToCart, removeFromCart, updateCartAmount, addToWishList, wishItems,getTotalCartAmount,getTotalWishList,seeItems, seeMore,getTotalProductAmount, getTotalCheckoutPrice}


    

return (
<ProductContext.Provider value={contextValue}>{props.children}</ProductContext.Provider>
);
};



export default ProductContext