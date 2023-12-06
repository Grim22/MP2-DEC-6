import React, {useContext} from 'react'
import ProductData from './ProductData';
import ProductContext from './Product-Context';
import { useNavigate } from 'react-router-dom';
import { TbMoodEmpty } from "react-icons/tb";
import { SeeMoreItems } from './SeeMoreItems';
import Footer from './Footer';



export const SeeMore = () => {
    const {seeItems, getTotalProductAmount} = useContext(ProductContext)
    const totalProduct = getTotalProductAmount()
    const navigate = useNavigate()
    return (
        <div className='seemore'>   
            <div className='seeItems'>
                {ProductData.map((product) => {
                if (seeItems[product.id] !== false ){
                    return <SeeMoreItems data={product} />;
                }
                })}
                {totalProduct > 0 ?
                <div className='checkout'>
                    <p hidden>Subtotal: ${totalProduct}</p>
                </div>
                :
                <div className=''>
                    <h1 className=''>No Product Selected{<TbMoodEmpty/>}</h1>
                    <button className=''>Go back to Product Page</button>
                </div>
                }
            </div>
        </div>
    )
}