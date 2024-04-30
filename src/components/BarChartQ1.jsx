import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import api from "../api/api";
import questions from "../questions/question.json";

const BarChart = ({ surveyData }) => {
  const [series, setSeries] = useState([]);
  const [course, setCourse] = useState("");
  const [gender, setGender] = useState("");

  // Function to handle course selection change
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  // Function to handle gender selection change
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    // Filter surveyData based on selected course and gender
    const filteredSurveyData = surveyData.filter(entry => {
      if (course && entry.course !== course) return false;
      if (gender && entry.gender !== gender) return false;
      return true;
    });

    // Calculate series based on filtered surveyData
    const calculateSeries = () => {
      const question4 = questions.questions[0];
      const questionId = question4.id;
      const answerTexts = question4.choices;

      const newSeries = answerTexts.map((answerText) =>
        calculateTotalOccurrences(questionId, answerText, filteredSurveyData)
      );

      setSeries(newSeries);
    };

    calculateSeries();
  }, [surveyData, course, gender]);

  const calculateTotalOccurrences = (questionId, answerText, data) => {
    let totalOccurrences = 0;
    data.forEach((entry) => {
      if (entry.answers[questionId] && entry.answers[questionId].includes(answerText)) {
        totalOccurrences++;
      }
    });
    return totalOccurrences;
  };

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
        categories: questions.questions[0].choices,
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
      <div>
        <select
          name="course"
          id="course"
          onChange={handleCourseChange}
          className="border-gray-400 border p-2 rounded-lg w-full"
        >
          <option value="">Select Course</option>
          <option value="BSCS">Bachelor of Science in Computer Science</option>
          <option value="ACT">Associate in Computer Technology</option>
          <option value="BSED-ENGLISH">
            Bachelor of Secondary Education Major in English
          </option>
          <option value="BSED-SCIENCE">
            Bachelor of Secondary Education Major in Science
          </option>
          <option value="BEED">
            Bachelor of Science in Elementary Education
          </option>
          <option value="BSSW">Bachelor of Science in Social Work</option>
          <option value="AB-POLSCIE">
            Bachelor of Arts in Political Science
          </option>
          <option value="BSCRIM">Bachelor of Science in Criminology</option>
        </select>
      </div>
      <div>
        <select
          name="gender"
          id="gender"
          onChange={handleGenderChange}
          className="border-gray-400 border p-2 rounded-lg w-full mt-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
        </select>
      </div>
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
