const moongose = require('mongoose');
const uri = "mongodb://localhost:27017/blog";

mongoose.conect(uri);

module.exports = mongoose;