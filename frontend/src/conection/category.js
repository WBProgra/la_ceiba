import axios from "axios";

export const getCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/category");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteCategories = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3001/api/category/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createCategory = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/category",
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/category/${id}`);
    return res.data;
  } catch (error) {
    return [];
  }
};

export const putCategory = async (id, data) => {
  try {
    const res = await axios.put(
      `http://localhost:3001/api/category/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAsyncCategories = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/category");
    const data = res.data.map((category) => ({
      value: category.CategoryID,
      label: category.category,
    }));
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};