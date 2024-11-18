import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Home() {
    return (
        <div className='main'>
            <Header />
            <div className="heading">
                <h1>Test Your Abilities</h1>
            </div>
            <Grid />
        </div>
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
