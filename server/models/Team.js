const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeamSchema = new Schema({
    teamId: Number,
    team: String,
    description:String,
    userid: String,
    role: String,
    color: String
});

const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;