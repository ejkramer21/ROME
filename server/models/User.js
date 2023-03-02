const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    userFullName: {
        type: String,
        required: false,
        unique: false // Ensure that each username is unique
      },
    userUserName: {
        type: String,
        required: true,
        unique: false // Ensure that each username is unique
      },
      userPassword: {
        type: String,
        required: true,

      },
      userEmail: {
        type: String,
        required: true,
        unique: false // Ensure that each email is unique
      }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;