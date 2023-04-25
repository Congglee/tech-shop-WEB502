import React, { useEffect, useState } from "react";
import CategoryAside from "../components/CategoryAside";
import { ICategory } from "../interfaces/category";
import { IProduct } from "../interfaces/product";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getOneCategory } from "../api/category";
import {
  getAllProduct,
  getAllProducts,
  getFilteredPriceProducts,
  getSearchedProducts,
  getSortedProducts,
} from "../api/product";

interface IProps {
  categories: ICategory[];
  products: IProduct[];
}

const ProductsPage = (props: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategories(props.categories);
  }, [props]);

  const { cid } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const name = searchParams.get("name");
  const sort = searchParams.get("sort");

  const priceGte = searchParams.get("price[gte]");
  const priceLte = searchParams.get("price[lte]");

  const onHandleChangeSort = (e: any) => {
    const value = e.target.value;
    navigate(`/products/?sort=${value}`);
  };

  const onHandleChangeFilterPriceGte = (e: any) => {
    const value = e.target.value;
    const lteValue = document.getElementById("lte-input").value;
    let url = "/products/";
    if (value !== "") {
      url += `?price[gte]=${value}`;
      if (lteValue !== "") {
        url += `&price[lte]=${lteValue}`;
      }
    } else if (lteValue !== "") {
      url += `?price[lte]=${lteValue}`;
    }
    navigate(url);
  };

  const onHandleChangeFilterPriceLte = (e: any) => {
    const value = e.target.value;
    const gteValue = document.getElementById("gte-input").value;
    let url = "/products/";
    if (value !== "") {
      if (gteValue !== "") {
        url += `?price[gte]=${gteValue}&price[lte]=${value}`;
      } else {
        url += `?price[lte]=${value}`;
      }
    } else if (gteValue !== "") {
      url += `?price[gte]=${gteValue}`;
    }
    navigate(url);
  };

  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    if (cid) {
      const fetchDataCategoryProducts = async () => {
        const { data } = await getOneCategory(cid);
        setProducts(data.productCategory.products);
      };
      fetchDataCategoryProducts();
    } else if (name) {
      const fetchDataSearchProduct = async () => {
        const { data } = await getSearchedProducts(name);
        setProducts(data.products);
      };

      fetchDataSearchProduct();
    } else if (sort) {
      const fetchDataSortProduct = async () => {
        const { data } = await getSortedProducts(sort);
        setProducts(data.products);
      };

      fetchDataSortProduct();
    } else if (priceGte || priceLte) {
      const fetchDataFilterPriceProduct = async () => {
        const { data } = await getFilteredPriceProducts(
          Number(priceGte),
          Number(priceLte)
        );

        setProducts(data.products);
      };

      fetchDataFilterPriceProduct();
    }
    setProducts(props.products);
  }, [props, cid, name, sort, priceGte, priceLte]);

  return (
    <>
      <div className="pages bg-[#f7f7f7] py-[15px] mb-[35px]">
        <div className="pages-container px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              SẢN PHẨM
            </div>
            <div className="flex items-center gap-x-2 text-[#1c1d1d]">
              Trang chủ <i className="fa-solid fa-chevron-right text-[8px]"></i>
              Sản phẩm
            </div>
          </div>
        </div>
      </div>

      <div className="products mb-10">
        <div className="products-container px-[170px] flex gap-x-[22px]">
          <div className="products-aside w-[25%] flex-shrink-0">
            <CategoryAside categories={categories} products={products} />

            <div>
              <div className="py-[10px] px-5 bg-digital-400 text-white text-base">
                <span className="pl-[14px] uppercase font-semibold">
                  MUA SẮM THEO
                </span>
              </div>

              <div className="border border-solid border-[#ccc]">
                <div className="py-[15px] px-[20px]">
                  <div className="text-[#505050] text-[17px] font-semibold mb-[10px]">
                    Sắp xếp theo
                  </div>

                  <select
                    name=""
                    id=""
                    className="border border-solid border-gray-500 p-2 w-full"
                    onChange={onHandleChangeSort}
                  >
                    <option value="">Sản phẩm nổi bật</option>
                    <option value="">Bán chạy nhất</option>
                    <option value="name">Theo bảng chữ cái, A-Z</option>
                    <option value="-name">Theo bảng chữ cái, Z-A</option>
                    <option value="price">Giá tăng dần</option>
                    <option value="-price">Giá giảm dần</option>
                  </select>
                </div>

                <div className="py-[15px] px-[20px]">
                  <div className="text-[#505050] text-[17px] font-semibold mb-[10px]">
                    Giá
                  </div>

                  <div className="border border-solid border-gray-300 w-full">
                    <div className="border-b border-solid border-gray-300">
                      <div className="p-2 text-[#505050] leading-6">
                        Giá cao nhất là 46.893.977,41 VND. Giá trị đầu vào mặc
                        định là VND
                      </div>
                    </div>

                    <form action="" className="px-4 py-6">
                      <div className="mb-[10px] flex items-center gap-x-[6px]">
                        <label htmlFor="" className="text-[#505050] text-xs">
                          VND
                        </label>
                        <input
                          type="number"
                          placeholder="Từ"
                          className="w-full bg-[#f6f6f6] pl-[10px] border-none"
                          id="gte-input"
                          onChange={onHandleChangeFilterPriceGte}
                        />
                      </div>

                      <div className="mb-[10px] flex items-center gap-x-[6px]">
                        <label htmlFor="" className="text-[#505050] text-xs">
                          VND
                        </label>
                        <input
                          type="number"
                          placeholder="Đến"
                          className="w-full bg-[#f6f6f6] pl-[10px] border-none"
                          id="lte-input"
                          onChange={onHandleChangeFilterPriceLte}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="products-list w-[75%] flex-1">
            <div className="grid grid-cols-3 gap-x-[22px]">
              {products.map((product, index) => {
                return (
                  <div
                    className="border border-solid border-[#ccc] px-[15px] mb-10 pb-6 pt-[15px]"
                    key={product._id}
                  >
                    <div className="w-[250px] h-[250px] mb-5">
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={product.images?.[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>

                    <div>
                      <h3 className="text-[#505050] text-base mb-[6px]">
                        <Link to={`/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <div className="text-[#f1b400] text-xs flex gap-x-[2px] mb-[10px]">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <span className="text-base">
                        {product.price.toLocaleString().replace(",", ".")} VND
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pagination">
              <div className="pagination-container text-base px-[170px] text-center">
                <a href="#" className="pr-4">
                  1
                </a>
                <a href="#" className="pr-4">
                  2
                </a>
                <a href="#" className="pr-4">
                  3
                </a>

                <i className="fa-sharp fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
