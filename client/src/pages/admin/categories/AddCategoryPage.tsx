import React from "react";
import { IProduct } from "../../../interfaces/product";
import { Button, Form, Input, Select, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShopFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { ICategory } from "../../../interfaces/category";

interface IProps {
  products: IProduct[];
  onAdd: (category: ICategory) => void;
}

const AddCategoryPage = (props: IProps) => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const category: ICategory = { ...values };

    props.onAdd(category);

    alert("Thêm danh mục sản phẩm thành công");
    navigate("/admin/categories");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        <Typography.Title level={4}>
          Thêm mới danh mục sản phẩm
        </Typography.Title>

        <Link to={"/admin/categories"} style={{ paddingLeft: "30px" }}>
          <Button
            type="primary"
            style={{
              backgroundColor: "blue",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "16px",
            }}
            icon={<ShopFilled />}
          >
            Quản lý danh mục sản phẩm
          </Button>
        </Link>
      </div>

      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Tên danh mục sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vào tên danh mục sản phẩm",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ảnh danh mục sản phẩm"
          name="image"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vào ảnh danh mục sản phẩm",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#56d4c1",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Thêm mới danh mục sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCategoryPage;
