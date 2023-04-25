import React from "react";
import { Space } from "antd";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import SideBarAdmin from "../../components/admin/SideBarAdmin";
import { Outlet } from "react-router-dom";
import FooterAdmin from "../../components/admin/FooterAdmin";
import "../../styles/index.css";

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <div className="AdminApp">
      <HeaderAdmin />
      <Space className="SideBarAndContent">
        <SideBarAdmin></SideBarAdmin>
        <div className="AdminContent">
          <Outlet />
        </div>
      </Space>
      <FooterAdmin />
    </div>
  );
};

export default AdminLayout;
