const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,  
  email: String, 
  password: String, 
  createdAt: { type: Date, default: Date.now }

});

const User = mongoose.model('user', userSchema); 

module.exports = User; 
