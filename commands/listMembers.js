const projectModel = require("../models/projects.model");

module.exports = {
  name: "list",
  guildOnly: true,
  description: "List of all members participating in the standup",
  execute(message, args) {
    //console.log(projectModel.find(message.channel.id))
    let channel = message.guild.channels.cache.get(message.channel.id)
    //console.log(channel)
    //console.log(projectModel.find(message.channel.id))
    projectModel.find({projectId: message.channel.id}).then(() => {
      let res = "Here are all members participating in the standup:\n";
      console.log(channel.members.length, " --> channel name")
      if(!channel.members.length) {
        message.reply("there does not seem to be any members in the standup. Try `!am @<user> @<optional_user> ...` to add member(s)")
      } else {
        channel.members.forEach(member => {
          res += `<@${member}>\t`;
        });
        message.channel.send(res);
      }
    }).catch(err => {
      console.error(err);
      message.channel.send(
        "Oh no :scream:! An error occured somewhere in the matrix!"
      );
    })
  },
};
