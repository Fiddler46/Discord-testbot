const { Schema, model } = require("mongoose");

const serverSchema = new Schema({
    serverId: String,
    standupChannelId: String,
  }, {timestamp: true})


module.exports = model("Server", serverSchema);