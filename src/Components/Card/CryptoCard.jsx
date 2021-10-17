import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";

// ANT DESIGN
import { Card, Avatar } from "antd";

const CryptoCard = ({ data, width = "auto", loading }) => {
  const rank = data.rank;
  const title = data.name;
  const iconUrl = data.iconUrl;
  const cardId = data.id;

  const price = data.price;
  const marketCap = data.marketCap;
  const dailyChange = data.change;

  return (
    <div>
      {data && (
        <Link to={`/crypto/${cardId}`}>
          <Card loading={loading} style={{ width: `${width}px` }} hoverable="true" title={`${rank}. ${title}`} extra={<Avatar src={iconUrl} />}>
            <p>Price: {millify(price)}</p>
            <p>Market Cap: {millify(marketCap)}</p>
            <p>Daily Change: {millify(dailyChange)}%</p>
          </Card>
        </Link>
      )}
    </div>
  );
};

export default CryptoCard;
