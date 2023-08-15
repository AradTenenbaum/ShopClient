import React from "react";
import { ProductInterface } from "../interfaces/product.interface";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

function Product({ product }: { product: ProductInterface }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ maxWidth: 300 }}
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price !== "" ? (
              <div>Price: ${product.price}</div>
            ) : (
              <div></div>
            )}
            <div>Rate: ⭐{product.rate}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={product.link}>Purchase Now!</Link>
      </CardActions>
    </Card>
  );
}

export default Product;
