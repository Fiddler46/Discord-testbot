const channelModel = require("../models/channel.model");
/**
 * !am - Adds a new member to the standup
 * NOTE: server admin can only preform this operation
 */
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

    channelModel
      .findOne({channelId: message.channel.id})
      .then((channel) => {
        args.forEach((mention) => {
          if (mention.startsWith("<@") && mention.endsWith(">")) {
            mention = mention.slice(2, -1);

            if (mention.startsWith("!")) mention = mention.slice(1);

            const member = message.guild.members.cache.get(mention);

            if (member && channel.members.indexOf(member.id) == -1)
              channel.members.push(member.id);
          }
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
