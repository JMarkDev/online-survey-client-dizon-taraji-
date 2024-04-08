import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import questions from "../questions/question.json";

export default function ApexChart({ calculateTotalOccurrences }) {
  // Retrieve question details from questions.json (assuming question1 is the first question)

  const question = questions.questions[4];
  const questionId = question.id;
  const answerTexts = question.choices;

  // Calculate total occurrences for each answer text in the question
  const series = answerTexts.map((answerText) =>
    calculateTotalOccurrences(questionId, answerText)
  );

  // Chart options with labels and chart type
  const options = {
    chart: {
      type: "donut",
    },
    labels: answerTexts,
  };

  return (
    <div id="chart">
      {/* Render Chart component with computed options and series */}
      <Chart
        options={options}
        series={series}
        type="donut"
        width={"100%"}
        height={350}
      />
    </div>
  );
}
