import React, { useEffect, useState } from "react";
import { ICategory } from "../../../interfaces/category";
import { Button, Form, Input, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShopFilled } from "@ant-design/icons";
import { getOneCategory } from "../../../api/category";

interface IProps {
  onUpdate: (category: ICategory) => void;
}

const UpdateCategoryPage = (props: IProps) => {
  const { pcid } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState<ICategory>();
  useEffect(() => {
    const fetchDataCategory = async () => {
      const { data } = await getOneCategory(pcid);
      if (data) setCategory(data.productCategory);
    };

    fetchDataCategory();
  }, [pcid]);

  useEffect(() => {
    setFields();
  }, [category]);
  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: category?._id,
      name: category?.name,
      image: category?.image,
    });
  };

  const onFinish = (values: any) => {
    const category: ICategory = { ...values };

    props.onUpdate(category);
    alert("Cập nhật danh mục sản phẩm thành công");
    navigate("/admin/categories");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        <Typography.Title level={4}>
          Cập nhật danh mục sản phẩm
        </Typography.Title>

        <Link to={"/admin/products"} style={{ paddingLeft: "30px" }}>
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

      <Form form={form} style={{ maxWidth: 600 }} onFinish={onFinish}>
        <Form.Item
          label=""
          name="_id"
          style={{ display: "none" }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
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

        <div>
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
          <img
            src={category?.image}
            alt=""
            style={{
              width: "150px",
              height: "150px",
            }}
          />
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#56d4c1",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Cập nhật danh mục sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCategoryPage;
