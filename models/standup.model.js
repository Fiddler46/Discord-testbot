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
  member: { type: Schema.ObjectId, ref: 'Members', required: true },
  reportTime: Date,
  project: { type: Schema.ObjectId, ref: 'Members', required: true },
  scrum: String,
  features: [String],
  enhancements: [String],
  blockers: [String],
});


module.exports = model("Standup", standupSchema);