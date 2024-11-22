import React, { useEffect, useState } from 'react';
import './Profile.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem('user'));

        if (username) {
            fetch(`http://localhost:5000/api/user/highscore?username=${username}`)
                .then(response => response.json())
                .then(data => {
                    if (data.highScores) {
                        setUserData({
                            username,
                            highScores: data.highScores,
                        });
                    } else {
                        console.error(data.message);
                    }
                })
                .catch(error => console.error('Error fetching high scores:', error));
        } else {
            navigate('/login');
            return;
        }
    }, []);

    if (!userData) {
        return <div className="profile-page">Loading...</div>;
    }

    const handleDeleteAccount = () => {
        const username = JSON.parse(localStorage.getItem('user'));
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            fetch(`http://localhost:5000/api/user/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                        localStorage.removeItem('user');
                        localStorage.removeItem('highScores');
                        navigate('/login');
                    } else {
                        alert('Error deleting account');
                    }
                })
                .catch(error => console.error('Error deleting account:', error));
        }
    };

    const { username, highScores } = userData;
    const highScoreName = {
        "reactionTime": "Reaction Time",
        "aimTrainer": "Aim Trainer",
        "numberMemory": "Number Memory",
        "sequenceMemory": "Sequence Memory",
        "visualMemory": "Visual Memory",
        "verbalMemory": "Verbal Memory"
    }

    return (
        <div className='main'>
            <Header />
            <div className="profilePage">
                <h1>Profile</h1>
                <div className="profileCard">
                    <h2>Username: <p className='profileValue'>{username}</p></h2>
                    <h3>High Scores:</h3>
                    <ul>
                        {Object.entries(highScores).map(([test, score]) => (
                            <li key={test}>
                                {highScoreName[test]}:<p className='profileValue'>{(score === 0 || score === 1000000) ? 'N/A' : score}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleDeleteAccount} className="profileDelete btn draw-border">
                    Delete Account
                </button>
            </div>
        </div>
    );
}

export default Profile;
