const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    m_id: String,
    m_name: String,
    project: String,
    content: [{
        timeOfCreation: Date,
        features: [String],
        enhancements: [String],
        blockers: [String],
        others: [String],
    }],
});

module.exports = model('Reports', reportSchema);