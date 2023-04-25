import { ICategory } from "../interfaces/category";
import instance from "./instance";

const accessToken = localStorage.getItem("accessToken");

const getAllCategory = () => {
  return instance.get("/categories");
};

const getOneCategory = (id?: string) => {
  return instance.get(`/categories/${id}`);
};

const addCategory = (category: ICategory) => {
  return instance.post("/categories", category, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const updateCategory = (category: ICategory) => {
  return instance.put(`/categories/${category._id}`, category, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteCategory = (id?: string) => {
  return instance.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getAllCategory,
  getOneCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
