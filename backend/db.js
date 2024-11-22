const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/";

let db;

const connectDB = async () => {
    if (db) return db;
    return MongoClient.connect(url)
        .then((client) => {
            console.log("Connect to DB");
            db = client.db("human=benchmark");
            return db;
        }).catch((error) => {
            console.log("Error connecting to DB:", error);
            process.exit(1)
        })
}

module.exports = connectDB;
