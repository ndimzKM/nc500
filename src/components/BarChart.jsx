import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ ratings }) => {
  const [chartData, setChartData] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const labels = [1, 2, 3, 4, 5];
  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart showing the distribution of ratings for this hostel",
      },
    },
  };

  let data = {
    labels,
    datasets: [
      {
        label: "Ratings",
        data: Object.values(chartData),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const organiseRatings = () => {
    let org = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    let count = 0;
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < ratings.length; j++) {
        if (labels[i] == ratings[j]) {
          count += 1;
        }
      }
      org[i + 1] = count;
      count = 0;
    }
    setChartData(org);
    console.log(org);
  };

  useEffect(() => {
    organiseRatings();
  }, []);
  return <Bar options={options} data={data} />;
};

export default BarChart;
