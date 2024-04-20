const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  hobbies: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel
