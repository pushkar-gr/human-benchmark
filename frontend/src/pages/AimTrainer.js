import React, { useState, useEffect } from "react";
import './AimTrainer.css'
import Header from './Header';

const AimTrainer = () => {
    const [circle, setCircle] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [currentCircle, setCurrentCircle] = useState(0);
    const [totalCircles] = useState(20);

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

    const totalTime = endTime && startTime ? `${(endTime - startTime)/totalCircles} ms` : null;

    return (
        <div className="main">
            <Header />
            <div className="container">
                <h1>Aim Trainer</h1>
                <p>{totalCircles - currentCircle} circles left</p>
                {totalTime && <h2>Time taken: {totalTime}</h2>}
                <div className="gameArea">
                    {circle && (
                        <div
                            className="circle"
                            style={{
                                left: `${circle.x}%`,
                                top: `${circle.y}%`,
                            }}
                            onClick={handleCircleClick}
                        ></div>
                    )}
                </div>
                <button onClick={resetTrainer} className="button">
                    Restart
                </button>
            </div>
        </div>
    );
};

export default AimTrainer;
