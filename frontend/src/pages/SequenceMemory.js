import React, { useState, useEffect } from "react";
import "./SequenceMemory.css";
import Header from "./Header";

const SequenceMemory = () => {
    const [level, setLevel] = useState(1);
    const [sequence, setSequence] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [isDisplayingSequence, setIsDisplayingSequence] = useState(false);
    const [currentHighlight, setCurrentHighlight] = useState(null);
    const [userHighlight, setUserHighlight] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const username = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (gameStarted && sequence.length > 0) {
            displaySequence(sequence);
        }
    }, [sequence, gameStarted]);

    const updateHighScore = (newScore) => {
        fetch("http://localhost:5000/api/user/highscore", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                game: "sequenceMemory",
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

    const generateNextSequence = () => {
        const nextNumber = Math.floor(Math.random() * 9);
        setSequence((prevSequence) => [...prevSequence, nextNumber]);
    };

    const displaySequence = async (sequence) => {
        setIsDisplayingSequence(true);
        for (let i = 0; i < sequence.length; i++) {
            setCurrentHighlight(sequence[i]);
            await wait(300);
            setCurrentHighlight(null);
            await wait(100);
        }
        setIsDisplayingSequence(false);
    };

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleCellClick = (index) => {
        if (isDisplayingSequence || gameOver || !gameStarted) return;

        setUserHighlight(index);
        setTimeout(() => setUserHighlight(null), 200);

        const updatedUserInput = [...userInput, index];
        setUserInput(updatedUserInput);

        if (sequence[updatedUserInput.length - 1] !== index) {
            setGameOver(true);
            updateHighScore(level - 1);
        } else if (updatedUserInput.length === sequence.length) {
            handleNextLevel();
            updateHighScore(level - 1);
        }
    };

    const handleNextLevel = async () => {
        setUserInput([]);
        setLevel((prev) => prev + 1);
        await wait(500);
        generateNextSequence();
    };

    const startGame = () => {
        setGameStarted(true);
        setLevel(1);
        setSequence([]);
        setUserInput([]);
        setGameOver(false);
        generateNextSequence();
    };

    const restartGame = () => {
        setGameStarted(false);
        setLevel(1);
        setSequence([]);
        setUserInput([]);
        setGameOver(false);
    };

    const renderCell = (index) => {
        const isHighlighted = index === currentHighlight;
        const isUserClicked = index === userHighlight;
        const cellClass = `seqCell ${isHighlighted ? "highlighted" : ""} ${isUserClicked ? "clicked" : ""}`;
        return (
            <div
                key={index}
                className={cellClass}
                onClick={() => handleCellClick(index)}
            ></div>
        );
    };

    return (
        <div className="main">
            <Header />
            <div className="seqContainer">
                <h1>Sequence Memory</h1>
                {!gameStarted ? (
                    <div>
                        <button onClick={startGame} className="btn draw-border seqButton">
                            Start Game
                        </button>
                    </div>
                ) : gameOver ? (
                    <div>
                        <h2>Game Over!</h2>
                        <p>You reached Level: {level - 1}</p>
                        <button onClick={restartGame} className="btn draw-border seqButton">
                            Play Again
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2>Level: {level}</h2>
                        <div className="seqGrid">
                            {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
                        </div>
                        <p>Repeat the sequence shown!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SequenceMemory;
