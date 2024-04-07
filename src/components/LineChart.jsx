import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Dropdown from "../components/Dropdown";
import api from "../api/api";

const Analytics = ({ surveyData }) => {
  const COLORS = [
    "#e88245",
    "#8daa3b",
    "#1f82c1",
    "#9333ea",
    "#ff5733",
    "#6c5b7b",
    "#ffcc29",
    "#00a8cc",
  ];

  const graphColors = [
    "#e88245",
    "#8daa3b",
    "#1f82c1",
    "#9333ea",
    "#ff5733",
    "#6c5b7b",
    "#ffcc29",
    "#00a8cc",
  ];

  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/survey/total/${year}`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [year]);

  let graphColorIndex = 1;

  const getGraphColor = () => {
    const color = graphColors[graphColorIndex];
    graphColorIndex = (graphColorIndex + 1) % graphColors.length;
    return color;
  };

  const handleYear = (year) => {
    setYear(year);
  };

  function downloadCSV() {
    const headers = ["Full Name", "Email", "Course", "Gender"];
    const dataRows = surveyData.map((response) => {
      return [
        response.fullname,
        response.email,
        response.course,
        response.gender,
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
    <div
      style={
        {
          // maxWidth: "100%",
          // background: "white",
          // overflowX: "auto",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // margin: "auto",
          // marginTop: "20px",
          // padding: "10px",
        }
      }
      className="dash  w-auto overflow-x-auto"
    >
      <div className="flex flex-col md:flex-row md:gap-6 mt-[16px] w-full">
        <div className="basis-[60%] border-2 border-gray dark:border-white bg-white shadow-md cursor-pointer rounded-[4px] dark:bg-black mb-4 md:mb-0 lg:mb-0 lg:mr-4">
          <div className="bg-gray-500 py-[15px] px-[20px] dark:border-white  mb-[20px]">
            <div className="gap-3 flex flex-col md:flex-row justify-between items-center">
              <h2 className="  text-white leading-[19px] font-bold ">
                Respondents Chart
              </h2>
              <div className="flex gap-5">
                <Dropdown handleYear={handleYear} />
                <button
                  onClick={downloadCSV}
                  type="button"
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-5"
                >
                  Download
                </button>
              </div>
            </div>
          </div>

          <div
            className="lineChart"
            style={{
              background: "white",
              //   padding: "10px",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              overflowX: "auto",
            }}
          >
            <ResponsiveContainer width={950} height={400}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, "dataMax + 1"]} />
                {/*
                            <YAxis domain={[0, 500]} /> 
                            
                            <YAxis domain={[0, 500]} ticks={[0, 100, 200, 300, 400, 500]} />
                            */}
                <Tooltip />
                <Legend />
                {data &&
                  data.length > 0 &&
                  Object.keys(data[0])
                    .filter((key) => key !== "month")
                    .map((key, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={key}
                        stroke={getGraphColor()}
                        activeDot={{ r: 8 }}
                      />
                    ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
