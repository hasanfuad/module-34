import React from 'react';
import './Products.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const Products = (props) => {
    const {name,seller,price,img,stock,key} = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="product-images"/>
            </div>
            <div className="product-detail">
                <h3 style={{color: "purple"}}><Link to={"/product/"+key}>{name}</Link></h3>
                <h3>${price}</h3>
                <p>by:{seller}</p>
                <p>Only {stock} left</p>
                {props.showAddToCart && <button onClick={() => props.testing(props.product)} className="add-to-cart-btn"><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}
            </div>
        </div>
    );
};

export default Products;