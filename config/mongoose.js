const mongoose = require('mongoose');
const debuglog = require('debug')('development:mongooseconfig');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", function (err) {
    console.error('MongoDB connection error:', err); 
});

db.on("open", function(){
    console.log('Connected to MongoDB!');  // Successful connection to MongoDB server
    
})

module.exports = db;