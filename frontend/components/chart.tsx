"use client";
import React from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

const data = {
  labels: ["Bad", "Fearful", "Happy", "sad", "surprised", "angry", "disgusted"],
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 20, 30, 40, 50],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      fill: true,
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",

    },
    {
      label: "Dataset 2",
      data: [20, 30, 40, 50, 60],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
      fill: true,
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
    },
  ],
};

const options = {
   
  
  responsive: true,
  title: {
    color : "white",
    display: true,
    text: "3D Radar Chart",
  },
  scale: {
    type: "radar",
    max: 60,
    ticks: {
      stepSize: 10,
    },
    gridLines: {
        color: 'white'
      },
    angleLines: {
        color: 'white' 
      }
   
    
    
  },
};

export const RadarChart = () => {
  return (
    <div id="chart" className=" h-60 w-60 ">
      <Chart type="radar" data={data} options={options} />
    </div>
  );
};

// export default RadarChart;
