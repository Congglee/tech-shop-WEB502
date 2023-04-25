import React, { useEffect, useState } from "react";
import { IProduct } from "../../../interfaces/product";
import { ICategory } from "../../../interfaces/category";
import { Button, Form, Input, Select, Typography, Upload } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShopFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { getOneProduct, updateUploadImageProduct } from "../../../api/product";

interface IProps {
  onUpdate: (product: IProduct) => void;
  categories: ICategory[];
  products: IProduct[];
}

const UpdateProductPage = (props: IProps) => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategories(props.categories);
  }, [props]);

  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    const fetchDataProduct = async () => {
      const { data } = await getOneProduct(pid);
      if (data) setProduct(data.productData);
    };

    fetchDataProduct();
  }, [pid]);

  // useEffect hook được sử dụng để chạy hàm setFields mỗi khi trạng thái product thay đổi. Hàm setFields đặt giá trị của các trường form thành giá trị tương ứng của đối tượng product
  useEffect(() => {
    setFields();
  }, [product]);
  // Form.useForm hook được sử dụng để tạo một form instance mới và phương thức setFieldsValue được gọi để đặt các giá trị ban đầu của các trường form dựa trên đối tượng product
  // Instance của form là một đối tượng được tạo ra bởi Ant Design để thực hiện các chức năng của form trong React

  const [form] = Form.useForm();

  const setFields = () => {
    // const productImages = product?.images?.join(" - ");
    // Phương thức setFieldsValue được gọi để đặt các giá trị ban đầu của các trường form dựa trên đối tượng product

    // Phương thức setFieldsValue được gọi với một đối tượng chứa các cặp key-value cho từng trường form. Key tương ứng với thuộc tính tên của thành phần Form.Item và giá trị là giá trị tương ứng của đối tượng product.
    form.setFieldsValue({
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      images: product?.images,
      description: product?.description,
      categoryId: product?.categoryId?._id,
    });
  };

  // Tóm gọn lại đoạn mã code này đang khởi tạo các trường form với các giá trị của đối tượng product, có thể được sử dụng để cập nhật thông tin sản phẩm trong form

  const onFinish = (values: any) => {
    // let images: string[] = [];
    // if (values.images.includes(" ")) {
    //   images = values.images.split(" - ");
    // } else {
    //   images = [values.images];
    // }
    // const product: IProduct = { ...values, images };
    // props.onUpdate(product);

    // Khởi một đối tượng FormData mới. Đối tượng này là một class JavaScript tích hợp cho phép dễ dàng xây dựng các cặp key-value có thể được gửi trong một yêu cầu HTTP.
    const formData = new FormData();
    // Kiểm tra nếu tồn tại images trong đối tượng values và fileList trong thuộc tính images
    if (values.images && values.images.fileList) {
      // Vòng lặp value.images.fileList.forEach được sử dụng để nối các file hình ảnh vào đối tượng FormData. Thuộc tính fileList của đối tượng value.images chứa một mảng các file hình ảnh đã tải lên. Vòng lặp forEach lặp qua mảng và nối từng file vào đối tượng FormData bằng thuộc tính originFileObj.
      values.images.fileList.forEach((file: any) => {
        formData.append("images", file.originFileObj);
      });
      updateUploadImageProduct(pid, formData);

      values.images = [];
      props.onUpdate(values);
    } else {
      props.onUpdate(values);
    }

    alert("Cập nhật sản phẩm thành công");
    navigate("/admin/products");
  };

  const productsCategories = categories.filter(
    (category) => category._id !== product?.categoryId?._id
  );

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
        <Typography.Title level={4}>Cập nhật sản phẩm</Typography.Title>

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

      <Form form={form} style={{ maxWidth: 600 }} onFinish={onFinish}>
        {/* Cần phải truyền cả _id vào form khi submit để lấy được giá trị _id truyền lên props.onAdd của component App */}
        <Form.Item
          label=""
          name="_id"
          style={{ display: "none" }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập vào tên sản phẩm" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập vào giá sản phẩm" },
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
          {/* <Input /> */}
          <Upload multiple={true} listType="picture">
            <Button>Nhấn để upload ảnh</Button>
          </Upload>
        </Form.Item>
        <div
          style={{ display: "flex", marginBottom: "20px", cursor: "pointer" }}
        >
          {product?.images.map((productImage, index) => {
            return (
              <img
                key={index + 1}
                src={productImage}
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                }}
              />
            );
          })}
        </div>

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
          <Select defaultValue={product?.categoryId?._id}>
            {
              <Select.Option value={product?.categoryId?._id}>
                {product?.categoryId?.name}
              </Select.Option>
            }

            {productsCategories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

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
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProductPage;
