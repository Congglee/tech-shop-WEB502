import { Button, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { ICategory } from "../../../interfaces/category";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { IProduct } from "../../../interfaces/product";
import { ColumnsType } from "antd/es/table";

interface IProps {
  categories: ICategory[];
  products: IProduct[];
  onRemove: (id: string) => void;
}

const CategoryDashBoardPage = (props: IProps) => {
  const [products, setProducts] = useState<ICategory[]>([]);
  useEffect(() => {
    setProducts(props.products);
  }, [props]);

  const removeCategory = (id: string) => {
    if (confirm("Bạn có chắc là muốn xóa danh mục sản phẩm này chứ?"))
      props.onRemove(id);
  };

  const data = props.categories.map((category) => {
    return {
      key: category._id,
      name: category.name,
      image: category.image,
      products: products,
    };
  });

  const columns: ColumnsType<ICategory> = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",

      render: (name) => <a>{name}</a>,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} style={{ width: "80px" }} />,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "green" }}>
            <Link to={`/admin/categories/${record.key}/update`}> Sửa</Link>
          </Button>
          <Button
            type="primary"
            danger
            style={{ backgroundColor: "red" }}
            onClick={() => removeCategory(record.key)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
          gap: "0 30px",
        }}
      >
        <Typography.Title level={4}>Quản lý danh mục sản phẩm</Typography.Title>

        <Link to={"/admin/categories/add"}>
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
            icon={<EditOutlined />}
          >
            Thêm Danh Mục Sản Phẩm Mới
          </Button>
        </Link>
      </div>

      <Table<ICategory>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CategoryDashBoardPage;
