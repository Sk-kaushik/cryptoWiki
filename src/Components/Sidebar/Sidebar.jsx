import React from "react";
import { Link } from "react-router-dom";

// ASSETS
import CryptoImage from "../../Assets/Images/cryptoImage.jpg";

// ANT DESIGN
import { Avatar, Typography, Menu, Button } from "antd";
import { HomeOutlined, MoneyCollectOutlined, FundOutlined, BulbOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const Sidebar = ({ setToggleMenu, toggleMenu, checkWidth }) => {
  const toggleCollapsed = () => {
    setToggleMenu((prev) => !prev);
  };

  return (
    <div className="sidebar-container">
      <div className="logo">
        <Typography.Title level={4} className="logo-name">
          <Avatar size="medium" src={CryptoImage} />
          <Link to="/" className={toggleMenu ? "hideLink" : "showLink"}>
            Crypto Wiki
          </Link>
        </Typography.Title>
      </div>
      {!checkWidth() && (
        <Button className={`menu-toggle-btn ${toggleMenu && "active"}`} onClick={toggleCollapsed}>
          {toggleMenu ? <MenuUnfoldOutlined size="large" /> : <MenuFoldOutlined size="large" />}
        </Button>
      )}

      <div className="menu">
        <Menu theme="dark" defaultSelectedKeys={[window.location.pathname]} mode={!checkWidth() ? "inline" : "horizontal"} style={{ zIndex: "99999" }}>
          <Menu.Item icon={<HomeOutlined className="menu-icon" />} key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined className="menu-icon" />} key="/crypto">
            <Link to="/crypto">Cryptocurrencies</Link>
          </Menu.Item>

          <Menu.Item icon={<MoneyCollectOutlined className="menu-icon" />} key="/exchange">
            <Link to="/exchange">Exchange</Link>
          </Menu.Item>

          <Menu.Item icon={<BulbOutlined className="menu-icon" />} key="/news">
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
