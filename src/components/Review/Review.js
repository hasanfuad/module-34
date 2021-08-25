import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  // processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItems from "../ReviewItems/ReviewItems";

import happyImage from '../../images/giphy.gif';
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);

  const [placedOrder, setPlacedOrder] = useState(false);
  const history = useHistory()

  const handleProceedCheckout=(()=>{
        setCart([]);
        // setPlacedOrder(true)
        // processOrder();
        history.push('/shipping');


  })
  const removeProducts = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const saveItems = getDatabaseCart();
    const productKeys = Object.keys(saveItems);

    const cartItems = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = saveItems[key];
      return product;
    });
    setCart(cartItems);
  }, []);

let thankYou;

if(placedOrder){
    thankYou = <img src={happyImage} alt={happyImage}/>
}


  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItems key={pd.key} removeProducts={removeProducts} cart={pd}></ReviewItems>
        ))}
        {thankYou};
      </div>
      <div className="cart-container">
          <Cart cart={cart}>
              <button onClick={handleProceedCheckout} className="add-to-cart-btn">Proceed checkout</button>
          </Cart>
      </div>
    </div>
  );
};

export default Review;
