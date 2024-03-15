const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a name'],
        minLegth: 5,
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide a position'],
        minLegth: 5,
        maxLength: 50
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide a user"]
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Jobs', JobsSchema)