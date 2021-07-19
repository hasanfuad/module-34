// import React, { useState } from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const totalPrice = cart.reduce((total, prd)=> total+prd.price,0)
    const toalPrecise = Math.round(totalPrice)
    return (
        <div>
            <h3>Order Summary</h3>
            <h4>Items ordered: {cart.length}</h4>
            <div>
                <p>Items:</p>
                <p>Shipping: ${cart.shipping}</p>
                <p>Total Before tax:</p>
                <p>Estimated Tax:</p>
                <h3>Order Total:{toalPrecise} </h3>
                <button>Review your order</button>
            </div>
        </div>
    );
};

export default Cart;