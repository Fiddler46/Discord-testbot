const { Schema, model } = require("mongoose");

const weeklyReportSchema = new Schema({
  m_id: String,
  m_name: String,
  project: String,
  content: {
      timeOfCreation: String,
      features: [String],
      enhancements: [String],
      blockers: [String]
  },
});
  weeklyReportSchema.statics.findOneAndCreate = async function findOneAndCreate(condition, doc) {
  const self = this;
  const result = await self.findOne(condition);
  if (result) {
    return result
  } else {
    return await self.create(doc)
  }
}

module.exports = model("WeeklyReports", weeklyReportSchema);