import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import questions from "../questions/question.json";

const BarChart = ({ calculateTotalOccurrences, surveyData }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Calculate series only when surveyData changes
    const calculateSeries = () => {
      const question = questions.questions[5];
      const questionId = question.id;
      const answerTexts = question.choices;

      const newSeries = answerTexts.map((answerText) =>
        calculateTotalOccurrences(questionId, answerText)
      );

      setSeries(newSeries);
    };

    calculateSeries();
  }, [surveyData]);

  const colorList = [
    "#008FFB",
    "#00E396",
    "#FFD700",
    "#FF6384",
    "#36A2EB",
    "#FF00FF",
    "#FF4500",
    "#7CFC00",
    "#FF1493",
    "#9400D3",
  ];

  const chartData = {
    series: [{ data: series }],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      colors: colorList,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: questions.questions[5].choices,
        labels: {
          style: {
            colors: colorList,
            fontSize: "12px",
          },
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChart;
