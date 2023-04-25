import React from "react";
import { Badge, Image, Space, Typography } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";

type Props = {};

const HeaderAdmin = (props: Props) => {
  return (
    <div className="HeaderAdmin">
      <Image src="https://cdn.shopify.com/s/files/1/1903/4853/files/logo_digital_new_250x.png?v=1613166683"></Image>
      <Typography.Title style={{ paddingTop: "18px" }}>
        DashBoard Admin
      </Typography.Title>
      <Space>
        <Badge count={20} dot>
          <MailOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge dot>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  );
};

export default HeaderAdmin;
