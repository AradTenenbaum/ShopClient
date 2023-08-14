import React from "react";
import Product from "./Product";
import { ProductInterface } from "../interfaces/product.interface";

function ProductList({ products }: { products: ProductInterface[] }) {
  return (
    <div>
      {products.length > 0 ? (
        <div style={styles.productList}>
          <ul style={styles.list}>
            {products.map((product, i) => (
              <Product key={i} product={product} />
            ))}
          </ul>
        </div>
      ) : (
        <div style={styles.productList}>Search for products</div>
      )}
    </div>
  );
}

const styles = {
  productList: {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    overflow: "auto",
    height: "60vh",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
};

export default ProductList;
