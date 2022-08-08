const channelModel = require("../models/channel.model");
const standupModel = require("../models/standup.model");

module.exports = {
  name: "reply",
  usage: "@<optional_serverId> [your-message-here]",
  description: "Reply to standup prompt",
  execute(message, args) {
    if (message.channel.type === "dm") {
      if (!args.length || (args.length == 1 && args[0].startsWith("@")))
        return message.reply(
          "Ruh Roh! You must provide a response as a message. No one likes a :ghost: as a team member :exclamation: :anger:"
        );
      if (args[0].startsWith("@")) {
        channelModel
          .findOne({ serverId: args[0].slice(1) })
          .then((channel) => {
            if (channel && channel.members.indexOf(message.author.id) !== -1) {
              let userscrum = args.splice(1).join(" ")
              console.log(userscrum)

              let [p,f,e,b] = ['#p','#f','#e','#b']

              let indices_features = []
              let indices_enhancements = []
              let indices_blockers = []
              
              let index_project = userscrum.indexOf(p) ;

              let project = []
              index_project += 2
              while(userscrum[index_project] != '#' && userscrum[index_project] != '\n')
              {
                project.push(userscrum[index_project]) ;
                index_project++ ;
              }
              project.unshift("Project Name ==> ")
              project = project.join('')

              //Find all occurances for Features
              let idx = userscrum.indexOf(f);
              while (idx != -1) {
                indices_features.push(idx);
                idx = userscrum.indexOf(f, idx + 1);
              }

              //Find all occurances for Enhancements
              idx = userscrum.indexOf(e);
              while (idx != -1) {
                indices_enhancements.push(idx);
                idx = userscrum.indexOf(e, idx + 1);
              }

              //Find all occurances for Blockers
              idx = userscrum.indexOf(b);
              while (idx != -1) {
                indices_blockers.push(idx);
                idx = userscrum.indexOf(b, idx + 1);
              }

              // Finding enhancements
              let enhancements = []
              for(let i=0; i<indices_enhancements.length; i++)
              {
                enhancements.push(i+1, '. ')
                let ijk = indices_enhancements[i];
                ijk+=2
                while(ijk < userscrum.length && (userscrum[ijk]!='#' && userscrum[ijk]!='\n')){
                  enhancements.push(userscrum[ijk]);
                  ijk++ ; 
                }
                enhancements.push(' \n');
              }
              enhancements = enhancements.join("")

              // Finding blockers
              let blockers = []
              for(let i=0; i<indices_blockers.length; i++)
              {
                blockers.push(i+1, '. ')
                let ijk = indices_blockers[i];
                ijk+=2
                while(ijk < userscrum.length && (userscrum[ijk]!='#' && userscrum[ijk]!='\n')){
                  blockers.push(userscrum[ijk]);
                  ijk++ ; 
                }
                blockers.push(' \n');
              }
              blockers = blockers.join("")


              // Finding features
              let features = []
              for(let i=0; i<indices_features.length; i++)
              {
                features.push(i+1, '. ') ;
                let ijk = indices_features[i];
                ijk+=2
                while(ijk < userscrum.length && (userscrum[ijk] != '#' && userscrum[ijk]!='\n')){
                  features.push(userscrum[ijk]);
                  //console.log(userscrum[ijk])
                  ijk++ ; 
                }
                features.push(' \n');
              }
              features = features.join("")
              console.log(features,'features') ;

              const standup = new standupModel({
                channel: channel._id,
                member: message.author.id,
                features: features.split(' \n'),
                enhancements: enhancements.split(' \n'),
                blockers: blockers.split(' \n'),
              });
              standup
                .save()
                .then(() => message.channel.send("Updated Response :tada:"))
                .catch((err) => {
                  console.error(err);
                  message.channel.send(
                    "Oh no :scream:! An error occured somewhere in the matrix!"
                  );
                });
            } else {
              message.channel.send(
                "Ruh Roh! You must be a team member in this server standup to reply to the response!"
              );
            }
          })
          .catch((err) => {
            console.error(err);
            message.channel.send(
              "Oh no :scream:! An error occured somewhere in the matrix!"
            );
          });
      } else {
        channelModel
          .find({ members: message.author.id })
          .then((channels) => {
            if (!channels.length) {
              message.channel.send(
                "Ruh Roh! You must be a team member in ***__any__*** server standup to reply to the response!"
              );
            } else if (channels.length > 1) {
              message.channel.send(
                "Ruh Roh! Looks like you're a member in multiple standup servers!\nTry `!reply @<serverId> [your-message-here]` if you would like to reply to a *specific* standup server.\n**_Crunchy Hint:_** To get the serverId for *any* server, right-click the server icon and press `Copy ID`.\nNote that you may need Developer options turned on. But like, what kinda developer uses a standup bot **_AND DOESN'T TURN ON DEVELOPPER SETTINGS_** :man_facepalming:"
              );
            } else {
              const standup = new standupModel({
                channel: channels[0]._id,
                member: message.author.id,
                features: "a6",
                enhancements: "I'm getting a sinking feeling!",
                blockers: "Leonardo di Carpaccio",
              });
              standup
                .save()
                .then(() => message.channel.send("Updated Response :tada:"))
                .catch((err) => {
                  console.error(err);
                  message.channel.send(
                    "Oh no :scream:! An error occured somewhere in the matrix!"
                  );
                });
              console.log(standup);
            }
          })
          .catch((err) => {
            console.error(err);
            message.channel.send(
              "Oh no :scream:! An error occured somewhere in the matrix!"
            );
          });
      }
    } else {
      return message.reply("private DM me with `!reply` :bomb:");
    }
  },
};
