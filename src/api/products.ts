import axios from "axios";
import { SERVER_URL } from "../utils/constants";

export async function getProductsApi(searchTerm: string) {
  if (searchTerm.length > 0) {
    const result = await axios.get(
      `${SERVER_URL}/product/all/?q=${searchTerm}`
    );
    return result.data.products;
  }
  return [];
}
