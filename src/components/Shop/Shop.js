import React, { useState } from 'react';
import './Shop.css';

import fakeData from '../../fakeData'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/databaseManager';

const Shop = () => {

    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    // console.log(first10);

    const [cart, setCart] = useState([]);

    
    const handleAddCartBtn = ((product)=>{
        // console.log("Product added", product);
        const newCart = [...cart, product]
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    })
    

    return (
        <div className="shop-container">
            <div className="product-container">
            {
               products.map((pd)=> <Products showAddToCart={true} key={pd.key} product={pd} testing={handleAddCartBtn}/>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}/>
            </div>
           
        </div>
        )
                }

export default Shop;