const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const db = require('./config/mongoose');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.get('/', (req,res) => {
    res.send('Hello, World!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));