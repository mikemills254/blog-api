import express from 'express';
import dotenv from 'dotenv';
import Database from './Utilities/Database.js';
import router from './Routes/route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

// Routes
app.get('/api/v1', (req, res) => {
    return res.status(200).json({
        message: "Welcome to the blog API"
    });
});

app.use('/api/v1', router)

const startServer = async () => {
    try {
        await Database.connect();
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    try {
        await Database.disconnect();
        console.log('Disconnected from the database');
        process.exit(0);
    } catch (error) {
        console.error('Error disconnecting from the database:', error.message);
        process.exit(1);
    }
});

startServer();
