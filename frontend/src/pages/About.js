import React from 'react';
import Header from './Header';
import "./About.css"

function About() {
    return (
        <div className='main'>
            <Header />
            <section className='aboutSection'>
                <h1>About Page</h1>
                <div>
                    The Human Benchmark website is a platform designed to test and measure various cognitive and reaction time skills,
                    allowing users to assess their abilities in several mental tasks. It's often used by people who want to track their brain performance,
                    improve cognitive abilities, or simply engage in fun challenges. The website offers a variety of games and tests that measure different
                    aspects of mental function, including memory, attention, reaction time, and more. Here's an overview of the main features and functions of the site:
                </div>
                
                <div>

                    <h2>1. Reaction Time</h2>
                    
                    <h3>Purpose:</h3> Measures how quickly you can respond to a visual stimulus (usually a light turning on).
                    <h3>How it works:</h3> You wait for a prompt to appear (like a color change), and when it does, you click as fast as possible. Your reaction time is measured in milliseconds.
                </div>
                
                <div>

                    <h2>2. Number Memory</h2>
                    
                    Number Memory: You’re shown a sequence of numbers for a few seconds, then asked to recall them in the correct order. The length of the sequence increases as you progress.
                    Visual Memory: Similar to number memory, but you’re shown a sequence of visual patterns or colors, which you need to recall.
                </div>
                
                <div>

                    <h2>3. Aim Lab (Reaction Time / Aim Precision)</h2>
                    
                    <h3>Purpose:</h3> A game designed to test your precision and reaction time in hitting targets.
                    <h3>How it works:</h3> You need to aim and click on moving targets as fast as possible. It’s often used by gamers to assess their aim and reflexes.
                </div>
                
                <div>

                    <h2>4. Verbal Memory</h2>
                    
                    <h3>Purpose:</h3> Measures how well you can remember words.
                    <h3>How it works:</h3> You’re shown a list of words for a certain period, then asked to recall as many as you can.
                </div>
                
                <div>

                    <h2>5. Visual Memory</h2>
                    
                    <h3>Purpose:</h3> Tests your ability to recognize visual patterns.
                    <h3>How it works:</h3> You’ll be shown a grid with a pattern, and after a brief moment, it will disappear. You then have to recreate the pattern from memory.
                </div>
                
                <div>

                    <h2>6. Sequence Memory</h2>
                    
                    <h3>Purpose:</h3> A more complex test of your memory where you’re shown a sequence of colored tiles, and you must remember and reproduce the sequence.
                    <h3>How it works:</h3> The sequence of colors grows longer as you progress, challenging your working memory.
                </div>
                
                <div>


                    <h2>7. Progress Tracking & Leaderboards</h2>
                    
                    <h3>Purpose:</h3> Allows users to track their performance across different tests over time.
                    <h3>How it works:</h3> You can compare your scores to other users’ averages, or compete in leaderboards based on high scores.
                    Some tests allow you to compare against different age groups, genders, or other demographics
                </div>
                
            </section>
        </div>
    );
}
export default About;
