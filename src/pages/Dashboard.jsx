import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LineChart from "../components/LineChart";
import api from "../api/api";
import BarChartQ1 from "../components/BarChartQ1";
import BarChartQ2 from "../components/BarChartQ2";
import DoughnutQuestion3 from "../components/DoughnutQuestion3";
import DoughnutQ5 from "../components/DoughnutQ5";
import BarChartQ6 from "../components/BarChartQ6";
import BarChartQ7 from "../components/BarChartQ7";

const Dashboard = () => {
  const [option, setOption] = useState("default");
  const [surveyData, setSurveyData] = useState([]);
  const [responseCount, setResponseCount] = useState(0);
  const cardsData = [
    { title: "Total Responses", count: responseCount },
    { title: "Total Course", count: 8 },
  ];

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await api.get("/survey/all");
        setResponseCount(response.data.length);
        setSurveyData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResponse();
  }, []);

  // Function to calculate total occurrences of an answer text for a specific question
  const calculateTotalOccurrences = (questionId, answerText) => {
    // Initialize total occurrences count
    let totalOccurrences = 0;

    // Loop through surveyData to count occurrences
    surveyData.forEach((entry) => {
      // Check if the entry has an answer for the specified questionId and it matches the answerText
      if (
        entry.answers[questionId] &&
        entry.answers[questionId].includes(answerText)
      ) {
        // Increment totalOccurrences if the answer matches
        totalOccurrences++;
      }
    });

    return totalOccurrences;
  };

  function downloadCSVDonut() {
    const headers = [
      "Full Name",
      "Email",
      "Course",
      "Gender",
      "Study Techniques",
      "Study Skills",
    ];
    const dataRows = surveyData.map((response) => {
      return [
        response.fullname,
        response.email,
        response.course,
        response.gender,
        response.answers.question3[0],
        response.answers.question5[0],
      ];
    });

    const csvContent = [headers, ...dataRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "response.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 ">
      <div className=" shadow-lg p-4 flex justify-between">
        <h1 className="text-2xl font-bold ml-10">Survey Dashboard</h1>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 flex items-center rounded-lg"
          to={"/survey"}
        >
          Survey Form
        </Link>
      </div>
      <div className="max-w-5xl m-auto ">
        <div className="grid md:grid-cols-2 gap-10 mt-5 px-20  m-auto text-center">
          {cardsData.map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <h1 className="text-lg font-semibold text-gray-800 mb-2">
                {card.title}
              </h1>
              <h1 className="text-3xl font-bold text-blue-500">{card.count}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Survey Responses
          </h1>
          <LineChart surveyData={surveyData} />
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md ">
          <div className="w-full">
            <select
              name=""
              id=""
              onChange={(e) => setOption(e.target.value)}
              className="w-full p-2 mb-4 border-gray-400 border focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-lg"
            >
              <option value="default">Default</option>
              <option value="study skills">Study Skills</option>
              <option value="study techniques">Study Techniques</option>
            </select>
          </div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              Typically approach preparing for exams or assessments
            </h1>
            <button
              onClick={downloadCSVDonut}
              className="mr-4 text-sm bg-blue-600 hover:bg-blue-800 text-white h-10 rounded-lg px-4"
            >
              Download CSV
            </button>
          </div>
          {option === "study techniques" ? (
            <DoughnutQ5
              surveyData={surveyData}
              calculateTotalOccurrences={calculateTotalOccurrences}
            />
          ) : (
            <DoughnutQuestion3
              surveyData={surveyData}
              calculateTotalOccurrences={calculateTotalOccurrences}
            />
          )}
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Most productive time for studying
          </h1>
          <BarChartQ1
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>
      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Hours per week dedicate to studying outside of class
          </h1>
          <BarChartQ2
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>

      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Most preferred study environment
          </h1>
          <BarChartQ6
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>

      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Time Management
          </h1>
          <BarChartQ7
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
