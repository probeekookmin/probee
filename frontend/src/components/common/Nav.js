import React, { useState } from "react";
import styled from "styled-components";
import { DesktopOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { Outlet, Link, useLocation } from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/list">실종자 리스트</Link>, "2", <DesktopOutlined />),
  getItem(<Link to="/report">실종자 리포트</Link>, "3", <UserOutlined />),
  getItem(<Link to="/add">실종정보 등록</Link>, "4", <TeamOutlined />),
];

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const selectedKey = useLocation().pathname;

  const currentKey = () => {
    switch (selectedKey) {
      case "/":
        return ["2"];
      case "/list":
        return ["2"];
      case "/report":
        return ["3"];
      case "/add":
        return ["4"];
      default:
        return ["3"];
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <DemoLogo />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} selectedKeys={currentKey()} />
      </Sider>
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default Nav;

const DemoLogo = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;
