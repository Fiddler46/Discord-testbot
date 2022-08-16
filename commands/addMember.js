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

      // console.log(message.author.id)
      // message.channel.name
    const newMember = new memberModel({m_id:message.author.id, projects: [message.channel.name]})
    const projectMember = new memberModel({ projects: [message.channel.name] })

    memberModel.exists({m_id: message.author.id}).then(member=>{
      if(!member){
        newMember.save((err)=>{
          if(err) return console.error(err + "\nThe member is NOT saved!");
          console.log("Document inserted succussfully!");
          return message.channel.send(
            "New member added!"
          );
        })
      }
      else {
        console.log(member.projects);
        if(member.projects.includes(message.channel.name) == true) {
          return message.channel.send(
            "This user is already part of this project, please add a different user."
          )
        }
        else {
          projectMember.save((err) => {
            if (err) return console.error(err + "\nThe member is NOT saved!");
            console.log("New project added");
            return message.channel.send(
              "Updated with a new project!"
            );
          })
        } 
      }
    })



    // memberModel
    //   .findById(message.guild.id)
    //   .then((memberObject) => {
    //     args.forEach((mention) => {
    //       if (mention.startsWith("<@") && mention.endsWith(">")) {
    //         mention = mention.slice(2, -1);

    //         if (mention.startsWith("!")) mention = mention.slice(1);

    //         const member = message.guild.members.cache.get(mention);

    //         if (member && memberObject.m_id.indexOf(member.id) == -1) {
    //           memberObject.m_id.push(member.id);
    //           memberObject.projects.push(message.channel);
    //         }
    //         else {
    //           memberObject.findOne({m_id: member}, (err, obj) => {
    //             if (obj.projects.includes(message.channel)) {
    //               obj.projects.push(message.channel);
    //             } 
    //           })
    //         }
              
    //       }
    //     });

    //     memberObject
    //       .save()
    //       .then(() => message.channel.send("Members updated :tada:"))
    //       .catch((err) => {
    //         console.err(err);
    //         message.channel.send(
    //           "Oh no :scream:! An error occured somewhere in the matrix!"
    //         );
    //       });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     message.channel.send(
    //       "Oh no :scream:! An error occured somewhere in the matrix!"
    //     );
    //   });
  }
};
