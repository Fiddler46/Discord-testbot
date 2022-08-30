const { Schema, model } = require("mongoose");

const standupSchema = new Schema({
  m_id: String,
  member: String,
  project: String,
  scrum: String,
  reportTime: Date,
  features: [String],
  enhancements: [String],
  blockers: [String],
});

module.exports = model("Standup", standupSchema);
