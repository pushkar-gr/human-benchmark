import React, { useEffect, useState } from 'react';
import Header from './Header';
import './Leaderboard.css'

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/leaderboard')
            .then(response => response.json())
            .then(data => {
                setLeaderboard(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching leaderboard:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="leaderboard-page">Loading...</div>;
    }

    return (
        <div className="main">
            <Header />
            <div className="leaderboard-page">
                <h1>Leaderboard</h1>
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Reaction Time</th>
                            <th>Aim Trainer</th>
                            <th>Number Memory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((user, index) => (
                            <tr key={user.username}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.highScores?.reactionTime || 0}</td>
                                <td>{user.highScores?.aimTrainer || 0}</td>
                                <td>{user.highScores?.numberMemory || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;
