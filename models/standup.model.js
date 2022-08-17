const { Schema, model } = require("mongoose");

const standupSchema = new Schema({
  channel: String,
  member: String,
  scrum: String,
  features: [String],
  enhancements: [String],
  blockers: [String],
}, {timestamp: true})

module.exports = model("Standup", standupSchema);