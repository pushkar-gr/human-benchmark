import React, { useState, useRef } from "react";

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
    if (! timeoutRef.current) {
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
    <div style={styles.container}>
      <h1>Reaction Time Test</h1>
      <div
        style={{
          ...styles.box,
          backgroundColor: color,
        }}
        onClick={handleClick}
      ></div>
      <p>{message}</p>
      <button onClick={startTest} style={styles.button}>
        Start Test
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  box: {
    width: "200px",
    height: "200px",
    cursor: "pointer",
    margin: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default ReactionTimeTest;

