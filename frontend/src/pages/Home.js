import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Home() {
    return (
        <div className='main'>
            <Header />
            <h1 className="homeHeading">Test Your Abilities</h1>
            <Grid />
        </div>
    );
};

const Grid = () => {
    return (
        <div className="homeGrid">
            <Button
                title="Reaction Time"
                description="Test your reaction time"
                route="/test/reactiontime"
            />
            <Button
                title="Aim Trainer"
                description="Improve your aim"
                route="/test/aimtrainer"
            />
            <Button
                title="Number Meomory"
                description="Remember the longest number you can"
                route="/test/numbermemory"
            />
            <Button
                title="Sequence Meomory"
                description="Remember an increasingly long pattern of button presses"
                route="/test/sequencememory"
            />
            <Button
                title="Visual Meomory"
                description="Remember an increasingly large board of sqaures"
                route="/test/visualmemory"
            />
            <Button
                title="Verbal Memory"
                description="Test your verbal memory"
                route="/test/verbalmemory"
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
