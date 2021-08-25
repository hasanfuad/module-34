// import React, { useState } from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, prd)=> 
    total+prd.price * prd.quantity,0);
    let shipping = 0;

    if(totalPrice > 35){
        shipping = 0;
    }
    else if (totalPrice > 0){
        shipping = 12.99;
    }
    else if (totalPrice > 15){
        shipping = 4.99;
    }

    const tax = (totalPrice * 0.1);

    const grandTotal = tax+totalPrice + shipping;

    const finalGrandTotal = Number(grandTotal);

    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h3>Order Summary</h3>
            <h4>Items ordered: {cart.length}</h4>
            <div>
                <p>Items Price:$ {formatNumber(totalPrice)}</p>
                <p>Shipping: ${shipping}</p>
                <p>Estimated Tax:${formatNumber(tax)}</p>
                <h3>Order Total:${formatNumber(finalGrandTotal)} </h3>
                <br/>
                {props.children}

            </div>
        </div>
    );
};

export default Cart;