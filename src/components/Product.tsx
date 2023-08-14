import React from "react";
import { ProductInterface } from "../interfaces/product.interface";

function Product({ product }: { product: ProductInterface }) {
  return (
    <li style={styles.product}>
      <img src={product.image} alt={product.title} />
      <div>
        <strong>{product.title}</strong>
        {product.price !== "" ? <div>Price: ${product.price}</div> : <div />}
        <a href={product.link}>Purchase now</a>
      </div>
    </li>
  );
}

const styles = {
  product: {
    marginBottom: "8px",
    padding: "8px",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
};

export default Product;
