
import React, { useState, useEffect } from "react";

const NumberTrainer = () => {
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

  const progressBarStyles = {
    width: `${progress}%`,
    height: "10px",
    backgroundColor: "#4caf50",
    borderRadius: "5px",
    transition: "width 0.1s ease",
  };

  return (
    <div style={styles.container}>
      <h1>Number Trainer</h1>
      {gameOver ? (
        <div>
          <h2>You Win!</h2>
          <button onClick={restartGame} style={styles.button}>
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <h2>Level: {level}</h2>
          {!showInput && !showResult && (
            <div>
              <h3>{number}</h3>
              <div style={styles.progressBarContainer}>
                <div style={progressBarStyles}></div>
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
                style={styles.input}
              />
              <button onClick={handleSubmit} style={styles.button}>
                Submit
              </button>
            </div>
          )}
          {showResult && (
            <div>
              <p>Original Number: {number}</p>
              <p>Your Input: {userInput}</p>
              {userInput === number ? (
                <button onClick={nextLevel} style={styles.button}>
                  Next Level
                </button>
              ) : (
                <button onClick={restartGame} style={styles.button}>
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

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "20px",
  },
  progressBarContainer: {
    width: "80%",
    height: "10px",
    backgroundColor: "#ccc",
    borderRadius: "5px",
    margin: "10px auto",
    overflow: "hidden",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "150px",
    margin: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default NumberTrainer;
