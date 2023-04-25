import React, { useEffect, useState } from "react";
import { ICategory } from "../interfaces/category";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/product";

interface IProps {
  categories: ICategory[];
  products: IProduct[];
}

const HomePage = (props: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategories(props.categories);
  }, [props]);

  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    setProducts(props.products);
  }, [props]);

  return (
    <>
      <div className="banner mb-[30px] mt-5">
        <div className="banner-container px-[170px] flex gap-x-5 justify-between">
          <div className="banner-aside w-[25%] flex-1">
            <div className="banner-aside-title py-[10px] px-5 bg-digital-400 text-white text-base">
              <i className="fa fa-list"></i>
              <span className="pl-[14px] uppercase font-semibold">
                Tất cả danh mục
              </span>
            </div>

            <div className="banner-aside-list border border-solid border-[#ccc]">
              {categories.map((category, index) => {
                return (
                  <div
                    className="banner-aside-item flex items-center py-[15px] px-[20px]"
                    key={category._id}
                  >
                    <img src={category.image} alt="" className="w-5" />
                    <Link
                      to={`/products/category/${category._id}`}
                      className="pl-[9px]"
                    >
                      {category.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="banner-slider w-[75%] flex-shrink-0">
            <img
              src="https://i.pinimg.com/originals/c7/28/58/c72858992482c70d5ec3a585eec352ed.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="special-products mb-5">
        <div className="special-products-container px-[170px] flex gap-x-5 ">
          <div className="specials-products-deals w-[25%] flex-1 border border-solid border-[#ccc] p-3">
            <div className="text-xl mb-[50px]">
              <i className="fa fa-star text-digital-400"></i>
              <span className="uppercase text-[#505050] font-semibold pl-2">
                ƯU ĐÃI HÀNG NGÀY
              </span>
            </div>

            <div>
              <div className="mb-5">
                <a href="#">
                  <img
                    src="	https://cdn.shopify.com/s/files/1/1903/4853/products/Untitled-189_400x.jpg?v=1491404918"
                    alt=""
                  />
                </a>
              </div>

              <div className="text-center mb-[15px]">
                <h3 className="mb-2 text-[#505050] text-base">
                  <a href="#">Motorola Moto 360 (2nd gen)</a>
                </h3>
                <div className="mb-3 text-[#f1b400] text-sm flex gap-x-[2px] justify-center">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <span className="text-black text-base uppercase">
                  8.213.394,79 VND
                </span>
              </div>

              <div className="flex gap-x-[4px] justify-center mb-[15px]">
                <div className="w-[80px] h-[63px] flex flex-col items-center justify-center bg-[#ebebeb]">
                  <span className="text-[#151515] text-lg font-semibold">
                    0
                  </span>
                  <span className="text-xs text-[#8b8b8b]">Giờ</span>
                </div>

                <div className="w-[80px] h-[63px] flex flex-col items-center bg-[#ebebeb] justify-center">
                  <span className="text-[#151515] text-lg font-semibold">
                    0
                  </span>
                  <span className="text-xs text-[#8b8b8b]">Phút</span>
                </div>

                <div className="w-[80px] h-[63px] flex flex-col items-center bg-[#ebebeb] justify-center">
                  <span className="text-[#151515] text-lg font-semibold">
                    0
                  </span>
                  <span className="text-xs text-[#8b8b8b]">Giây</span>
                </div>
              </div>

              <div className="text-center py-[11px] px-[15px] bg-digital-400 text-white uppercase cursor-pointer">
                <i className="fa fa-bars"></i>
                <span className="pl-2">TÙY CHỌN</span>
              </div>
            </div>
          </div>

          <div className="special-products-main w-[75%] flex-shrink-0">
            <div className="flex border-b-2 border-solid border-digital-400 pb-[17px] mb-5 font-semibold uppercase text-xl">
              <div className="border-r border-solid border-[#ccc] pr-6 text-[#151515]">
                BÁN CHẠY NHẤT
              </div>
              <div className="pl-6 border-r border-solid border-[#ccc] pr-6">
                HÀNG MỚI VỀ
              </div>
              <div className="pl-6">TABLET</div>
            </div>

            <div className="flex gap-x-5 mb-5">
              {products.slice(0, 3).map((product) => {
                return (
                  <div
                    className="px-4 pt-4 pb-6 border border-solid border-[#ccc]"
                    key={product._id}
                  >
                    <div className="mb-6">
                      <Link to={`products/${product._id}`}>
                        <img src={product.images[0]} alt="" />
                      </Link>
                    </div>

                    <div>
                      <h3 className="text-[#2b3743] text-lg">
                        <a href="#">{product.name}</a>
                      </h3>
                      <div className="text-[#f1b400] mb-[4px]">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <span className="text-[#2b3743] text-base">
                        {product.price.toLocaleString().replace(",", ".")} VND
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row gap-x-5">
              <a href="#" className="basis-1/2">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                  alt=""
                  className="w-full h-full"
                />
              </a>

              <a href="#" className="basis-1/2">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                  alt=""
                  className="w-full h-full"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="featured-products">
        <div className="featured-products-container px-[170px]">
          <div className="mb-5 text-xl font-semibold uppercase border-b-2 border-solid border-digital-400 pb-3">
            SẢN PHẨM NỔI BẬT
          </div>

          <div className="grid grid-cols-3 gap-x-5">
            {products.slice(0, 6).map((product) => {
              return (
                <div
                  className="flex border border-solid border-[#ccc] py-4 pl-4 gap-x-5 mb-5"
                  key={product._id}
                >
                  <div className="w-[85px] h-[85px]">
                    <Link to={`products/${product._id}`}>
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="text-[#505050] mb-2 inline-block text-base"
                    >
                      {product.name}
                    </a>
                    <div className="text-[#f1b400] text-[10px] flex items-center gap-x-[3px] mb-[9px]">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <span className="text-[13px]">
                      {product.price.toLocaleString().replace(",", ".")} VND
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="gallery mb-5">
        <div className="gallery-container px-[170px] flex flex-row gap-x-5 justify-between">
          <div>
            <a href="#">
              <img
                src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
                alt=""
              />
            </a>
          </div>

          <div className="flex flex-col gap-y-5 justify-between">
            <div>
              <a href="#">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                  alt=""
                />
              </a>
            </div>

            <div>
              <a href="#">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                  alt=""
                />
              </a>
            </div>
          </div>

          <div>
            <a href="#">
              <img
                src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>

      <div className="new-arrivals mb-5">
        <div className="new-arrivals-container px-[170px]">
          <div className="flex flex-row justify-between items-center border-b-2 border-solid border-digital-400 pb-3 mb-5">
            <div className="text-xl font-semibold uppercase">HÀNG MỚI VỀ</div>

            <div className="flex items-center gap-x-[45px]">
              <a href="#">Smartphone</a>
              <a href="#">Tablet</a>
              <a href="#">Laptop</a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-5">
            {products.slice(0, 3).map((product) => {
              return (
                <div
                  className="border border-solid border-[#ccc] p-[15px]"
                  key={product._id}
                >
                  <div className="mb-5">
                    <Link to={`products/${product._id}`}>
                      <img src={product.images[0]} alt="" />
                    </Link>
                  </div>

                  <div>
                    <Link
                      to={`products/${product._id}`}
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
                      {product.price.toLocaleString().replace(",", ".")} VND
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hot-collections">
        <div className="hot-collections-container px-[170px]">
          <div className="mb-5 text-xl font-semibold uppercase border-b-2 border-solid border-digital-400 pb-3">
            SẢN PHẨM HOT
          </div>

          <div className="grid grid-cols-3 gap-x-5">
            <div className="border border-solid border-[#ccc] pt-4 pb-[30px] px-[50px] flex gap-x-[44px] mb-5">
              <div className="w-[150px] h-[130px] cursor-pointer">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/mobile-devices_300x.jpg?v=1613166682"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-[#505050] font-semibold mb-[10px]">
                  SMARTPHONE
                </div>

                <div className="text-[#808080]">
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Apple</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Samsung</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">LG</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Asus</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Nokia</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">BlackBerry</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-solid border-[#ccc] pt-4 pb-[30px] px-[50px] flex gap-x-[44px] mb-5">
              <div className="w-[150px] h-[130px] cursor-pointer">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/pc-1_300x.jpg?v=1613166682"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-[#505050] font-semibold mb-[10px]">
                  TABLET
                </div>

                <div className="text-[#808080]">
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">iPad</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Samsung</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Acer</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Asus</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Lenovo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-solid border-[#ccc] pt-4 pb-[30px] px-[50px] flex gap-x-[44px] mb-5">
              <div className="w-[150px] h-[130px] cursor-pointer">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/laptop_300x.jpg?v=1613166811"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-[#505050] font-semibold mb-[10px]">
                  LAPTOP
                </div>

                <div className="text-[#808080]">
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Asus</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Dell</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Acer</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Lenovo</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">HP</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Macbook</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-solid border-[#ccc] pt-4 pb-[30px] px-[50px] flex gap-x-[44px] mb-5">
              <div className="w-[150px] h-[130px]">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/headphone_8467ba67-70c7-4977-b57e-8847d56549c6_300x.jpg?v=1613166811"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-[#505050] font-semibold mb-[10px]">
                  PHỤ KIỆN
                </div>

                <div className="text-[#808080]">
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Đồng hồ thông minh</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Headphone</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Bluetooth</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Bàn phím</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Apple</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-solid border-[#ccc] pt-4 pb-[30px] px-[50px] flex gap-x-[44px] mb-5">
              <div className="w-[150px] h-[130px] cursor-pointer">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/television_300x.jpg?v=1613166810"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-[#505050] font-semibold mb-[10px]">
                  Tivi
                </div>

                <div className="text-[#808080]">
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Apple</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Samsung</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">LG</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Asus</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Nokia</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-solid border-[#ccc] pt-4 pb-[30px] px-[50px] flex gap-x-[44px] mb-5">
              <div className="w-[150px] h-[130px]">
                <img
                  src="https://cdn.shopify.com/s/files/1/1903/4853/files/printer_300x.jpg?v=1613166810"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-[#505050] font-semibold mb-[10px]">
                  MÁY IN
                </div>

                <div className="text-[#808080]">
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">iPad</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Samsung</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Acer</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Asus</span>
                  </div>
                  <div className="mb-4">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                    <span className="pl-1">Lenovo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-posts mb-[60px]">
        <div className="blog-posts-container px-[170px]">
          <div className="mb-5 text-xl font-semibold uppercase border-b-2 border-solid border-digital-400 pb-3">
            BLOG POSTS
          </div>

          <div className="grid grid-cols-3 gap-x-5">
            <div>
              <div className="mb-6">
                <a href="#">
                  <img
                    src="https://cdn.shopify.com/s/files/1/1903/4853/articles/blog1.jpg?v=1492594896"
                    alt=""
                  />
                </a>
              </div>

              <div className="text-center">
                <a
                  href="#"
                  className="font-semibold uppercase text-base mb-[17px] inline-block"
                >
                  Đây là 5 điện thoại tốt nhất bạn có thể mua ngay bây giờ
                </a>

                <div className="flex flex-row gap-x-[14px] justify-center mb-3 text-[#808080] text-[13px]">
                  <div>
                    <i className="fa-regular fa-calendar-days"></i>
                    <span className="pl-2">December 13, 2016</span>
                  </div>

                  <div>
                    <i className="fa-regular fa-message"></i>
                    <span className="pl-2">1 comment</span>
                  </div>
                </div>

                <div className="text-[#505050] text-[13px]">
                  Từ những người bỏ túi đắt tiền cho đến những người đẹp ngân
                  sách yêu thích của chúng tôi. Bạn đã cập nhật mọi thứ bạn cần
                  biết trước khi mua điện thoại và bây giờ...
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <a href="#">
                  <img
                    src="https://cdn.shopify.com/s/files/1/1903/4853/articles/blog13.jpg?v=1492595088"
                    alt=""
                  />
                </a>
              </div>

              <div className="text-center">
                <a
                  href="#"
                  className="font-semibold uppercase text-base mb-[17px] inline-block"
                >
                  Ứng dụng TV mới của Apple hoạt động với tìm kiếm hợp nhất
                </a>

                <div className="flex flex-row gap-x-[14px] justify-center mb-3 text-[#808080] text-[13px]">
                  <div>
                    <i className="fa-regular fa-calendar-days"></i>
                    <span className="pl-2">December 13, 2016</span>
                  </div>

                  <div>
                    <i className="fa-regular fa-message"></i>
                    <span className="pl-2">1 comment</span>
                  </div>
                </div>

                <div className="text-[#505050] text-[13px]">
                  Bản cập nhật cho phần mềm di động iOS của Apple cũng mang đến
                  hàng trăm biểu tượng cảm xúc mới cho iPhone và iPad của bạn --
                  và giữ cho cặp mông đào yêu quý đó...
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <a href="#">
                  <img
                    src="https://cdn.shopify.com/s/files/1/1903/4853/articles/blog12.jpg?v=1492595082"
                    alt=""
                  />
                </a>
              </div>

              <div className="text-center">
                <a
                  href="#"
                  className="font-semibold uppercase text-base mb-[17px] inline-block"
                >
                  Năm 2017, camera điện thoại của bạn sẽ có siêu năng lực
                </a>

                <div className="flex flex-row gap-x-[14px] justify-center mb-3 text-[#808080] text-[13px]">
                  <div>
                    <i className="fa-regular fa-calendar-days"></i>
                    <span className="pl-2">December 13, 2016</span>
                  </div>

                  <div>
                    <i className="fa-regular fa-message"></i>
                    <span className="pl-2">1 comment</span>
                  </div>
                </div>

                <div className="text-[#505050] text-[13px]">
                  Thực tế ảo là một khái niệm hơi dễ hiểu trong năm 2016. Bạn
                  đeo tai nghe vào, bạn thấy mình đang ở trong thế giới 3D.
                  Nhưng thực tế tăng cường -- AR...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="brands mb-[35px]">
        <div className="brands-container px-[170px] flex flex-row justify-center gap-x-[76px]">
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/logo-1_large_large_768f374b-12c0-4dd0-b9ef-7585f08cdc38_160x160.png?v=1613166661"
            alt=""
          />
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/logo-2_large_large_1c0f984f-9760-4b73-866e-10b9d225d851_160x160.png?v=1613166661"
            alt=""
          />
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/logo-3_large_large_3c4606a2-a297-403f-98ec-271ece5c40db_160x160.png?v=1613166661"
            alt=""
          />
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/logo-4_large_large_f4d00a02-3fbf-4bf1-81a6-daec160e076f_160x160.png?v=1613166661"
            alt=""
          />
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/logo-5_large_large_2629fcad-3956-4ce9-9265-c2e31d94a8c5_160x160.png?v=1613166661"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
