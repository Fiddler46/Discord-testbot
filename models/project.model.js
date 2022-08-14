const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
    p_name: String,
    active: Boolean
  });

module.exports = model('Projects', projectSchema);