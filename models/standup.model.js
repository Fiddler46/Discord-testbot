const { Schema, model } = require("mongoose");

/**
 * Schema for report
 *
 * @property {String}   _id         id of the guild
 * @property {String}   channelId   id of the text-channel 'daily-standups'
 * @property {[String]} members     array of userIds for the members of the standup
 * @property {Map}      responses   Map<UserId, String> of responses
 */

const standupSchema = new Schema({
  member: { type: Schema.ObjectId, ref: 'Members', required: true },
  reportTime: Date,
  project: { type: Schema.ObjectId, ref: 'Members', required: true },
  scrum: String,
  features: [String],
  enhancements: [String],
  blockers: [String],
});

/**
 * Checks if all members have posted in the standup
 * @param {function} callback
 */
standupSchema.methods.checkFulfilled = function (callback) {
  const missing = [];

  this.members.forEach((member) => {
    if (!this.responses.get(member)) {
      missing.push(member);
    }
  });
  callback(missing);
};

module.exports = model("Standup", standupSchema);
