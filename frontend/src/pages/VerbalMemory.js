import React, { useState, useEffect } from "react";
import './VerbalMemory.css';
import Header from './Header';

const VerbalMemory = () => {
    const [wordsToMemorize, setWordsToMemorize] = useState([]);
    const [currentWord, setCurrentWord] = useState('');
    const [seenWords, setSeenWords] = useState(new Set());
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const username = JSON.parse(localStorage.getItem("user"));

    const wordList = [
        "apple", "banana", "cherry", "grape", "orange",
        "pineapple", "kiwi", "peach", "mango", "melon", 
        "watermelon", "blueberry", "strawberry", "pear", "papaya"
    ];

    const getRandomWord = () => {
        return wordList[Math.floor(Math.random() * wordList.length)];
    };

    const handleAnswer = (isSeen) => {
        const correctAnswer = seenWords.has(currentWord);
        
        if (isSeen === correctAnswer) {
            setScore(score + 1);
        } else {
            setLives(lives - 1);
        }

        // Add the current word to the "seen" set only after it's been shown
        setSeenWords(new Set(seenWords.add(currentWord)));

        // Change to a new word after each answer (correct or not)
        const newWord = getRandomWord();
        setCurrentWord(newWord);

        // End game if lives are 0
        if (lives === 1) {
            setGameOver(true);
            updateHighScore(score); // Update high score when game ends
        }
    };

    const startGame = () => {
        setGameStarted(true);
        setLives(3);
        setScore(0);
        setSeenWords(new Set());
        setGameOver(false);

        // Set the first word when the game starts
        setCurrentWord(getRandomWord());
    };

    const updateHighScore = (newScore) => {
        fetch("http://localhost:5000/api/user/highscore", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                game: "verbalMemory",
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

    return (
        <div className="main">
            <Header />
            <div className="verbalMemoryTestContainer">
                <h1>Verbal Memory Test</h1>
                {!gameStarted && (
                    <button onClick={startGame} className="startButton">
                        Start Game
                    </button>
                )}

                {gameStarted && !gameOver && (
                    <div>
                        <h2>Word: {currentWord}</h2>
                        <p>Score: {score}</p>
                        <p>Lives: {lives}</p>
                        <button onClick={() => handleAnswer(true)} className="answerButton">
                            Seen
                        </button>
                        <button onClick={() => handleAnswer(false)} className="answerButton">
                            New
                        </button>
                    </div>
                )}

                {gameOver && (
                    <div>
                        <h2>Game Over</h2>
                        <h3>Your final score: {score-1}</h3>
                        <button onClick={startGame} className="restartButton">
                            Restart Game
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerbalMemory;