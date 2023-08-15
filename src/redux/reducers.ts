import { ProductInterface } from "../interfaces/product.interface";
import { User } from "../interfaces/user.interface";
import { GET_PRODUCTS, LOGIN, LOGOUT } from "./actions";

export interface RootState {
  products: ProductInterface[];
  user?: User;
}

const initialState: RootState = {
  products: [],
};

interface Action {
  type: string;
  payload: ProductInterface[] | User;
}

const rootReducer = (state = initialState, action: Action): RootState => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...(action.payload as ProductInterface[])],
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload as User,
      };
    case LOGOUT:
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
};

export default rootReducer;
