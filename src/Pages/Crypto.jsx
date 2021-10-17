import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// REDUX SLICE
import { getCoinsData } from "../app/Slice/getCoinSlice";

// COMPONENTS
import { CryptoCard, Loading } from "../Components";

// ANT DESIGN
import { Row, Col, Input, Result } from "antd";

const { Search } = Input;

const Crypto = () => {
  const [rawCoins, setRawCoins] = useState([]);
  const [noCoin, setNoCoin] = useState(false);
  const [coinsList, setCoinsList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoinsData({ count: 50 }));
  }, [dispatch]);

  const rawData = useSelector((state) => state.getCoinsReducer.data);
  const loading = useSelector((state) => state.getCoinsReducer.loading);

  useEffect(() => {
    setRawCoins(rawData?.data?.coins);
    setCoinsList(rawData?.data?.coins);
  }, [rawData]);

  const searchHandler = (text) => {
    setCoinsList(rawData?.data?.coins);

    if (rawCoins.length > 0) {
      if (text !== "") {
        const filteredCoins = rawCoins.filter((coin) => {
          return coin.name.toLowerCase().includes(text.toLowerCase());
        });
        if (filteredCoins.length > 0) {
          setCoinsList(filteredCoins);
          setNoCoin(false);
        } else {
          setCoinsList([]);
          setNoCoin(true);
        }
      } else {
        setNoCoin(false);
        setCoinsList(rawData?.data?.coins);
      }
    }
  };

  return (
    <>
      {rawData && (
        <>
          <Col xs={24} sm={24} md={24} lg={16} xl={12}>
            <Search placeholder="Search Cryptocurrencies" enterButton="Search" size="large" onSearch={(value) => searchHandler(value)} />
          </Col>

          <Row gutter={[40, 40]} className="mt5">
            {coinsList &&
              coinsList.map((currency) => (
                <Col span={8} xs={24} sm={12} lg={8} xl={6} key={currency.uuid}>
                  <CryptoCard loading={loading} data={currency} />
                </Col>
              ))}

            {noCoin && (
              <div className="no-data">
                <Result status="500" title="No Result Found" subTitle="We couldn't find what you're looking for" />,
              </div>
            )}
          </Row>
        </>
      )}

      {loading && <Loading />}
    </>
  );
};

export default Crypto;
