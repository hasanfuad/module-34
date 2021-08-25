import React, { useEffect, useState } from 'react';
import './Shop.css';

import fakeData from '../../fakeData'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'

const Shop = () => {

    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const savedCartKey = Object.keys(savedCart);

        const previousProduct = savedCartKey.map(exsistentKey => {
            const product = fakeData.find(pdKey => pdKey.key === exsistentKey);
            product.quantity = savedCart[exsistentKey];
            return product;
        });
        setCart(previousProduct);
    },[]);

    
    const handleAddCartBtn = ((product)=>{
        console.log("Product added", product);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);

        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count);

    })
    

    return (
        <div className="twin-container">
            <div className="product-container">
            {
               products.map((pd)=> <Products key={pd.key} showAddToCart={true} product={pd} testing={handleAddCartBtn}/>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}/>
                <Link to="/review"><button className="add-to-cart-btn">Review your order</button></Link>
            </div>
           
        </div>
        )
                }

export default Shop;