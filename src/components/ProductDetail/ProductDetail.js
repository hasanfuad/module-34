import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Products from "../Products/Products";

const ProductDetail = () => {
  const { productKey } = useParams();
  const product = fakeData.find((pd) => pd.key === productKey);
  return (
    <div>
      <h1>{productKey} This product detail</h1>
      <Products showAddToCart={false} product={product} />
    </div>
  );
};

export default ProductDetail;
