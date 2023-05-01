import axios from "axios";

export const getProducts = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/product");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3001/api/product/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createProduct = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/product",
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/product/${id}`);
    return res.data;
  } catch (error) {
    return [];
  }
};

export const putProduct = async (id, data) => {
  try {
    const res = await axios.put(
      `http://localhost:3001/api/product/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    return null;
  }
}