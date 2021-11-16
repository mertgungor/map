import React from "react";
import "./lineChart.css";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  return (
    <div className="linechart-container">
      <Line
        data={{
          labels: props.labels,
          datasets: [
            {
              label: props.label,
              data: props.dataArray,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          animation: {
            duration: 0,
          },
        }}
      />
    </div>
  );
};

export default LineChart;
