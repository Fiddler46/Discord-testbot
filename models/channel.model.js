const { Schema, model } = require("mongoose");

const channelSchema = new Schema({
  serverId: String,
  channelId: String,
  members: [String]
}, {timestamp: true})



/**
 * Checks if all members have posted in the standup
 * @param {function} callback
 */
channelSchema.methods.checkFulfilled = function (callback) {
  const missing = [];

  this.members.forEach((member) => {
    if (!this.responses.get(member)) {
      missing.push(member);
    }
  });
  callback(missing);
};

module.exports = model("Channel", channelSchema);