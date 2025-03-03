var express = require('express');
var dotenv = require('dotenv')
var connectDB = require('./config/db')
var taskRoute = require('./routes/task.route')
var userRoute = require('./routes/user.route')

dotenv.config();

var app = express();
connectDB();

app.use(express.json());

app.use('/api/tasks', taskRoute);
app.use('/api/user', userRoute);

var port = 3000 || process.env.PORT;

app.listen(port, () => 
    console.log(`Server running on http://localhost:${port}`)
);
