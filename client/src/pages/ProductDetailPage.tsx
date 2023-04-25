import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IProduct } from "../interfaces/product";
import { getOneProduct } from "../api/product";

interface IProps {
  products: IProduct[];
}

const ProductDetailPage = (props: IProps) => {
  const { pid } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    setProducts(props.products);
  }, [props]);

  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    const fetchDataProduct = async () => {
      const { data } = await getOneProduct(pid);
      if (data) setProduct(data.productData);
    };

    fetchDataProduct();
  }, [pid]);

  const relatedProducts = products.filter(
    (item) =>
      item._id !== product?._id && item.categoryId === product?.categoryId?._id
  );

  return (
    <>
      <div className="pages bg-[#f7f7f7] py-[15px] mb-[35px]">
        <div className="pages-container px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              {product?.name}
            </div>
            <div className="flex items-center gap-x-2 text-[#1c1d1d]">
              Home <i className="fa-solid fa-chevron-right text-[8px]"></i>
              {product?.name}
            </div>
          </div>
        </div>
      </div>

      <div className="product mb-7">
        <div className="product-container px-[170px] flex gap-x-[66px]">
          <div className="product-images w-[50%] flex-shrink-0">
            <div className="flex">
              <div>
                {product?.images?.map((image, index) => {
                  return (
                    <div
                      className="w-[75px] h-[75px] cursor-pointer"
                      key={index + 1}
                    >
                      <img src={image} alt="" />
                    </div>
                  );
                })}
              </div>

              <div className="w-[460px] h-[460px] border border-solid border-[#eee] cursor-pointer">
                <img src={product?.images[0]} alt="" className="" />
              </div>
            </div>
          </div>

          <div className="product-content w-[50%] flex-1">
            <h2 className="text-3xl font-semibold uppercase mb-[18px]">
              {product?.name}
            </h2>

            <span className="text-xl mb-6 inline-block">
              {" "}
              {product?.price.toLocaleString().replace(",", ".")} VND
            </span>
            <div className="mb-3">
              <i className="fa fa-star text-[#f1b400]"></i>
              <i className="fa fa-star text-[#f1b400]"></i>
              <i className="fa fa-star text-[#f1b400]"></i>
              <i className="fa fa-star text-[#f1b400]"></i>
              <i className="fa fa-star text-[#f1b400]"></i>

              <span className="pl-2">1 đánh giá</span>
            </div>

            <div className="mb-4">
              <span className="text-[#151515] font-semibold pr-2">
                Số lượng
              </span>
              <input
                type="number"
                min={0}
                step={1}
                value={1}
                className="pl-2 h-8 w-[120px]"
              />
            </div>

            <button className="bg-digital-400 w-full text-white py-[12px] uppercase font-semibold mb-5">
              Thêm vào giỏ hàng
            </button>

            <div className="flex gap-x-[14px]">
              <div className="w-[35px] h-[35px] flex items-center justify-center bg-black text-white rounded-[50%]">
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <div className="w-[35px] h-[35px] flex items-center justify-center bg-black text-white rounded-[50%]">
                <i className="fa-brands fa-twitter"></i>
              </div>
              <div className="w-[35px] h-[35px] flex items-center justify-center bg-black text-white rounded-[50%]">
                <i className="fa-brands fa-pinterest"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-desc mb-[30px]">
        <div className="product-desc-container px-[170px]">
          <div className="flex gap-x-1">
            <div className="py-[9px] px-5 bg-[#f1f1f1] cursor-pointer uppercase">
              Mô tả
            </div>
            <div className="py-[9px] px-5 bg-[#f1f1f1] cursor-pointer uppercase">
              BẢO HÀNH
            </div>
            <div className="py-[9px] px-5 bg-[#f1f1f1] cursor-pointer uppercase">
              VẬN CHUYỂN
            </div>
            <div className="py-[9px] px-5 bg-[#f1f1f1] cursor-pointer uppercase">
              Thanh toán
            </div>
            <div className="py-[9px] px-5 bg-[#f1f1f1] cursor-pointer uppercase">
              PHẢN HỒI KHÁCH HÀNG
            </div>
          </div>

          <div className="p-5 border border-solid border-[#ebebeb]">
            <p>{product?.description}</p>
          </div>
        </div>
      </div>

      <div className="related-products mb-[90px]">
        <div className="related-products-container px-[170px]">
          <div className="border-b-2 border-solid border-digital-400 mb-[50px]">
            <div className="text-lg font-semibold uppercase">
              CÁC KHÁCH HÀNG KHÁC CŨNG MUA:
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-5">
            {relatedProducts.map((product, index) => {
              if (index <= 4)
                return (
                  <div
                    className="border border-solid border-[#ccc] p-[15px]"
                    key={product._id}
                  >
                    <div className="mb-5">
                      <Link to={`/products/${product._id}`}>
                        <img src={product.images[0]} alt="" />
                      </Link>
                    </div>

                    <div>
                      <Link
                        to={`/products/${product._id}`}
                        className="text-[#2b3743] text-base mb-[6px] inline-block"
                      >
                        {product.name}
                      </Link>
                      <div className="mb-3 text-[#f1b400] text-xs">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <span className="text-[#2b3743] text-base">
                        {product.price.toLocaleString().replace(",", ".")}
                      </span>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
