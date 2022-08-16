const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    serverId: String,
    projectId: String,
    projectName: String,
    members: [String]
  }, {timestamp: true})

projectSchema.statics.findOneAndCreate = async function findOneAndCreate(condition, doc) {
  const self = this;
  const result = await self.findOne(condition);
  if (result) {
    return result
  } else {
    return await self.create(doc)
  }
}

/**
 * Checks if all members have posted in the standup
 * @param {function} callback
 */
 projectSchema.methods.checkFulfilled = function (callback) {
  const missing = [];

  this.members.forEach((member) => {
    if (!this.responses.get(member)) {
      missing.push(member);
    }
  });
  callback(missing);
};

module.exports = model("Project", projectSchema);