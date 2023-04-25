import React, { useEffect, useState } from "react";
import { ICategory } from "../interfaces/category";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/product";

interface IProps {
  categories: ICategory[];
  products: IProduct[];
}

const CategoryAside = (props: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategories(props.categories);
  }, [props]);

  return (
    <div className="banner-aside mb-5">
      <div className="banner-aside-title py-[10px] px-5 bg-digital-400 text-white text-base">
        <span className="pl-[14px] uppercase font-semibold">Danh mục</span>
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
  );
};

export default CategoryAside;
