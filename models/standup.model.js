const { Schema, model } = require("mongoose");

// const standupSchema = new Schema({
//   channel: String,
//   member: String,
//   scrum: String,
//   features: [String],
//   enhancements: [String],
//   blockers: [String],
// }, {timestamp: true})

// module.exports = model("Standup", standupSchema);

const standupSchema = new Schema({
  member: String,
  reportTime: {type: Date, default: () => Date.now()},
  project: String,
  scrum: String,
  features: [String],
  enhancements: [String],
  blockers: [String],
});

module.exports = model("Standups", standupSchema);
