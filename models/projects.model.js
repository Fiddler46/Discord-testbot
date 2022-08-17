const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    serverId: String,
    projectId: String,
    projectName: String,
    members: [String],
    active: Boolean
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

module.exports = model("Project", projectSchema);