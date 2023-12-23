

const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
    username: String,
  });
  
  const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;