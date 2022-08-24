const { Schema, model } = require("mongoose");

const weeklyReportSchema = new Schema({
    serverId: String,
    projectId: String,
    projectName: String,
    memberName: String,
    memberId: String, 
    features: [String],
    enhancements: [String],
    others: [String],
    blockers: [String],
    week: String
  }) ;

  weeklyReportSchema.statics.findOneAndCreate = async function findOneAndCreate(condition, doc) {
  const self = this;
  const result = await self.findOne(condition);
  if (result) {
    return result
  } else {
    return await self.create(doc)
  }
}

module.exports = model("Projects", weeklyReportSchema);