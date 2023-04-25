import React from "react";

type Props = {};

const Filter = (props: Props) => {
  return (
    <div className="filter mb-4">
      <div className="filter-container px-[170px]">
        <div className="border border-solid border-[#ccc] px-3 pt-[12px] pb-[27px] flex justify-between">
          <div>
            <div className="text-[#505050] font-semibold mb-[10px]">
              Danh mục
            </div>
            <div className="flex gap-x-[7px]">
              <div className="p-4 text-xs border border-solid border-gray-500">
                <a href="#"> Laptop</a>
              </div>
              <div className="p-4 text-xs border border-solid border-gray-500">
                <a href="#"> Laptop</a>
              </div>
              <div className="p-4 text-xs border border-solid border-gray-500">
                <a href="#"> Laptop</a>
              </div>
              <div className="p-4 text-xs border border-solid border-gray-500">
                <a href="#"> Laptop</a>
              </div>
              <div className="p-4 text-xs border border-solid border-gray-500">
                <a href="#"> Laptop</a>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[#505050] font-semibold mb-[10px]">
              Sắp xếp
            </div>
            <select
              name=""
              id=""
              className="border border-solid border-gray-500 p-3"
            >
              <option value="">Featured</option>
              <option value="">Best selling</option>
              <option value="">Alphabetically, A-Z</option>
              <option value="">Alphabetically, Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
