import React, {useState} from 'react'
import '../css/Product.css'
import prodHero from '../assets/prodHero.jpg'
import Footer from './Footer';
import Items from './Items';
import FilteredProduct from './FilteredProducts';
import ProductData from './ProductData';
import Nav from './Nav';
import { BsSearch } from "react-icons/bs";
import Aos from 'aos';
import 'aos/dist/aos.css'

    const Products = () => {
    const [Search, setSearch] = useState("");
    return (      
        <div className='products'>
            <Nav />
            <div className='prod-hero-container'>
            <img src={prodHero} alt="prod hero img" />
                <div className='text-container'>
                    <p className='text1'>OUR PRODUCT</p>
                    <p className='text2'>Mechanical Keyboard</p>
                    <p className='text3'>Made to provide the ultimate typing experience</p>
                </div>
            </div>

            <div className="search-bar-container">
                <div className="bar">
                    <div className='icon-container'>
                        <BsSearch />
                    </div>
                    <div className='input-container'>
                        <input id="searchInput" type="text" placeholder="  Search Keyboard" onChange={(e) => {
                                setSearch(e.target.value);
                            }} />
                    </div>
                </div>
            </div>

            <div className='prod-heading-container'>
                <p>PRODUCTS</p>
            </div>
        
            <div className='items-container'>
            {ProductData
            .filter((item) => {
            if (Search == ""){
            return item;
            } else if (item.name.toLowerCase().includes(Search.toLocaleLowerCase())||
            item.category.toLowerCase().includes(Search.toLocaleLowerCase())){
                return item; 
            }
        })
            .map((product) => (
            <Items data={product} />
        ))}
            </div>
            <Footer/>
        </div>

    
    );
}


export default Products