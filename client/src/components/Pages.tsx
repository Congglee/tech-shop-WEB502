import React from "react";

type Props = {};

const Pages = (props: Props) => {
  return (
    <div className="pages bg-[#f7f7f7] py-[15px] mb-[35px]">
      <div className="pages-container px-[170px]">
        <div>
          <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
            PRODUCTS
          </div>
          <div className="flex items-center gap-x-2 text-[#1c1d1d]">
            Home <i className="fa-solid fa-chevron-right text-[8px]"></i>
            Products
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
