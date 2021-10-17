import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import millify from "millify";
import { v4 as uuid } from "uuid";

// ANT DESIGN
import { Typography, Row, Col, Statistic } from "antd";

// COMPONENTS
import { CryptoCard, Loading, NewsCard } from "../Components";

// REDUX SLICE
import { getCoinsData } from "../app/Slice/getCoinSlice";
import { getNews } from "../app/Slice/getNewsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [rawCoins, setRawCoins] = useState([]);
  const [coinStats, setCoinStats] = useState(null);

  const numberOfCurrenciesToFetch = 10;

  useEffect(() => {
    dispatch(getCoinsData({ count: numberOfCurrenciesToFetch }));
    dispatch(getNews({ newsCategory: "cryptocurrencies", count: 5 }));
  }, [dispatch]);

  const rawData = useSelector((state) => state.getCoinsReducer.data);
  const loading = useSelector((state) => state.getCoinsReducer.loading);

  const rawNews = useSelector((state) => state.getNewsReducer.newsArray);
  const newsList = rawNews?.value;

  useEffect(() => {
    setRawCoins(rawData?.data?.coins);
    setCoinStats(rawData?.data?.stats);
  }, [rawData]);

  return (
    <div className=" home-container">
      {coinStats ? (
        <>
          <div className="heading">
            <Typography.Title level={2}>Global Crypto Stats</Typography.Title>
          </div>
          <div className="stats">
            <Row>
              <Col xl={12} lg={12} sm={12} xs={24}>
                <Statistic title="Total Crypto Currencies" value={coinStats.total} />
              </Col>
              <Col xl={12} lg={12} sm={12} xs={24}>
                <Statistic title="Total Exchange" value={coinStats.totalExchanges} />
              </Col>
              <Col xl={12} lg={12} sm={12} xs={24}>
                <Statistic title="Total Market Cap" value={millify(coinStats.totalMarketCap)} />
              </Col>
              <Col xl={12} lg={12} sm={12} xs={24}>
                <Statistic title="Total 24h Volume" value={millify(coinStats.total24hVolume)} />
              </Col>
              <Col xl={12} lg={12} sm={12} xs={24}>
                <Statistic title="Total Market" value={millify(coinStats.totalMarkets)} />
              </Col>
            </Row>
          </div>

          <div className="home-component-container">
            <div className="crypto mt5">
              <div className="category-container">
                <Typography.Title level={2} className="category-container-heading">
                  Top 10 Crypto Currencies
                </Typography.Title>
                <Link to="/crypto"> Show More</Link>
              </div>

              <Row gutter={[40, 40]} className="mt5">
                {rawCoins &&
                  rawCoins.map((currency) => (
                    <Col span={8} xs={24} sm={12} lg={8} xl={6} key={uuid()}>
                      <CryptoCard loading={loading} data={currency} />
                    </Col>
                  ))}
              </Row>
            </div>
            <div className="exchange mt5">
              <div className="category-container">
                <Typography.Title level={2}>Top Market News</Typography.Title>
                <Link to="/news"> Show More</Link>
              </div>

              <Row gutter={[40, 40]} className="mt5">
                {newsList &&
                  newsList.map((news) => (
                    <Col xs={24} sm={24} lg={12} xl={8} key={uuid()}>
                      <NewsCard loading={loading} data={news} />
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
