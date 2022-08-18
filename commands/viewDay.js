const standupModel = require("../models/standup.model");
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');

module.exports = {
  name: "day",
  guildOnly: true,
  usage: "@<optional_serverId>",
  description: "View all scrums for the day for this project",
  execute(message, args) {
    standupModel.find({
        member: message.author.id,
        reportTime: {
            $gte: startOfDay(new Date()),
            $lte: endOfDay(new Date())
        },
        project: message.channel.name
    }, 'scrum').then((err, docs) => {
        if(err) {
            return console.error('Error: ', err);
        }
        else {
           return message.reply (
            "Your scrum for today:\n" + docs
           );
        }
    });
  }
};