import React, { useState, useEffect } from "react";
import "./VisualMemory.css";
import Header from "./Header";

const VisualMemory = () => {
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);
    const [gridSize, setGridSize] = useState(3);
    const [markedSquares, setMarkedSquares] = useState([]);
    const [userClicks, setUserClicks] = useState([]);
    const [showSquares, setShowSquares] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const username = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!gameOver && !isTransitioning) {
            const totalSquares = gridSize * gridSize;
            const newMarkedSquares = new Set();

            while (newMarkedSquares.size < level + 2) {
                newMarkedSquares.add(Math.floor(Math.random() * totalSquares));
            }

            setMarkedSquares([...newMarkedSquares]);
            setShowSquares(true);

            const timer = setTimeout(() => {
                setShowSquares(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [level, gridSize, gameOver, isTransitioning]);

    const handleSquareClick = (index) => {
        if (showSquares || userClicks.includes(index) || isTransitioning) return;

        const updatedUserClicks = [...userClicks, index];
        setUserClicks(updatedUserClicks);

        if (!markedSquares.includes(index)) {
            setLives(lives - 1);

            if (lives - 1 <= 0) {
                setGameOver(true);
                updateHighScore(level - 1);
            }
        } else if (updatedUserClicks.length === markedSquares.length) {
            setIsTransitioning(true);
            setTimeout(() => {
                setLevel(level + 1);
                setGridSize(
                    gridSize * 2 === markedSquares.length + 1 ? gridSize + 1 : gridSize
                );
                setUserClicks([]);
                setIsTransitioning(false);
            }, 500);
        }
    };

    const updateHighScore = (newScore) => {
        fetch("http://localhost:5000/api/user/highscore", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                game: "visualMemory",
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

    const restartGame = () => {
        setLives(3);
        setLevel(1);
        setGridSize(3);
        setUserClicks([]);
        setGameOver(false);
    };

    const renderGrid = () => {
        const totalSquares = gridSize * gridSize;
        const squares = [];

        for (let i = 0; i < totalSquares; i++) {
            squares.push(
                <div
                    key={i}
                    className={`visualSquare ${
                        showSquares && markedSquares.includes(i)
                            ? "marked"
                            : userClicks.includes(i)
                            ? markedSquares.includes(i)
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    onClick={() => handleSquareClick(i)}
                ></div>
            );
        }

        return squares;
    };

    return (
        <div className="main">
            <Header />
            <div className="visualMain">
                {gameOver ? (
                    <div className="visualGameover">
                        <h1>Game Over</h1>
                        <p>Your Score: {level - 1}</p>
                        <button onClick={restartGame}>Restart</button>
                    </div>
                ) : (
                    <>
                        <h1>Visual Memory</h1>
                        <div className="visualStats">
                            <p>Lives: {lives}</p>
                            <p>Level: {level}</p>
                        </div>
                        <div
                            className="visualGrid"
                            style={{
                                gridTemplateColumns: `repeat(${gridSize}, 50px)`,
                            }}
                        >
                            {renderGrid()}
                        </div>
                        {isTransitioning && <p>Get ready for the next level...</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default VisualMemory;
