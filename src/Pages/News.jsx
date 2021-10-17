import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

// REDUX SLICE
import { getNews } from "../app/Slice/getNewsSlice";
import { getCoinsData } from "../app/Slice/getCoinSlice";

// Components
import NewsCard from "../Components/Card/NewsCard";
import Loading from "../Components/Loading/Loading";

// ANT DESIGN
import { Col, Row, Select } from "antd";
const { Option } = Select;

const News = () => {
  const dispatch = useDispatch();
  const [newsList, setNewsList] = useState(null);

  useEffect(() => {
    dispatch(getCoinsData({ count: 100 }));
    dispatch(getNews({ newsCategory: "cryptocurrency", count: 11 }));
  }, [dispatch]);

  const rawNews = useSelector((state) => state.getNewsReducer.newsArray);
  const loading = useSelector((state) => state.getNewsReducer.loading);

  const rawCoins = useSelector((state) => state.getCoinsReducer.data);
  const coinsList = rawCoins?.data?.coins;

  useEffect(() => {
    setNewsList(rawNews?.value);
  }, [rawNews]);

  function handleChange(value) {
    dispatch(getNews({ newsCategory: `${value}`, count: 11 }));
  }

  return (
    <div className="news-container">
      {rawCoins && (
        <>
          <Select showSearch defaultValue="Cryptocurrency" style={{ width: 250 }} optionFilterProp="children" onChange={handleChange} onSearch={handleChange} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value="cryptocurrency">Cryptocurrency</Option>
            {coinsList &&
              coinsList.map((coin) => (
                <Option value={`${coin.name}`} key={uuid()}>
                  {coin.name}
                </Option>
              ))}
          </Select>
          {rawNews && (
            <Row gutter={[40, 40]} className="mt5 news-row">
              {newsList &&
                newsList.map((news) => (
                  <Col span={8} xs={24} sm={24} lg={12} xl={8} xxl={8} key={uuid()}>
                    <NewsCard loading={loading} data={news} />
                  </Col>
                ))}
            </Row>
          )}
        </>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default News;
