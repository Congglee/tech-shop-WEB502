import {
  AppstoreAddOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const SideBarAdmin = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="SideBarAdmin">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Website",
            key: "/",
            icon: <AppstoreAddOutlined />,
          },
          {
            label: "DashBoard",
            key: "/admin",
            icon: <AppstoreAddOutlined />,
          },
          {
            label: "Sản phẩm",
            key: "products",
            icon: <ShopOutlined />,
          },
          {
            label: "Danh mục",
            key: "categories",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Tài khoản",
            key: "users",
            icon: <UserAddOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default SideBarAdmin;
