import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer>
        <div className="footer-top bg-digital-400">
          <div className="footer-top-container px-[170px] py-[25px] flex flex-row justify-between items-center">
            <div className="text-white">
              <div className="text-xl uppercase">
                ĐĂNG KÝ ĐỂ NHẬN TIN MỚI NHẤT
              </div>
              <div className="text-[13px]">
                Đăng ký ngay bây giờ và nhận tin hàng tuần
              </div>
            </div>

            <form action="" className="relative">
              <input
                type="text"
                placeholder="Địa chỉ email"
                className="px-5 py-4 bg-[#ffffff1a] outline-none text-white rounded-[30px] w-[590px] pr-12"
              />
              <button className="absolute w-5 h-5 right-5 top-1/2 translate-y-[-50%] text-white">
                <i className="fa-solid fa-envelope"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-middle bg-[#191919]">
          <div className="footer-middle-container py-[50px] px-[170px] flex flex-row gap-x-5">
            <div className="basis-1/3 flex-shrink-0">
              <div className="text-white text-[15px] uppercase pl-[15px] mb-5 font-semibold relative after:content-[''] after:absolute after:w-[3px] after:h-[100%] after:bg-digital-400 after:top-0 after:left-0">
                VỀ CHÚNG TÔI
              </div>

              <div className="text-white mb-5">
                <div className="text-[13px] mb-[10px]">
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  <span className="pl-2">
                    Địa chỉ:
                    <span className="text-[#b7b7b7] pl-1">
                      474 Ontario St Toronto, ON M4X 1M7 Canada
                    </span>
                  </span>
                </div>

                <div className="text-[13px] mb-[10px]">
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  <span className="pl-2">
                    Điện thoại:
                    <span className="text-[#b7b7b7] pl-1">(+1234)56789xxx</span>
                  </span>
                </div>

                <div className="text-[13px] mb-[10px]">
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  <span className="pl-2">
                    Mail:
                    <span className="text-[#b7b7b7] pl-1">
                      congltph27602@fpt.edu.vn
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-x-[7px] text-base text-white">
                <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
                <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                  <i className="fa-brands fa-twitter"></i>
                </div>
                <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                  <i className="fa-brands fa-pinterest"></i>
                </div>
                <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                  <i className="fa-brands fa-google-plus-g"></i>
                </div>
                <div className="w-10 h-10 rounded-[3px] bg-[#ffffff1a] cursor-pointer flex items-center justify-center">
                  <i className="fa-brands fa-instagram"></i>
                </div>
              </div>
            </div>

            <div className="basis-1/6 flex-grow">
              <div className="text-white text-[15px] uppercase pl-[15px] mb-5 font-semibold relative after:content-[''] after:absolute after:w-[3px] after:h-[100%] after:bg-digital-400 after:top-0 after:left-0">
                THÔNG TIN
              </div>

              <div className="text-[#b7b7b7] text-[13px]">
                <div className="mb-[10px]">Bộ sưu tập</div>
                <div className="mb-[10px]">Vị trí cửa hàng</div>
                <div className="mb-[10px]">Ưu đãi hôm nay</div>
                <div className="mb-[10px]">Liên hệ</div>
              </div>
            </div>

            <div className="basis-1/6 flex-grow">
              <div className="text-white text-[15px] uppercase pl-[15px] mb-5 font-semibold relative after:content-[''] after:absolute after:w-[3px] after:h-[100%] after:bg-digital-400 after:top-0 after:left-0">
                CHÚNG TA LÀ AI
              </div>

              <div className="text-[#b7b7b7] text-[13px]">
                <div className="mb-[10px]">Trợ giúp</div>
                <div className="mb-[10px]">Miễn phí vận chuyển</div>
                <div className="mb-[10px]">FAQs</div>
                <div className="mb-[10px]">Chứng thực</div>
                <div className="mb-[10px]">Chính sách đổi trả</div>
              </div>
            </div>

            <div className="basis-1/6 flex-grow">
              <div className="text-white text-[15px] uppercase pl-[15px] mb-5 font-semibold relative after:content-[''] after:absolute after:w-[3px] after:h-[100%] after:bg-digital-400 after:top-0 after:left-0">
                #DIGITALWORLDSTORE
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-container bg-[#0f0f0f] px-[170px] py-5">
            <span className="text-white">Powered by congltph27602</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
