import React from "react";
import moment from "moment";

// ANT DESIGN
import { Avatar, Card, Typography } from "antd";

const NewsCard = ({ data, width = "auto", loading }) => {
  const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  var title = data?.name;
  var imgUrl = data?.image?.thumbnail?.contentUrl || demoImage;
  var newsDescription = data?.description;
  var newsProviderImg = data?.provider[0]?.image?.thumbnail?.contentUrl || demoImage;
  var newsProviderName = data?.provider[0]?.name;
  var datePublished = data.datePublished;

  return (
    <>
      {data && (
        <Card loading={loading} style={{ width: `${width}px`, height: "250px" }} hoverable="true" className="news-card">
          <a href={data.url} target="_blank" rel="noreferrer">
            <div className="news-header">
              <Typography.Title level={4}>{title.length > 55 ? `${title.substring(0, 55)}...` : title}</Typography.Title>
              <img src={imgUrl} alt="" />
            </div>
            <div className="news-desc">
              <p>{newsDescription.length > 100 ? `${newsDescription.substring(0, 100)}...` : newsDescription} </p>
            </div>
            <div className="news-footer">
              <div className="news-footer-content">
                <div className="news-provider">
                  <Avatar src={newsProviderImg} />
                  <p>{newsProviderName}</p>
                </div>
                <p className="news-footer-time">{moment(datePublished).fromNow()}</p>
              </div>
            </div>
          </a>
        </Card>
      )}
    </>
  );
};

export default NewsCard;
