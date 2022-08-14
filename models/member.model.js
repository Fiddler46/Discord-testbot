const { Schema, model } = require("mongoose");

const memberSchema = new Schema({
    m_id: String,
    projects: {type: Schema.ObjectId, ref: "Projects"}
});

module.exports = model('Members', memberSchema);