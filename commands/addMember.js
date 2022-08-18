const projectModel = require("../models/projects.model");
const memberModel = require("../models/members.model");


module.exports = {
  name: "am",
  usage: "@<user> @<optional_user> ...",
  guildOnly: true,
  description: "Adds a new member to the standup",
  async execute(message, args) {
    if (!args.length)
      return message.channel.send(
        "Ruh Roh! You need to mention **_at least_** one member as argument!"
      );
    console.log("channelname", message.channel);

    projectModel
      .findOneAndCreate(
        { projectId: message.channel.id },
        {
          serverId: message.guild.id,
          projectId: message.channel.id,
          projectName: message.channel.name,
        }
      )
      .then((channel) => {
        args.forEach((mention) => {
          if (mention.startsWith("<@") && mention.endsWith(">")) {
            mention = mention.slice(2, -1);

            if (mention.startsWith("!")) mention = mention.slice(1);
            const member = message.guild.members.cache.get(mention);

            if (member && channel.members.indexOf(member.id) == -1)
              channel.members.push(member.id);
          }
          console.log("member", channel.members)
        });
        channel
          .save()
          .then(() => message.channel.send("Members updated :tada:"))
          .catch((err) => {
            console.err(err);
            message.channel.send(
              "Oh no :scream:! An error occured somewhere in the matrix!"
            );
          });
      })
      .catch((err) => {
        console.error(err);
        message.channel.send(
          "Oh no :scream:! An error occured somewhere in the matrix!"
        );
      });
  },
};
