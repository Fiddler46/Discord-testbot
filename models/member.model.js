const { Schema, model } = require("mongoose");

const memberSchema = new Schema({
    m_id: String,
    m_name: String,
    projects: [String]
});

module.exports = model('Members', memberSchema);

// projects: {type: Schema.ObjectId, ref: "Projects"}