const { Schema, model } = require("mongoose");

const standupSchema = new Schema({
  m_id: String,
  member: String,
  project: String,
  scrum: String,
  reportTime: Date,
  features: [String],
  enhancements: [String],
  bugs: [String],
  others: [String]
});

module.exports = model("Standups", standupSchema);
