'use client'
import React, { useState, useEffect } from "react";
import feedbacks from '@/app/utils/feedback.js'
import { FiMail } from "react-icons/fi";

const Cards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {feedbacks.map((feedback, id) => (
          <div
            key={id}
            className="min-w-full h-[20vh] bg-white shadow-lg rounded-lg px-6 p-4"
          >
            <div>
            <h1 className="text-2xl font-bold">{feedback.sender}</h1>
            <div className="flex gap-5 mt-7">
            <FiMail className="text-4xl text-[#0B2E33]" />
            <div>
            <p className="text-md">{feedback.message}</p>
            <span className="text-gray-500">{feedback.time}</span>
            </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cards;