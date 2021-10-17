import React from "react";

// ANT DESIGN
import { Typography } from "antd";

// CHART
import { Line } from "react-chartjs-2";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const timeStamp = [];

  if (coinHistory) {
    coinHistory.forEach((element, index) => {
      const date = new Date(element.timestamp).toLocaleDateString();
      const price = element.price;

      coinPrice.push(price);
      timeStamp.push(date);
    });
  }

  const data = {
    labels: timeStamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        tension: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="mt5">
      <div className="chart-detail">
        <Typography.Title level={2}>{coinName} Price Chart</Typography.Title>
        <div>
          <Typography.Title level={4}>
            Current Price: <span style={{ color: "#0071bd" }}>${currentPrice}</span>
          </Typography.Title>
        </div>
      </div>
      <Line className="mt5" data={data} options={options} />
    </div>
  );
};

export default LineChart;
