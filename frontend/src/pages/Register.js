const express = require("express");
const router = express.Router();
const connectDB = require("../db.js"); // Ensure this points to your DB connection file

const validateInput = (fields, body) => {
    return fields.every((field) => body[field]);
};

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!validateInput(["username", "password"], req.body)) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const db = await connectDB();
        const users = db.collection("users");

        // Check if username already exists
        const existingUser = await users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        // Create new user with default high scores
        await users.insertOne({
            username,
            password,
            highScores: {
                reactionTime: 1000000,
                verbalMemory: 0,
                aimTrainer: 0,
            },
        });

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user." });
    }
});

module.exports = router;