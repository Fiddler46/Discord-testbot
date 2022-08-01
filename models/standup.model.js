const { Schema, model } = require("mongoose");

/**
 * Schema for standup
 *
 * @property {String}   _id         id of the guild
 * @property {String}   channelId   id of the text-channel 'daily-standups'
 * @property {[String]} members     array of userIds for the members of the standup
 * @property {Map}      responses   Map<UserId, String> of responses
 */

 const reportSchema = new Schema({
  features: {
    type: Map,
    of: String,
  },
  enhancements: {
    type: Map,
    of: String,
  },
  blockers: {
    type: Map,
    of: String,
  },
});

const standupSchema = new Schema({
  _id: String,
  channelId: String,
  members: [String],
  responses: {
    type: Map,
    of: String,
  },
  reporting: {
    type: reportSchema,
    required: false,
  },
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