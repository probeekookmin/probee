import styled from "styled-components";
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DesktopOutlined, TeamOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import Logo from "../../assets/icons/logo_w.svg";
import LogoSmall from "../../assets/icons/logo_bee_w.svg";

const { Sider } = Layout;

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

const logOutItem = [getItem(<Link to="/login">로그아웃</Link>, "1", <LogoutOutlined />)];
const logInItem = [getItem(<Link to="/login">로그인</Link>, "1", <LoginOutlined />)];

const Nav = () => {
  const isAuthenticated = !!localStorage.getItem("jwtToken");

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
        <LogoContainer>{collapsed ? <LogoSmallWrapper src={LogoSmall} /> : <LogoWrapper src={Logo} />} </LogoContainer>
        <ItemContainer>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} selectedKeys={currentKey()} />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={isAuthenticated ? logOutItem : logInItem}
            selectedKeys={["2"]}
          />
        </ItemContainer>
      </Sider>
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default Nav;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.6rem;
  transition: all 0.3s;
`;
const LogoWrapper = styled.img`
  width: 15rem;
`;
const LogoSmallWrapper = styled.img`
  width: 2rem;
  height: 2rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  padding: 1rem;
`;
