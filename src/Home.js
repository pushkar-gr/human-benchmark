import React from 'react';

function Home() {
    const startTest = () => {
        console.log('Test started!');
    };

    return (
        <div className="main">
            <Header />
            <div className="heading">
                <h1>Test Your Abilities</h1>
            </div>
            <Grid startTest={startTest} />
        </div>
    );
}

const Header = () => {
    return (
        <header>
            <div className="logo">Benchmark</div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Leaderboard</a></li>
                    <li><a href="#">Login/Sign Up</a></li>
                </ul>
            </nav>
        </header>
    );
};

const Grid = ({ startTest }) => {
    return (
        <div className="grid">
            <Button 
                title="Reaction Time" 
                description="Test your reaction time." 
                startTest={startTest} 
            />
            <Button 
                title="Memory Test" 
                description="Test your memory skills." 
                startTest={startTest} 
            />
        </div>
    );
};

const Button = ({ title, description, startTest }) => {
    return (
        <button className="btn draw-border" onClick={startTest}>
            <h2>{title}</h2>
            <p>{description}</p>
        </button>
    );
};

export default Home
