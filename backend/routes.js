const express = require('express');
const router = express.Router();
const connectDB = require('./db.js');

router.post('/user/register', (req, res) => {
    const { username, password } = req.body;
    connectDB().then((db) => {
        const users = db.collection('users');

        return users.findOne({ username }).then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            return users
                .insertOne({
                    username,
                    password: password,
                    highScores: {
                        reactionTime: 0,
                        aimTrainer: 0,
                        numberMemory: 0,
                    },
                })
                .then(() => res.status(201).json({ message: 'User registered successfully' }));
        });
    })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error registering user', error });
        });

});

router.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    connectDB()
        .then(db => {
            const users = db.collection('users');

            return users.findOne({ username }).then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                if (user.password !== password) {
                    return res.status(401).json({ message: 'Invalid password' });
                }

                res.status(200).json({ message: 'Login successful', user });
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error logging in', error });
        });
});

router.put('/user/highscore', (req, res) => {
    const { username, game, score } = req.body;

    connectDB()
        .then(db => {
            const users = db.collection('users');

            return users
                .updateOne(
                    { username },
                    { $max: { [`highScores.${game}`]: score } }
                )
                .then(result => {
                    if (result.modifiedCount === 0) {
                        return res.status(404).json({ message: 'User not found' });
                    }

                    res.status(200).json({ message: 'High score updated successfully' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error updating high score', error });
        });
});

router.get('/user/highscore', (req, res) => {
    const { username } = req.query;

    connectDB()
        .then(db => {
            const users = db.collection('users');

            return users.findOne({ username }).then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.status(200).json({ highScores: user.highScores });
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error fetching high scores', error });
        });
});

router.get('/leaderboard', (req, res) => {
    connectDB()
        .then(db => {
            const users = db.collection('users');

            return users
                .find({}, { projection: { username: 1, highScores: 1, _id: 0 } })
                .toArray()
                .then(users => {
                    res.status(200).json(users);
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error fetching leaderboard', error });
        });
});

module.exports = router;
