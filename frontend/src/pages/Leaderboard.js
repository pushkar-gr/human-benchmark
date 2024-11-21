import React, { useEffect, useState } from 'react';
import Header from './Header';
import './Leaderboard.css';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('reactionTime');
    const [sortOrder, setSortOrder] = useState('asc');

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

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sortedLeaderboard = [...leaderboard].sort((a, b) => {
            const aScore = a.highScores[field] || 0;
            const bScore = b.highScores[field] || 0;

            if (order === 'asc') {
                return aScore - bScore;
            } else {
                return bScore - aScore;
            }
        });

        setLeaderboard(sortedLeaderboard);
    };

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
                            <th onClick={() => handleSort('reactionTime')} style={{ cursor: 'pointer' }}>
                                Reaction Time {sortField === 'reactionTime' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('aimTrainer')} style={{ cursor: 'pointer' }}>
                                Aim Trainer {sortField === 'aimTrainer' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('numberMemory')} style={{ cursor: 'pointer' }}>
                                Number Memory {sortField === 'numberMemory' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('sequenceMemory')} style={{ cursor: 'pointer' }}>
                                Sequence Memory {sortField === 'sequenceMemory' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('visualMemory')} style={{ cursor: 'pointer' }}>
                                Visual Memory {sortField === 'visualMemory' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('verbalMemory')} style={{ cursor: 'pointer' }}>
                                Verbal Memory {sortField === 'verbalMemory' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((user, index) => (
                            <tr key={user.username}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{(user.highScores?.reactionTime !== 1000000) ? user.highScores.reactionTime : 'N/A'}</td>
                                <td>{(user.highScores?.aimTrainer !== 1000000) ? user.highScores.aimTrainer : 'N/A'}</td>
                                <td>{user.highScores?.numberMemory || 'N/A'}</td>
                                <td>{user.highScores?.sequenceMemory || 'N/A'}</td>
                                <td>{user.highScores?.visualMemory || 'N/A'}</td>
                                <td>{user.highScores?.verbalMemory || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;
