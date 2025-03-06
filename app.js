import express from 'express';
import dotenv from'dotenv';
import connectDB from './config/db.js';
import taskRoute from './routes/task.route.js';
import userRoute from './routes/user.route.js';
import groupRoue from './routes/group.route.js';
import cors from 'cors';

dotenv.config();

var app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoute);
app.use('/api/user', userRoute);
app.use('/api/group', groupRoue);

var port = process.env.PORT;

app.listen(port, () => 
    console.log(`Server running on http://localhost:${port}`)
);
