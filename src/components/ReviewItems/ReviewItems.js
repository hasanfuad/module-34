import React from 'react';

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.cart;
    const styles={
        borderBottom: '1px solid lightGray',
        padding: '10px',
        color: "black"
    }
    return (
        <div style={styles}>
            <h2>{name}</h2>
            <h4>Qty: {quantity}</h4>
            <p>Price: {price}$</p>
            <button onClick={()=>props.removeProducts(key)} className="add-to-cart-btn">Remove</button>
        </div>
    );
};

export default ReviewItems;