import React from 'react';

const ReviewItems = (props) => {
    const {name, quantity} = props.product;

    const styles = {
        borderBottom: '1px solid lightGray',
        padding: '10px',
        color: 'black',
        marginLeft: '200px'
    }
    return (
        <div style={styles}>
            <h3 className="product-name">{name}</h3>
            <p>Quantity: {quantity}</p>
            <br/>
            <button className="add-to-cart-btn">Remove</button>
        </div>
    );
};

export default ReviewItems;