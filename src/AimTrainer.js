
import React, { useState, useEffect } from "react";

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

  const totalTime = endTime && startTime ? `${endTime - startTime} ms` : null;

  return (
    <div style={styles.container}>
      <h1>Aim Trainer</h1>
      <p>{totalCircles - currentCircle} circles left</p>
      {totalTime && <h2>Total Time: {totalTime}</h2>}
      <div style={styles.gameArea}>
        {circle && (
          <div
            style={{
              ...styles.circle,
              left: `${circle.x}%`,
              top: `${circle.y}%`,
            }}
            onClick={handleCircleClick}
          ></div>
        )}
      </div>
      <button onClick={resetTrainer} style={styles.button}>
        Restart
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "20px",
  },
  gameArea: {
    position: "relative",
    width: "80vw",
    height: "80vh",
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f7f7f7",
  },
  circle: {
    position: "absolute",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "blue",
    cursor: "pointer",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default AimTrainer;
