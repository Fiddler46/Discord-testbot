const { Schema, model } = require("mongoose");

const memberSchema = new Schema({
    m_id: String,
    projects: [String]
});

module.exports = mongoose.model('Members', memberSchema);