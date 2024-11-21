import React, { useState, useEffect } from "react";
import './NumberMeomory.css';
import Header from './Header.js';

const NumberMeomory = () => {
    const [level, setLevel] = useState(1);
    const [number, setNumber] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [progress, setProgress] = useState(0);
    const username = JSON.parse(localStorage.getItem("user"));

    const updateHighScore = (newScore) => {
        fetch("http://localhost:5000/api/user/highscore", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                game: "numberMemory",
                score: newScore,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "High score updated successfully") {
                    console.log("High score updated!");
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Error updating high score:", error);
            });
    };

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

        let progressInterval;
        let currentProgress = 0;
        progressInterval = setInterval(() => {
            currentProgress += 2.5;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(progressInterval);
                setShowInput(true);
            }
        }, 100);
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = () => {
        setShowResult(true);
        setShowInput(false);

        if (userInput === number) {
            updateHighScore(level);
            setTimeout(() => nextLevel(), 1500);
        }
    };

    const nextLevel = () => {
        setLevel(level + 1);
    };

    const restartGame = () => {
        setLevel(1);
        generateNumber();
    };

    return (
        <div className="main">
            <Header />
            <div className="numContainer">
                <h1>Number Memory</h1>
                <div>
                    <h2>Level: {level}</h2>
                    {!showInput && !showResult && (
                        <div>
                            <h3>{number}</h3>
                            <div className="numProgressContainer">
                                <div
                                    className="numProgressBar"
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
                                className="numInput"
                            />
                            <button onClick={handleSubmit} className="numButton btn draw-border">
                                Submit
                            </button>
                        </div>
                    )}
                    {showResult && (
                        <div>
                            <p>Original Number: {number}</p>
                            <p>Your Input: {userInput}</p>
                            {userInput === number ? (
                                <p>Correct! Moving to the next level...</p>
                            ) : (
                                <div>
                                    <p>Game Over!</p>
                                    <button onClick={restartGame} className="numButton btn draw-border">
                                        Restart
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NumberMeomory;
