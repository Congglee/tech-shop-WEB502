import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct } from "../../../interfaces/product";
import { ICategory } from "../../../interfaces/category";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

interface IProps {
  products: IProduct[];
  categories: ICategory[];
  onRemove: (id: string) => void;
}

const ProductsDashBoardPage = (props: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategories(props.categories);
  }, [props]);

  const removeProduct = (id: string) => {
    if (confirm("Bạn có chắc là muốn xóa sản phẩm này chứ?"))
      props.onRemove(id);
  };

  // Tạo mảng dữ liệu mới dựa vào props.products
  const data = props.products.map((product) => {
    const categoriesName = categories
      .filter((category) => category._id == product.categoryId)
      .map((category) => category.name);

    return {
      key: product._id, // mã định danh duy nhất cho sản phẩm, trong trường hợp này sử dụng thuộc tính _id của đối tượng sản phẩm.
      name: product.name,
      price: product.price?.toLocaleString().replace(",", "."),
      images: product.images,
      description: product.description,
      categoryId: categoriesName.join(""),
    };
  });

  // Tạo mảng columns (cột) để tạo giao diện cho Table

  // Mỗi phần tử trong mảng columns là một đối tượng xác định một cột duy nhất của bảng. Chú thích loại ColumnsType<IProduct> chỉ ra rằng mỗi cột sẽ có một kiểu dữ liệu thuộc loại IProduct.
  const columns: ColumnsType<IProduct> = [
    // Đối tượng cột đầu tiên có thuộc tính tiêu đề của "Tên sản phẩm", thuộc tính dataIndex của "name" và hàm render lấy thuộc tính tên của một mục dữ liệu nhất định và trả về thành phần React hiển thị tên dưới dạng thẻ a
    {
      title: "Tên sản phẩm",
      // dataIndex được sử dụng để chỉ định key hoặc thuộc tính của đối tượng dữ liệu mà cột sẽ hiển thị
      // dataIndex ở đây được sử dụng để chỉ định tên của key hoặc thuộc tính của đối tượng IProduct sẽ được sử dụng làm dữ liệu cho cột
      dataIndex: "name",
      // key là mã định danh duy nhất cho mỗi cột trong bảng. Nó được React sử dụng để theo dõi các phần tử và cải thiện hiệu suất bằng cách xác định phần tử nào đã thay đổi. Trong ví dụ mã này, key được sử dụng để cung cấp mã định danh duy nhất cho mỗi cột.
      key: "name",
      // Hàm render được sử dụng trong mảng colums của Ant Design Table component để xác định cách hiển thị các giá trị cho một cột cụ thể.

      //  render là một hàm được sử dụng để tùy chỉnh cách hiển thị dữ liệu trong một cột. Nó nhận dữ liệu hiện tại dưới dạng tham số và trả về mã JSX sẽ được hiển thị. Trong ví dụ mã này, render được sử dụng để tùy chỉnh cách hiển thị dữ liệu trong các cột name, image và description
      render: (name) => <a>{name}</a>,
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div
          style={{
            width: "120px",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={images?.[0]} style={{ width: "100%" }} />
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <p
          style={{
            display: "-webkit-box",
            textOverflow: "ellipsis",
            WebkitLineClamp: 4,
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    // Đối tượng cột thứ sáu có thuộc tính tiêu đề là "Action" và chức năng hiển thị nhận một mục dữ liệu hoàn chỉnh và trả về một component React hiển thị hai button: button "Edit" liên kết đến một trang để chỉnh sửa mục dữ liệu và một button "Xóa" kích hoạt chức năng removeProduct() với thuộc tính khóa của mục dữ liệu.
    {
      title: "Action",
      key: "action",
      render: (record) => (
        // record là tham số được truyền cho hàm render của cột "Action" trong ví dụ mã. Record là một đối tượng đại diện cho dữ liệu cho hàng hiện tại được hiển thị trong bảng.

        // Mỗi hàng trong bảng đại diện cho một đối tượng IProduct duy nhất và đối tượng record đại diện cho dữ liệu cho đối tượng đó.

        // Thuộc tính key của từng đối tượng trong mảng dữ liệu được sử dụng làm mã định danh duy nhất cho mỗi hàng và được sử dụng để theo dõi các thay đổi đối với dữ liệu. Khi người dùng tương tác với bảng, đối tượng record cho hàng đã chọn sẽ được chuyển đến bất kỳ trình xử lý sự kiện hoặc hàm gọi lại nào. Trong ví dụ về mã, record được dùng để tạo liên kết để chỉnh sửa và xóa một sản phẩm cụ thể trong cột "Hành động".
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "green" }}>
            <Link to={`/admin/products/${record.key}/update`}>Sửa</Link>
          </Button>
          <Button
            type="primary"
            danger
            style={{ backgroundColor: "red" }}
            onClick={() => removeProduct(record.key)}
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
        }}
      >
        <Typography.Title level={4}>Quản lý sản phẩm</Typography.Title>

        <Link to={"/admin/products/add"}>
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
            Thêm Sản Phẩm Mới
          </Button>
        </Link>
      </div>

      {/* <Table<IProduct> chỉ định loại dữ liệu chung cho Table component, đó là IProduct. Điều này thông báo cho component về hình dạng của dữ liệu sẽ được hiển thị trong bảng. */}

      {/* columns là một mảng các đối tượng chỉ định cấu hình cho từng cột trong bảng. Nó đang sử dụng hằng số cột mà chúng ta có thể thấy trong đoạn code. */}

      {/* dataSource là một mảng các đối tượng dữ liệu chứa dữ liệu thực tế sẽ được hiển thị trong bảng. Trong ví dụ code này, nó đề cập đến biến dât là một mảng các đối tượng IProduct. */}
      <Table<IProduct>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ProductsDashBoardPage;
