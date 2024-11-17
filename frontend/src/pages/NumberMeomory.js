import React, { useState, useEffect } from "react";
import './NumberMeomory.css';

const NumberMeomory = () => {
  const [level, setLevel] = useState(1);
  const [number, setNumber] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    generateNumber();
  }, [level]);

  const generateNumber = () => {
    const newNumber = Math.floor(Math.random() * Math.pow(10, level))
      .toString()
      .padStart(level, "0");
    setNumber(newNumber);
    setShowInput(false);
    setShowResult(false);
    setUserInput("");
    setProgress(0);

    // Start progress bar timer
    let progressInterval;
    let currentProgress = 0;
    progressInterval = setInterval(() => {
      currentProgress += 2.5; // Increment progress every 100ms
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        setShowInput(true); // Show input field after progress completes
      }
    }, 100);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    setShowResult(true);
    setShowInput(false);
  };

  const nextLevel = () => {
    if (level < 20) {
      setLevel(level + 1);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setLevel(1);
    setGameOver(false);
    generateNumber();
  };

  return (
    <div className="container">
      <h1>Number Trainer</h1>
      {gameOver ? (
        <div>
          <h2>You Win!</h2>
          <button onClick={restartGame} className="button">
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <h2>Level: {level}</h2>
          {!showInput && !showResult && (
            <div>
              <h3>{number}</h3>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          {showInput && (
            <div>
              <p>Enter the number:</p>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="input"
              />
              <button onClick={handleSubmit} className="button">
                Submit
              </button>
            </div>
          )}
          {showResult && (
            <div>
              <p>Original Number: {number}</p>
              <p>Your Input: {userInput}</p>
              {userInput === number ? (
                <button onClick={nextLevel} className="button">
                  Next Level
                </button>
              ) : (
                <button onClick={restartGame} className="button">
                  Restart
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NumberMeomory;
