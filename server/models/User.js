const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    userFullname: String,
    userFullName: {
        type: String,
        required: true,
        unique: true // Ensure that each username is unique
      },
    userUserName: {
        type: String,
        required: true,
        unique: true // Ensure that each username is unique
      },
      userPassword: {
        type: String,
        required: true
      },
      userEmail: {
        type: String,
        required: true,
        unique: true // Ensure that each email is unique
      }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;