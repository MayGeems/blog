const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/blog";

mongoose.connect(uri);

module.exports = mongoose;