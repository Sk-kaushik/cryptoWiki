// REACT
import React, { useEffect, useState } from "react";

// COMPONENTS
import { Sidebar } from "../Components";

// ANT DESIGN
import { Layout } from "antd";
const { Sider } = Layout;

const PageLayout = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = (params) => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkWidth = (e) => {
    if (windowWidth && windowWidth < 780) {
      return true;
    }
    return false;
  };

  return (
    <Layout>
      <Sider id="sider" width={checkWidth() ? 400 : 250} collapsed={toggleMenu}>
        <Sidebar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} checkWidth={checkWidth} />
      </Sider>

      <div className="layout">{props.children}</div>
    </Layout>
  );
};

export default PageLayout;
