import React from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    return (
        <div className="main">
            <Header />
            <div className="heading">
                <h1>Test Your Abilities</h1>
            </div>
            <Grid />
        </div>
    );
};

const Header = () => {
    return (
        <header>
            <div className="logo">Benchmark</div>
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/leaderboard">Leaderboard</Link></li>
                    <li><Link to="/login">Login/Sign Up</Link></li>
                </ul>
            </nav>
        </header>
    );
};

const Grid = () => {
    return (
        <div className="grid">
            <Button
                title="Reaction Time"
                description="Test your reaction time."
                route="/test/reactiontime"
            />
            <Button
                title="Aim Trainer"
                description="Improve your aim."
                route="/test/aimtrainer"
            />
            <Button
                title="Number Meomory"
                description="Test your number memory skills."
                route="/test/numbermemory"
            />
            <Button
                title="Sequence Meomory"
                description="Test your sequence memory skills."
                route="/test/sequencememory"
            />
        </div>
    );
};

const Button = ({ title, description, route }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    return (
        <button className="btn draw-border" onClick={handleClick}>
            <h2>{title}</h2>
            <p>{description}</p>
        </button>
    );
};

export default Home;
