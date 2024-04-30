import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LineChart from "../components/LineChart";
import api from "../api/api";
import BarChartQ1 from "../components/BarChartQ1";
import BarChartQ2 from "../components/BarChartQ2";
import DoughnutQuestion3 from "../components/DoughnutQuestion3";
import BarChartQ4 from "../components/BarchartQ4";
import DoughnutQ5 from "../components/DoughnutQ5";
import BarChartQ6 from "../components/BarChartQ6";
import BarChartQ7 from "../components/BarChartQ7";
import BarChartQ8 from "../components/BarChartQ8";
import BarChartQ9 from "../components/BarChartQ9";
import BarChartQ10 from "../components/BarChartQ10";
import FilterByCourseChart from "../components/FilterByCourseChart";
import FilterByCourseChart1 from "../components/FilterByCourseChart1";

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
        console.log(response.data);
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
            
          </div>
          {option === "study techniques" ? (
            <>
              <DoughnutQ5
                surveyData={surveyData}
                calculateTotalOccurrences={calculateTotalOccurrences}
              />

              <div className="bg-white mt-8 rounded-lg p-6 shadow-md">
                <FilterByCourseChart1 surveyData={surveyData} />
              </div>
            </>
          ) : (
            <>
              <DoughnutQuestion3
                surveyData={surveyData}
                calculateTotalOccurrences={calculateTotalOccurrences}
              />
              <div className="bg-white mt-8 rounded-lg p-6 shadow-md">
                <FilterByCourseChart surveyData={surveyData} />
              </div>
            </>
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

      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
          Task Prioritization
          </h1>
          <BarChartQ8
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>

      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
          Learning Support Resources
          </h1>
          <BarChartQ9
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>

      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
          Optimizing Study Strategies
          </h1>
          <BarChartQ10
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>

      <div className="max-w-5xl mt-10 m-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
          Managing Study Materials
          </h1>
          <BarChartQ4
            surveyData={surveyData}
            calculateTotalOccurrences={calculateTotalOccurrences}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
