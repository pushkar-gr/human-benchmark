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

    const { username, highScores } = userData;
    const highScoreName = {
        "reactionTime":"Reaction Time",
        "aimTrainer":"Aim Trainer",
        "numberMemory":"Number Memory"
    }

    return (
        <div className='main'>
            <Header />
            <div className="profile-page">
                <h1>Profile</h1>
                <div className="profile-card">
                    <h2>Username: <p className='profileValue'>{username}</p></h2>
                    <h3>High Scores:</h3>
                    <ul>
                        {Object.entries(highScores).map(([test, score]) => (
                            <li key={test}>
                                {highScoreName[test]}:<p className='profileValue'>{score}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;
