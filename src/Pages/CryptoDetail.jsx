import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import millify from "millify";
import parse from "html-react-parser";
import { v4 as uuid } from "uuid";

// COMPONENTS
import { LineChart, Loading } from "../Components";

// REDUX SLICE
import { getCoinsData } from "../app/Slice/getCoinSlice";
import { getCoinsHistory } from "../app/Slice/getCoinHistory";

// ANT DESIGN
import { Col, Divider, Typography, Select, Avatar, Row } from "antd";

// ANT DESIGN ICONS
import { NumberOutlined, DollarCircleOutlined, ThunderboltOutlined, TrophyOutlined, MoneyCollectOutlined, FundOutlined, ExclamationCircleOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

const CryptoDetail = () => {
  var stats, genericStats;

  const { coinId } = useParams();
  const dispatch = useDispatch();

  const [coinDetail, setCoinDetail] = useState(null);
  const [coinHistory, setCoinHistory] = useState(null);

  const rawCoinDetail = useSelector((state) => state.getCoinsReducer.data);
  const coinDataLoading = useSelector((state) => state.getCoinsReducer.loading);

  const rawCoinHistory = useSelector((state) => state.getCoinHistoryReducer.data);
  const coinHistoryLoading = useSelector((state) => state.getCoinHistoryReducer.loading);

  const time = ["24h", "7d", "30d", "1y", "5y"];

  useEffect(() => {
    dispatch(getCoinsData({ coinId }));
    dispatch(getCoinsHistory({ coinId, timePeriod: "7d" }));
  }, [dispatch, coinId]);

  useEffect(() => {
    setCoinDetail(rawCoinDetail?.data?.coin);
  }, [rawCoinDetail]);

  useEffect(() => {
    setCoinHistory(rawCoinHistory?.data?.history);
  }, [rawCoinHistory]);

  if (coinDetail) {
    stats = [
      { id: 1, title: "Rank", value: coinDetail.rank, icon: <NumberOutlined /> },
      { id: 2, title: "Price to USD", value: `$ ${coinDetail.price && millify(coinDetail.price)}`, icon: <DollarCircleOutlined /> },
      { id: 3, title: "24h Voume", value: coinDetail.volume && millify(coinDetail.volume), icon: <ThunderboltOutlined /> },
      { id: 4, title: "Market Cap", value: coinDetail.marketCap && millify(coinDetail.marketCap), icon: <DollarCircleOutlined /> },
      { id: 5, title: "All time high ", value: coinDetail.allTimeHigh.price && millify(coinDetail.allTimeHigh.price), icon: <TrophyOutlined /> },
    ];

    genericStats = [
      { id: 6, title: "Number Of Markets", value: coinDetail.numberOfMarkets && millify(coinDetail.numberOfMarkets), icon: <FundOutlined /> },
      { id: 7, title: "Number Of Exchange", value: coinDetail.numberOfExchanges && millify(coinDetail.numberOfExchanges), icon: <MoneyCollectOutlined /> },
      { id: 8, title: "Approved Supply", value: coinDetail.approvedSupply ? <CheckOutlined /> : <CloseOutlined />, icon: <ExclamationCircleOutlined /> },
      { id: 9, title: "Total Supply", value: coinDetail.totalSupply && millify(coinDetail.totalSupply), icon: <ExclamationCircleOutlined /> },
      { id: 10, title: "Circulating Supply", value: coinDetail.circulatingSupply && millify(coinDetail.circulatingSupply), icon: <ExclamationCircleOutlined /> },
    ];
  }

  function handleChange(value) {
    dispatch(getCoinsHistory({ coinId, timePeriod: value }));
  }

  return (
    <>
      {coinDetail && (
        <div className="crypto-detail">
          <Col>
            <div className="detail-heading">
              <Typography.Title level={1}>
                {coinDetail.name} ({coinDetail.slug}) Price
              </Typography.Title>
              <p>{coinDetail.name} live price in US dollars. View value statistics, market cap and supply.</p>
              <Divider />
            </div>
          </Col>

          <Col>
            <Select defaultValue="7d" style={{ width: 200 }} onChange={handleChange}>
              {time.map((t) => (
                <Option value={`${t}`} key={uuid()}>
                  {t}
                </Option>
              ))}
            </Select>
          </Col>

          {/* CHART */}
          <div className="chart">
            <LineChart coinHistory={coinHistory} currentPrice={millify(coinDetail.price)} coinName={coinDetail.name} />
          </div>

          {/* STATS ROW */}

          <Row className="stats-row mt5">
            <Col className=" mt5" xl={11} lg={24} md={24}>
              <Col className="detail-stats">
                <Typography.Title level={2} style={{ textAlign: "center" }}>
                  {coinDetail.name} Value Statistics
                </Typography.Title>
                <p>An overview showing the stats of {coinDetail.name}</p>
              </Col>

              <Col>
                {stats.map(({ title, value, icon }) => (
                  <Col className="stats-item" key={uuid()}>
                    <div className="stats-item-left">
                      <Avatar src={icon} style={{ color: "black", fontSize: "18px", marginRight: "5px" }} />
                      <Typography.Text>{title}</Typography.Text>
                    </div>
                    <div className="stats-item-right">
                      <Typography.Text>{value}</Typography.Text>
                    </div>
                  </Col>
                ))}
              </Col>
            </Col>
            <Col xl={2} lg={0} md={0}></Col>

            {/* OTHER STATS */}
            <Col className=" mt5" xl={11} lg={24} md={24}>
              <Col className="detail-stats" key={uuid()}>
                <Typography.Title level={2} style={{ textAlign: "center" }}>
                  Other Statistics
                </Typography.Title>
                <p>An overview showing the stats of all cryptocurrencies</p>
              </Col>
              <Col>
                {genericStats.map(({ title, value, icon }) => (
                  <Col className="stats-item" key={uuid()}>
                    <div className="stats-item-left">
                      <Avatar src={icon} style={{ color: "black", fontSize: "18px", marginRight: "5px" }} />
                      <Typography.Text>{title}</Typography.Text>
                    </div>
                    <div className="stats-item-right">
                      <Typography.Text>{value}</Typography.Text>
                    </div>
                  </Col>
                ))}
              </Col>
            </Col>
          </Row>
          <Row className="coin-detail-des mt5">
            <Col className=" coin-detail-def mt5" xl={13} lg={24} md={24} sm={24}>
              <Typography.Title>What is {coinDetail.name} ?</Typography.Title>
              {parse(coinDetail.description)}
            </Col>

            <Col xl={9} lg={24} md={24} sm={24} className="crypto-links">
              <Typography.Title className="mt5">Bitcoin Links</Typography.Title>
              {coinDetail.links.map((link) => (
                <Col className="stats-item" key={uuid()}>
                  <div className="stats-item-left">
                    <Typography.Text>{link.type}</Typography.Text>
                  </div>
                  <div className="stats-item-right">
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  </div>
                </Col>
              ))}
            </Col>
          </Row>
        </div>
      )}
      {(coinDataLoading || coinHistoryLoading) && <Loading />}
    </>
  );
};

export default CryptoDetail;
