import React, { useState, useEffect } from "react";
import axios from "axios";

const TypingGame = () => {
  const [text, setText] = useState("");
  const [currentChar, setCurrentChar] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchText(); // Fetch text from the API when component mounts
  }, []);

  const fetchText = async () => {
    try {
      const response = await axios.get("your-api-endpoint"); // Replace with your API endpoint
      const textData = response.data;
      setText(textData);
      setCurrentChar(textData[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Post the data to the API
      postData();
      return;
    }

    if (!isTypingStarted) {
      setIsTypingStarted(true);
      startTimer();
    }

    if (event.key === currentChar) {
      setCorrectCount(correctCount + 1);
    }

    setTotalCount(totalCount + 1);
    setCurrentIndex(currentIndex + 1);
    setCurrentChar(text[currentIndex + 1]);
  };

  const startTimer = () => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(elapsedTimeInSeconds);
    }, 1000);
  };

  const postData = async () => {
    try {
      await axios.post("your-api-endpoint", {
        elapsedTime,
        correctCount,
        totalCount,
      });
      console.log("Data posted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Typing Game</h1>
      <p className="mb-4">{text}</p>
      <input
        type="text"
        value={currentChar}
        onChange={() => {}}
        onKeyDown={handleKeyPress}
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2"
      />
      <div className="mt-4">
        {isTypingStarted && (
          <>
            <p>Elapsed Time: {elapsedTime} seconds</p>
            <p>Accuracy: {(correctCount / totalCount) * 100}%</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TypingGame;
