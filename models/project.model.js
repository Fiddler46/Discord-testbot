const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    Projects: [String]
  });

module.exports = mongoose.model('Projects', projectSchema);