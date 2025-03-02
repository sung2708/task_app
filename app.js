var express = require('express');
var dotenv = require('dotenv')
var connectDB = require('./config/db')

dotenv.config();

var app = express();
connectDB();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('API is runing');
});

var port = 3000 || process.env.PORT;

app.listen(port, () => 
    console.log(`Server running on http://localhost:${port}`)
);
