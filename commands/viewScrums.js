const standupModel = require("../models/standup.model");

module.exports = {
  name: "scrums",
  description: "View all standup responses",
  execute(message, args) {
    if (message.channel.type === "text") {
            console.log(standModel.members)
            message.channel.send(standupModel, typeof(standupModel))
    }    
    else{
      message.channel.send("Use this command on a project channel")
    }
} }
