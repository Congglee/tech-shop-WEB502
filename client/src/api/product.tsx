import { IProduct } from "../interfaces/product";
import instance from "./instance";

const accessToken = localStorage.getItem("accessToken");

const getAllProduct = (limit?: number, page?: number, name?: string) => {
  if (name) {
    return instance.get(`/products?limit=${limit}&page=${page}&name=${name}`);
  }
  return instance.get(`/products?limit=${limit}&page=${page}`);
};

const getAllProducts = (
  options: { name?: string; limit?: number; page?: number } = {}
) => {
  const { name, limit = 9, page = 1 } = options;
  if (name) {
    return instance.get(`/products?limit=${limit}&page=${page}&name=${name}`);
  }
  return instance.get(`/products?limit=${limit}&page=${page}`);
};

const getOneProduct = (id?: string) => {
  return instance.get(`/products/${id}`);
};

const addProduct = (product: IProduct) => {
  return instance.post(`/products`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const updateProduct = (product: IProduct) => {
  return instance.put(`/products/${product._id}`, product, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteProduct = (id?: string) => {
  return instance.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getSearchedProducts = (name?: string) => {
  return instance.get(`/products/?name=${name}`);
};

const getSortedProducts = (sort?: string) => {
  return instance.get(`/products/?sort=${sort}`);
};

const getFilteredPriceProducts = (pricegte?: number, pricelte?: number) => {
  if (pricelte && !pricegte) {
    return instance.get(`/products/?price[lte]=${pricelte}`);
  } else if (pricegte && !pricelte) {
    return instance.get(`/products/?price[gte]=${pricegte}`);
  } else if (pricegte && pricelte) {
    return instance.get(
      `/products/?price[gte]=${pricegte}&price[lte]=${pricelte}`
    );
  }
  return instance.get(`/products/`);
};

const updateUploadImageProduct = (id?: string, images?: any) => {
  return instance.put(`/products/uploadimage/${id}`, images, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getAllProduct,
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getSearchedProducts,
  getSortedProducts,
  getFilteredPriceProducts,
  updateUploadImageProduct,
};
