const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    professorName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
