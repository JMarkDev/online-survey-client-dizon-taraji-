import React, { useState, useEffect } from "react";
import icon from "../assets/undraw_checklist__re_2w7v.svg";
import { Link } from "react-router-dom";

const Thankyou = () => {
  const [show, setShow] = useState(false);

  // Use useEffect to trigger animation on mount
  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false); // Set show state to false to trigger exit animation
  };

  return (
    // Apply conditional class based on show state
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-black bg-opacity-50 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative p-4 w-full max-w-xl">
        <div className="relative bg-white rounded-lg shadow p-6">
          <div className="flex justify-center items-center bg-gray-100 rounded-lg">
            <div className="p-6 flex flex-col items-center">
              <img src={icon} alt="Thank you" className="w-40 h-40" />
              <h1 className="text-3xl text-gray-800 font-bold mb-4">
                Thank you for your response!
              </h1>
              <p className="text-lg text-gray-600">
                We appreciate your response!
              </p>
              <Link
                to={"/dashboard"}
                onClick={handleClose}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300"
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
