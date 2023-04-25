import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import WebsiteLayout from "./pages/layouts/WebsiteLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { ICategory } from "./interfaces/category";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./api/category";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "./api/product";
import { IProduct } from "./interfaces/product";
import AdminLayout from "./pages/layouts/AdminLayout";
import DashBoardPage from "./pages/admin/DashBoardPage";
import ProductsDashBoardPage from "./pages/admin/products/ProductsDashBoardPage";
import CategoryDashBoardPage from "./pages/admin/categories/CategoryDashBoardPage";
import AddProductPage from "./pages/admin/products/AddProductPage";
import UpdateProductPage from "./pages/admin/products/UpdateProductPage";
import AddCategoryPage from "./pages/admin/categories/AddCategoryPage";
import UpdateCategoryPage from "./pages/admin/categories/UpdateCategoryPage";

const App = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchDataCategories = async () => {
      const { data } = await getAllCategory();
      setCategories(data.prodCategories);
    };

    fetchDataCategories();
  }, []);

  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchDataProducts = async () => {
      const { data } = await getAllProduct();
      setProducts(data.products);
    };

    fetchDataProducts();
  }, []);

  const onHandleRemoveProduct = (id: string) => {
    deleteProduct(id).then(() =>
      setProducts(products.filter((product) => product._id !== id))
    );
  };

  const onHandleAddProduct = (product: IProduct) => {
    addProduct(product).then(() => setProducts([...products, product]));
  };

  const onHandleUpdateProduct = (product: IProduct) => {
    updateProduct(product).then(() =>
      setProducts(
        products.map((item) => (item._id == product._id ? product : item))
      )
    );
  };

  const onHandleRemoveCategory = (id: string) => {
    deleteCategory(id).then(() =>
      setCategories(categories.filter((category) => category._id !== id))
    );
  };

  const onHandleAddCategory = (category: ICategory) => {
    addCategory(category).then(() => setCategories([...categories, category]));
  };

  const onHandleUpdateCategory = (category: ICategory) => {
    updateCategory(category).then(() =>
      setCategories(
        categories.map((item) => (item._id == category._id ? category : item))
      )
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route
            index
            element={<HomePage categories={categories} products={products} />}
          />

          <Route path="products">
            <Route
              index
              element={
                <ProductsPage categories={categories} products={products} />
              }
            />
            <Route
              path=":pid"
              element={<ProductDetailPage products={products} />}
            />
            <Route
              path="category/:cid"
              element={
                <ProductsPage categories={categories} products={products} />
              }
            />
          </Route>

          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <DashBoardPage products={products} categories={categories} />
            }
          />

          <Route path="products">
            <Route
              index
              element={
                <ProductsDashBoardPage
                  products={products}
                  categories={categories}
                  onRemove={onHandleRemoveProduct}
                />
              }
            />
            <Route
              path="add"
              element={
                <AddProductPage
                  categories={categories}
                  onAdd={onHandleAddProduct}
                />
              }
            />
            <Route
              path=":pid/update"
              element={
                <UpdateProductPage
                  categories={categories}
                  products={products}
                  onUpdate={onHandleUpdateProduct}
                />
              }
            />
          </Route>

          <Route path="categories">
            <Route
              index
              element={
                <CategoryDashBoardPage
                  categories={categories}
                  products={products}
                  onRemove={onHandleRemoveCategory}
                />
              }
            />

            <Route
              path="add"
              element={
                <AddCategoryPage
                  products={products}
                  onAdd={onHandleAddCategory}
                />
              }
            />

            <Route
              path=":pcid/update"
              element={<UpdateCategoryPage onUpdate={onHandleUpdateCategory} />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
