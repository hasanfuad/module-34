import React, { useState } from 'react';
import './Shop.css';

import fakeData from '../../fakeData'

const Shop = () => {

    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);

    return (
        <div>
            <h1>Length: {products.length}</h1>
           {
               products.map(pd => <li>{pd.name}</li>)
           }
        </div>
    );
};

export default Shop;