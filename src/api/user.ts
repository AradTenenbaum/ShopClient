import axios, { AxiosError } from "axios";
import { SERVER_URL } from "../utils/constants";

export const loginApi = async (username: string, password: string) => {
  try {
    const result = await axios.post(`${SERVER_URL}/user/login`, {
      username,
      password,
    });
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const registerApi = async (username: string, password: string) => {
  try {
    const result = await axios.post(`${SERVER_URL}/user/register`, {
      username,
      password,
    });
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const addFavoriteApi = async (category: string, token: string) => {
  try {
    const result = await axios.post(
      `${SERVER_URL}/user/add-favorite`,
      {
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getFavoritesApi = async (token: string) => {
  try {
    const result = await axios.get(`${SERVER_URL}/user/get-favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.favorites;
  } catch (error: any) {
    return error.response.data;
  }
};
