import React, { useState, useRef } from "react";
import './ReactionTime.css';

const ReactionTimeTest = () => {
    const [color, setColor] = useState("red");
    const [message, setMessage] = useState("Click start");
    const [startTime, setStartTime] = useState(null);
    const [reactionTime, setReactionTime] = useState(null);
    const timeoutRef = useRef(null);

    const startTest = () => {
        if (timeoutRef.current) {
            return;
        }
        setColor("red");
        setMessage("Wait for green...");
        setReactionTime(null);

        const delay = Math.random() * 3000 + 2000;

        timeoutRef.current = setTimeout(() => {
            setColor("green");
            setMessage("Click!");
            setStartTime(Date.now());
        }, delay);
    };

    const handleClick = () => {
        if (!timeoutRef.current) {
            return
        }
        if (color === "green") {
            const timeTaken = Date.now() - startTime;
            setReactionTime(timeTaken);
            timeoutRef.current = null;
            setMessage(`Your reaction time: ${timeTaken} ms`);
            setColor("red");
        } else if (color === "red") {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            setMessage("Too soon! Wait for green.");
            setColor("red");
        }
    };

    return (
        <div className="container">
            <h1>Reaction Time Test</h1>
            <div
                className="box"
                style={{
                    backgroundColor: color,
                }}
                onClick={handleClick}
            ></div>
            <p>{message}</p>
            <button onClick={startTest} className="button">
                Start Test
            </button>
        </div>
    );
};

export default ReactionTimeTest;
