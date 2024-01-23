import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.DB_PASS;
const uri = `mongodb+srv://mikemills930:${password}@cluster0.hbyydft.mongodb.net/checkout?retryWrites=true&w=majority`;

class Database {
    static async connect() {
        try {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
                // useUnifiedTopology: true, // This is the default behavior now
            });

            console.log('Connected to MongoDB using Mongoose');
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            throw new Error("Error connecting to MongoDB");
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB using Mongoose");
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error.message);
        }
    }
}

export default Database;
