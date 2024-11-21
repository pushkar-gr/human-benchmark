const express = require('express');
const router = express.Router();
const connectDB = require('./db.js');

const validateInput = (fields, body) => {
    return fields.every(field => body[field]);
};

router.post('/user/register', async (req, res) => {
    const { username, password } = req.body;

    if (!validateInput(['username', 'password'], req.body)) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const db = await connectDB();
        const users = db.collection('users');

        const existingUser = await users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        await users.insertOne({
            username,
            password,
            highScores: {
                reactionTime: 1000000,
                aimTrainer: 1000000,
                numberMemory: 0,
                sequenceMemory: 0,
                visualMemory: 0,
                verbalMemory: 0,
            },
        });

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user.', error });
    }
});

router.post('/user/login', async (req, res) => {
    const { username, password } = req.body;

    if (!validateInput(['username', 'password'], req.body)) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const db = await connectDB();
        const users = db.collection('users');

        const user = await users.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        res.status(200).json({ message: 'Login successful.', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in.', error });
    }
});

router.put('/user/highscore', (req, res) => {
    const { username, game, score } = req.body;
    connectDB()
        .then((db) => {
            const users = db.collection('users');

            const updateOperation =
                game === "reactionTime" || game === "aimTrainer"
                    ? { $min: { [`highScores.${game}`]: score } }
                    : { $max: { [`highScores.${game}`]: score } };

            return users
                .updateOne({ username }, updateOperation)
                .then((result) => {
                    if (result.matchedCount === 0) {
                        return res.status(404).json({ message: 'User not found' });
                    }

                    res.status(200).json({ message: 'High score updated successfully' });
                });
        })
        .catch((error) => {
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

router.delete('/user/delete', (req, res) => {
    const { username } = req.body;

    connectDB()
        .then(db => {
            const users = db.collection('users');

            return users.deleteOne({ username }).then(result => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.status(200).json({ message: 'Account deleted successfully' });
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error deleting account', error });
        });
});

module.exports = router;
