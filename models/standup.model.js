const { Schema, model } = require("mongoose");

const standupSchema = new Schema({
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member'
  },
  scrum: String,
  features: [String],
  enhancements: [String],
  blockers: [String],
}, {timestamp: true})

module.exports = model("Standup", standupSchema);