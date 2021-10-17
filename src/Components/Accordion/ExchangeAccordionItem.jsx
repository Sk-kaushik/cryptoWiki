import React from "react";
import millify from "millify";

import { Row, Col, Avatar } from "antd";

const ExchangeAccordionItem = ({ rank, iconUrl, name, volume, totalMarkets, change }) => {
  return (
    <Row>
      <Col span={1}>{rank + 1}.</Col>
      <Col span={7}>
        <div className="exchange-title">
          <Avatar src={iconUrl} size="small" />
          {name}
        </div>
      </Col>
      <Col span={6} className="accordion-volume">
        {millify(volume)}
      </Col>
      <Col span={6} className="accordion-market">
        {totalMarkets}
      </Col>
      <Col span={4} className="accordion-change">
        {millify(change)} %
      </Col>
    </Row>
  );
};

export default ExchangeAccordionItem;
