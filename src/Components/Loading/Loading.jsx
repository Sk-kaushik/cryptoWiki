import React from "react";

// ANT DESIGN
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="loader-container">
      <Spin tip="Loading..." size="large" />
    </div>
  );
};

export default Loading;
