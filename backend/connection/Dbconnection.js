const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Dbconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database Successfully");
    } catch (error) {
        console.error("Error While Database connection:", error.message);
    }
};

module.exports = Dbconnection;
