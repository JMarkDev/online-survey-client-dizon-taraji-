import React, { useState } from "react";
import { Link } from "react-router-dom";
import noticeImg from "../assets/exclamation-mark.png";

const TermsCondition = ({ openModal }) => {
  const [agree, setAgree] = useState(false);

  const handleAgree = () => {
    if (agree) {
      // Execute the action (e.g., navigate to survey)
      openModal();
    } else {
      // Show error message or perform other actions when not agreed
      alert("Please agree to the terms and conditions");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-xl">
        <div className="relative bg-white rounded-lg shadow p-6">
          <img src={noticeImg} alt="" className="h-20 mb-10 m-auto" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Terms & Conditions
          </h1>
          <div className="border-t border-gray-400 pt-6">
            <p className="text-gray-700 leading-relaxed">
              Hello Crimson! Welcome to our survey on{" "}
              <strong className="font-semibold">
                "Optimizing Study Skills and Time Management of the Students at
                Western Mindanao State University."
              </strong>{" "}
              This survey aims to gather insights into study habits and time
              management techniques among students. Your participation is
              voluntary, and you agree to provide accurate and truthful
              responses. You may withdraw at any time.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              <strong className="font-semibold">
                Privacy and Confidentiality:
              </strong>{" "}
              Information collected will be used for research purposes only and
              treated confidentially. Thank you for sharing your experiences.
            </p>
          </div>
          <div className="flex items-center justify-center mt-4">
            <input
              onChange={(e) => setAgree(e.target.checked)}
              type="checkbox"
              className="cursor-pointer h-4 w-4 accent-blue-600 form-checkbox"
            />
            <label className="text-gray-700 ml-2">
              I agree to the terms and conditions
            </label>
          </div>
          <div className="flex justify-center items-center gap-5">
            <button
              onClick={handleAgree}
              className={`${
                !agree ? "cursor-not-allowed opacity-50" : ""
              } bg-blue-500 rounded-lg text-white px-4 py-2 font-bold mt-4 block text-center`}
              disabled={!agree}
            >
              Agree
            </button>
            <Link
              to={"/dashboard"}
              className="bg-gray-300 p-2 rounded-lg text-black font-bold mt-4 block text-center"
            >
              Disagree
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
