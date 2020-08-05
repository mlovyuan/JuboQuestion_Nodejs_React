const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 將 .env 文件中的環境參數加載到 process.env
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongoDb & 連線字串
const uri = process.env.ATLAS_URI;
// 若為本機uri可放入DB的位址
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});

const ordersRouter = require('./routes/ordersRoute');
const patientsRouter = require('./routes/patientsRoute');

app.use('/orders', ordersRouter);
app.use('/patients', patientsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});