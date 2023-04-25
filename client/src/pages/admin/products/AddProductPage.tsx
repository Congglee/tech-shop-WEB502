import { ShopFilled } from "@ant-design/icons";
import { Button, Form, Input, Select, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICategory } from "../../../interfaces/category";
import { IProduct } from "../../../interfaces/product";

interface IProps {
  categories: ICategory[];
  onAdd: (product: IProduct) => void;
}

const AddProductPage = (props: IProps) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategories(props.categories);
  }, [props]);

  const onFinish = (values: any) => {
    // let images: string[] = [];
    // if (values.images.trim().includes(" ")) {
    //   images = values.images.split(" - ");
    // } else {
    //   images = [values.images];
    // }
    // const product: IProduct = { ...values, images };
    // props.onAdd(product);

    // Khởi một đối tượng FormData mới. Đối tượng này là một class JavaScript tích hợp cho phép dễ dàng xây dựng các cặp key-value có thể được gửi trong một yêu cầu HTTP.
    const formData: any = new FormData();

    // Nối thêm một số cặp key-value vào đối tượng FormData. Các giá trị được lấy từ đối tượng value, được truyền dưới dạng tham số cho hàm onFinish. Các key được sử dụng để nối thêm vào đối tượng FormData khớp với các key được sử dụng để truy cập các trường form trong đối tượng values. Dữ liệu form được thêm vào đối tượng FormData bao gồm name, price, description, categoryId và file hình ảnh.
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);

    // Vòng lặp value.images.fileList.forEach được sử dụng để nối các file hình ảnh vào đối tượng FormData. Thuộc tính fileList của đối tượng value.images chứa một mảng các file hình ảnh đã tải lên. Vòng lặp forEach lặp qua mảng và nối từng file vào đối tượng FormData bằng thuộc tính originFileObj.
    values.images.fileList.forEach((file: any) => {
      formData.append("images", file.originFileObj);
    });

    // Sau khi đối tượng FormData được xây dựng đầy đủ, hàm onAdd được gọi và chuyển đối tượng FormData làm đối số.
    props.onAdd(formData);
    alert("Thêm sản phẩm thành công");
    navigate("/admin/products");
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
        <Typography.Title level={4}>Thêm mới sản phẩm</Typography.Title>

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
            Quản lý sản phẩm
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
        encType="multipart/form-data"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vào tên sản phẩm",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vào giá sản phẩm",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          name="images"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vào ảnh sản phẩm",
            },
            // {
            //   pattern: /^(?:\s*[\w]+\s*(?:\s*-\s*[\w]+\s*)*)?$/,
            //   message: `Vui lòng nhập ảnh theo định dạng "ảnh 1 - ảnh 2 - ảnh 3"`,
            // },
          ]}
        >
          {/* <Input type="text" /> */}
          <Upload multiple={true} listType="picture">
            <Button>Nhấn để upload ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea cols={40} rows={10} />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn một danh mục",
            },
          ]}
        >
          <Select
            style={{ width: 200 }}
            // onChange={handleChange}
            options={categories.map((category) => ({
              label: category.name,
              value: category._id,
            }))}
            placeholder={categories[0].name}
          />
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
            Thêm mới sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductPage;
