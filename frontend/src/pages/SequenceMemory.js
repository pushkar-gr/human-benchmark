import React, { useState, useEffect } from "react";
import './SequenceMemory.css';

const SequenceMemory = () => {
    const [level, setLevel] = useState(1);
    const [sequence, setSequence] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [isDisplayingSequence, setIsDisplayingSequence] = useState(false);
    const [currentHighlight, setCurrentHighlight] = useState(null);
    const [userHighlight, setUserHighlight] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (level === 1) {
            generateInitialSequence();
        } else {
            extendSequence();
        }
    }, [level]);

    const generateInitialSequence = () => {
        const newSequence = [Math.floor(Math.random() * 9)];
        setSequence(newSequence);
        displaySequence(newSequence);
    };

    const extendSequence = () => {
        const nextNumber = Math.floor(Math.random() * 9);
        const newSequence = [...sequence, nextNumber];
        setSequence(newSequence);
        displaySequence(newSequence);
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
        if (isDisplayingSequence || showResult || gameOver) return;

        setUserHighlight(index);
        setTimeout(() => setUserHighlight(null), 200);

        const updatedUserInput = [...userInput, index];
        setUserInput(updatedUserInput);

        if (updatedUserInput.length === sequence.length) {
            if (JSON.stringify(updatedUserInput) === JSON.stringify(sequence)) {
                setShowResult(true);
            } else {
                setShowResult(true);
            }
        }
    };

    const nextLevel = () => {
        setShowResult(false);
        setUserInput([]);
        if (level < 20) {
            setLevel(level + 1);
        } else {
            setGameOver(true);
        }
    };

    const restartGame = () => {
        setLevel(1);
        setSequence([]);
        setUserInput([]);
        setGameOver(false);
        setShowResult(false);
        generateInitialSequence();
    };

    const renderCell = (index) => {
        const isHighlighted = index === currentHighlight;
        const isUserClicked = index === userHighlight;
        const cellClass = `cell ${isHighlighted ? 'highlighted' : ''} ${isUserClicked ? 'clicked' : ''}`;
        return (
            <div
                key={index}
                className={cellClass}
                onClick={() => handleCellClick(index)}
            ></div>
        );
    };

    return (
        <div className="container">
            <h1>Sequence Memory</h1>
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
                    <div className="grid">
                        {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
                    </div>
                    {showResult && (
                        <div>
                            <p>
                                Your Input: {userInput.join(",")} <br />
                                Correct Sequence: {sequence.join(",")}
                            </p>
                            {JSON.stringify(userInput) === JSON.stringify(sequence) ? (
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

export default SequenceMemory;
