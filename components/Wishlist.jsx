import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import ProductData from './ProductData'
import ProductContext from './Product-Context';
import WishItem from './Wish-Item';
import Footer from './Footer';
import { TbMoodEmpty } from 'react-icons/tb';


    const Wishlist = () => {
    const {wishItems, getTotalWishList} = useContext(ProductContext)
    const totalItems = getTotalWishList()
    const navigate = useNavigate()
    return (
        <div className='container'>   
        <div className=''>
            <h1>Favorites</h1>
        </div>
        <div className='wishItems'>
            {ProductData.map((product) => {
            if (wishItems[product.id] !== false ){
                return <WishItem data={product} />;
            }
            })}
            </div>
            {totalItems > 0 ?
            <div className='checkout'>
            <p>Subtotal: ${totalItems}</p>
            <button onClick={() => navigate("/products")}>Continue Shopping</button>
            </div>
            :<h1 className=''>Your Wishlist is Empty{<TbMoodEmpty/>}</h1>}
            <Footer/>
        </div>
    )
}

export default Wishlist