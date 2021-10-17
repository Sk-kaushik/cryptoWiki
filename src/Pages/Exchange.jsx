import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";

// COMPONENTS
import { ExchangeAccordionItem, Loading } from "../Components";

// REDUX SLICE
import { getExchange } from "../app/Slice/getExchangeSlice";

// ANT DESIGN
import { Col, Collapse, Row } from "antd";

const { Panel } = Collapse;

const Exchange = () => {
  const dispatch = useDispatch();

  const [exchange, setExchange] = useState(null);
  const rawExchange = useSelector((state) => state.getExchangeReducer.data);

  useEffect(() => {
    dispatch(getExchange());
  }, [dispatch]);

  useEffect(() => {
    setExchange(rawExchange?.data?.exchanges);
  }, [rawExchange]);

  return (
    <>
      {exchange ? (
        <>
          <Row className="accordion-item-col">
            <Col span={1}>S.No</Col>
            <Col span={7} className="accordion-exchange-heading">
              Exchanges
            </Col>
            <Col span={6}>24h Volume</Col>
            <Col span={6}>Markets</Col>
            <Col span={4}>Change</Col>
          </Row>
          <Col span={24}>
            <Collapse defaultActiveKey={[exchange[0].id]}>
              {exchange.map((e, index) => (
                <Panel showArrow={false} key={e.id} header={<ExchangeAccordionItem key={e.id} rank={index} name={e.name} iconUrl={e.iconUrl} volume={e.volume} totalMarkets={e.numberOfMarkets} change={e.marketShare} />}>
                  <div className="accordion-item-content">{parse("" + e.description)}</div>
                </Panel>
              ))}
            </Collapse>
            ,
          </Col>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Exchange;
