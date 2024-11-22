import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.js';
import AimTrainer from './pages/AimTrainer.js';
import ReactionTime from './pages/ReactionTime.js';
import NumberMeomory from './pages/NumberMeomory.js';
import SequenceMemory from './pages/SequenceMemory.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import Leaderboard from './pages/Leaderboard.js';
import VisualMemory from './pages/VisualMemory.js';
import VerbalMemory from './pages/VerbalMemory.js';
import Register from './pages/Register.js';
import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/test/aimtrainer" element={<AimTrainer />} />
                    <Route path="/test/reactiontime" element={<ReactionTime />} />
                    <Route path="/test/numbermemory" element={<NumberMeomory />} />
                    <Route path="/test/sequencememory" element={<SequenceMemory />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/test/visualmemory" element={<VisualMemory />} />
                    <Route path="/test/verbalmemory" element={<VerbalMemory />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
