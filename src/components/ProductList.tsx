import React from "react";
import Product from "./Product";
import { ProductInterface } from "../interfaces/product.interface";
import { Grid } from "@mui/material";

function ProductList({ products }: { products: ProductInterface[] }) {
  return (
    <div>
      {
        <Grid overflow="auto" height="65vh" container spacing={3}>
          {products.length > 0 ? (
            products.map((product, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Product product={product} />
              </Grid>
            ))
          ) : (
            <div></div>
          )}
        </Grid>
      }
    </div>
  );
}

export default ProductList;
