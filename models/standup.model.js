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
  member: { type: Schema.ObjectId, ref: "Members", required: false },
  reportTime: {type: Date, default: () => Date.now()},
  project: { type: Schema.ObjectId, ref: "Projects", required: false },
  scrum: String,
  features: [String],
  enhancements: [String],
  blockers: [String],
});

module.exports = model("Standups", standupSchema);
