const { Schema, model } = require("mongoose");

const memberSchema = new Schema({
    memberId: String,
    project: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ,
  }, {timestamp: true})

  module.exports = model("Member", memberSchema);