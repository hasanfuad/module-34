import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {

    const [cart, setCart] = useState([]);
    useEffect(() => {
        // cart
        const savedItems = getDatabaseCart();
        const productKeys = Object.keys(savedItems);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedItems[key]
            return product;
        });
        setCart(cartProducts);
        
    },[]);
    return (
        <div>
            {
                cart.map(pd => <ReviewItems key={pd.key} product={pd}></ReviewItems>)
            }
        </div>
    );
};

export default Review;