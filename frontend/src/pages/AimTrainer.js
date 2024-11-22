import React, { useState, useEffect } from "react";
import "./AimTrainer.css"
import Header from "./Header";

const AimTrainer = () => {
    const [circle, setCircle] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [currentCircle, setCurrentCircle] = useState(0);
    const [totalCircles] = useState(20);
    const username = JSON.parse(localStorage.getItem("user"));

    const updateHighScore = (newScore) => {
        fetch("http://localhost:5000/api/user/highscore", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                game: "aimTrainer",
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

    const handleCircleClick = () => {
        if (currentCircle === 0) {
            setStartTime(Date.now());
        }

        if (currentCircle < totalCircles - 1) {
            setCurrentCircle((prev) => prev + 1);
            spawnCircle();
        } else {
            setEndTime(Date.now());
            setCircle(null);
        }
    };

    const spawnCircle = () => {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;

        setCircle({ x, y });
    };

    useEffect(() => {
        if (endTime && startTime) {
            const totalTime = (endTime - startTime) / totalCircles;
            updateHighScore(totalTime);
        }
    }, [endTime]);

    useEffect(() => {
        if (currentCircle < totalCircles) {
            spawnCircle();
        }
    }, [currentCircle]);

    const resetTrainer = () => {
        setCurrentCircle(0);
        setStartTime(null);
        setEndTime(null);
        spawnCircle();
    };

    const totalTime = endTime && startTime ? `${(endTime - startTime) / totalCircles} ms` : null;

    return (
        <div className="main">
            <Header />
            <div className="aimContainer">
                <h1 className="aimHead1">Aim Trainer</h1>
                {totalTime == null && <p>{totalCircles - currentCircle} circles left</p>}
                {totalTime && <h2>Time taken: {totalTime}</h2>}
                <div className="aimGameArea">
                    {circle && (
                        <div
                            className="aimCircle"
                            style={{
                                left: `${circle.x}%`,
                                top: `${circle.y}%`,
                            }}
                            onClick={handleCircleClick}
                        ></div>
                    )}
                </div>
                <button onClick={resetTrainer} className="aimButton btn draw-border">
                    Restart
                </button>
            </div>
        </div>
    );
};

export default AimTrainer;
