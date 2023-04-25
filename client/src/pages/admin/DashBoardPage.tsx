import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { ReactNode, useState, useEffect } from "react";
import { IProduct } from "../../interfaces/product";
import { ICategory } from "../../interfaces/category";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

interface IProps {
  products: IProduct[];
  categories: ICategory[];
}

const DashBoardPage = (props: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategories(props.categories);
  }, [props]);

  const [products, setProducts] = useState<ICategory[]>([]);
  useEffect(() => {
    setProducts(props.products);
  }, [props]);

  const countCategories = categories.length;
  const countProducts = products.length;

  return (
    <div>
      <Typography.Title level={2} style={{ padding: "20px 0" }}>
        DashBoard Admin
      </Typography.Title>
      <Space direction="horizontal" style={{ display: "flex", gap: "0 45px" }}>
        <DashBoardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0, 255, 0, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Sản phẩm"}
          value={countProducts}
        />
        <DashBoardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0, 255, 255, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Danh mục"}
          value={countCategories}
        />
        <DashBoardCard
          icon={
            <UserOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255, 0, 0, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Tài khoản"}
          value={20}
        />
      </Space>
    </div>
  );
};

const DashBoardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <Card style={{ border: "solid 2px #c897c6", width: "250px" }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
};

export default DashBoardPage;
