const memberModel = require("../models/member.model");

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

    const mentionedUserID = message.mentions.users.keys().next().value;
    const newMember = new memberModel({m_id: mentionedUserID, projects: [message.channel.name]})
  
 
    const member = await memberModel.findOne({m_id: mentionedUserID});
    if(member) { 
      if(member.projects.includes(message.channel.name) == true) {  
        return message.channel.send(
          "This user is already part of this project, please add a different user."
        )
      }
      else {
        await memberModel.updateOne(
          { m_id: mentionedUserID }, 
          {$push: {projects: message.channel.name} }
        );
        message.reply(
          "Updated user into new project!"
        )
      }
    }
    else {
      newMember.save(function memberSave (err) {
        if(err) throw new Error("Member not saved!")
        console.log("Document inserted succussfully!");
        return message.channel.send(
          "New member added!"
        );
      })
      memberSave().catch(saveError);
    } 
  }
};
