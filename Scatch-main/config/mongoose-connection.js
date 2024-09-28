const mongoose = require('mongoose');
const dbgr = require("debug")

// Replace 'dbgr' with console.log if that's your logging function
mongoose.connect('mongodb://localhost:27017/SCATCH')
  .then(function() {
    dbgr("Connected to the database"); // Log successful connection
  })
  .catch(function(err) {
    dbgr("Database connection error:", err); // Log any errors that occur during connection
  });
