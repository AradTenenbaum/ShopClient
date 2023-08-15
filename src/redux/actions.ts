import { ProductInterface } from "../interfaces/product.interface";
import { User } from "../interfaces/user.interface";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const getProducts = (products: ProductInterface[]) => ({
  type: GET_PRODUCTS,
  payload: products,
});

export const login = (user: User) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
  payload: [],
});
