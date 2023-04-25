import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();
  let userData = JSON.parse(localStorage.getItem("userData")!);
  // console.log(userData);

  let role;
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const decodedToken: any = jwt_decode(accessToken);
    role = decodedToken.role;
  }

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    const inputValue = e.target.searchInput.value;
    const searchUrl = `/products?name=${inputValue}`;
    navigate(searchUrl);
  };

  const handleLogout = () => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("userData")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      navigate(0);
    }
  };

  return (
    <header className="header">
      <div className="header-topbar bg-digital-400 mb-[35px]">
        <div className="header-topbar-container px-[170px] py-2.5 flex justify-between items-center">
          <div className="header-order-online text-white flex text-xs">
            <div className="border-r border-solid border-[#ccc] pr-2">
              <span>
                ĐẶT HÀNG TRỰC TUYẾN HOẶC GỌI CHO CHÚNG TÔI (+1800) 000 8808
              </span>
            </div>
            <div className="pl-2 cursor-pointer">
              <span> VND </span>
              <i className="fa-sharp fa-solid fa-chevron-down" />
            </div>
          </div>
          <div className="header-auth flex items-center gap-x-2 text-white text-xs">
            {userData && role === "admin" ? (
              <div className="dropdown">
                <Link to="/">
                  Hello {userData.firstname} {userData.lastname}
                  <div className="dropdown-container">
                    <div className="dropdown-col">
                      <div className="dropdown-list">
                        <div className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400 border-b-2 border-solid border-[#d3d3d3] pb-2">
                          <Link to={"/admin"}>Quản trị Admin</Link>
                        </div>
                        <div className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400 border-b-2 border-solid border-[#d3d3d3] pb-2">
                          Tài khoản
                        </div>
                        <div className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400 border-b-2 border-solid border-[#d3d3d3] pb-2">
                          Giỏ hàng
                        </div>
                        <div className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400 border-b-2 border-solid border-[#d3d3d3] pb-2">
                          Hóa đơn
                        </div>
                        <div
                          className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ) : role === "user" ? (
              <div className="dropdown">
                <Link to="/">
                  Hello {userData.firstname} {userData.lastname}
                  <div className="dropdown-container">
                    <div className="dropdown-col">
                      <div className="dropdown-list">
                        <div className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400 border-b-2 border-solid border-[#d3d3d3] pb-2">
                          Tài khoản
                        </div>
                        <div className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400 border-b-2 border-solid border-[#d3d3d3] pb-2">
                          Giỏ hàng
                        </div>
                        <div className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400 border-b-2 border-solid border-[#d3d3d3] pb-2">
                          Hóa đơn
                        </div>
                        <div
                          className="dropdown-item mb-[10px] text-[#505050] text-xs hover:text-digital-400"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/signin">Đăng nhập</Link>
                <Link
                  to="/signup"
                  className="border-l border-solid border-[#ccc] pl-3"
                >
                  Tạo tài khoản
                </Link>
              </>
            )}

            <div className="header-socials flex items-center">
              <div className="border-l border-solid border-[#ccc] pl-3 pr-3">
                <i className="fa-brands fa-facebook-f" />
              </div>
              <div className="border-l border-solid border-[#ccc] pl-3 pr-3">
                <i className="fa-brands fa-twitter" />
              </div>
              <div className="border-l border-solid border-[#ccc] pl-3 pr-3">
                <i className="fa-brands fa-instagram" />
              </div>
              <div className="border-l border-solid border-[#ccc] pl-3 pr-3">
                <i className="fa-brands fa-google" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-container px-[170px]">
        <div className="header-content flex justify-between items-center mb-[45px]">
          <div className="header-logo">
            <Link to="/">
              <img
                src="https://cdn.shopify.com/s/files/1/1903/4853/files/logo_digital_new_250x.png?v=1613166683"
                alt=""
              />
            </Link>
          </div>
          <div className="header-infors flex gap-6">
            <div className="border-r border-solid border-[#ccc] pr-6 text-center">
              <div className="text-[13px]">
                <i className="fa-solid fa-phone text-digital-400 pr-2.5" />
                <span className="font-semibold"> (+1800) 000 8808</span>
              </div>
              <div className="text-[#505050] text-xs">
                Thứ Hai-Thứ Bảy 9:00AM - 8:00PM
              </div>
            </div>
            <div className="border-r border-solid border-[#ccc] pr-6 text-center">
              <div className="text-[13px]">
                <i className="fa-solid fa-envelope text-digital-400 pr-2.5" />
                <span className="font-semibold"> SUPPORT@TADATHEMES.COM</span>
              </div>
              <div className="text-[#505050] text-xs">
                Hỗ trợ trực tuyến 24/7
              </div>
            </div>
            <div className="border-r border-solid border-[#ccc] pr-6">
              <div className="flex items-center justify-center h-10 text-xl text-digital-400">
                <i className="fa-regular fa-heart" />
              </div>
            </div>
            <div>
              <div className="h-10 flex items-center justify-center gap-2">
                <i className="fa fa-shopping-bag text-xl text-digital-400" />
                <span>1 mặt hàng</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-nav flex justify-between items-center border-y-2 border-solid border-[#eee] py-3">
          <ul className="header-menu flex gap-x-[30px]">
            <li>
              <Link to="/" className="uppercase pr-2">
                Trang chủ
              </Link>
              <i className="fa-solid fa-caret-down" />
            </li>
            <li>
              <div className="dropdown-menu">
                <Link to="/products" className="uppercase pr-2">
                  Sản phẩm
                </Link>
                <i className="fa-solid fa-caret-down" />
                <div className="dropdown-menu-container">
                  <div className="dropdown-menu-image">
                    <img
                      src="https://cdn.shopify.com/s/files/1/1636/8779/articles/blog4_345x.jpg"
                      alt=""
                      className="mb-2"
                    />
                    <p>
                      Lorem ipsum dolor sit amet, quod fabellas hendrerit per
                      eu, mea populo epicuri et, ea possim numquam mea.
                    </p>
                  </div>
                  <div className="dropdown-menu-col">
                    <h2 className="text-[#505050] text-lg font-semibold uppercase mb-5">
                      Laptop
                    </h2>
                    <div className="dropdown-menu-list">
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Asus
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Dell
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Acer
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Lenovo
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        HP
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Macbook
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-menu-col">
                    <h2 className="text-[#505050] text-lg font-semibold uppercase mb-5">
                      Tablet
                    </h2>
                    <div className="dropdown-menu-list">
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        iPad
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Samsung
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Acer
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Asus
                      </div>
                      <div className="dropdown-menu-item mb-[10px] text-[#505050] text-sm hover:text-digital-400">
                        Lenovo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href="#" className="uppercase pr-2">
                Blogs
              </a>
              <i className="fa-solid fa-caret-down" />
            </li>
            <li>
              <a href="#" className="uppercase pr-2">
                Giới thiệu
              </a>
              <i className="fa-solid fa-caret-down" />
            </li>
            <li>
              <a href="#" className="uppercase pr-2">
                Liên hệ chúng tôi
              </a>
              <i className="fa-solid fa-caret-down" />
            </li>
          </ul>
          <form action="" onSubmit={onHandleSubmit}>
            <input
              type="text"
              className="outline-none border-none text-sm"
              placeholder="Tìm kiếm gì đó"
              name="searchInput"
            />
            <button className="pl-2">Tìm kiếm</button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
