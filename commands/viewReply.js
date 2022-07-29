const standupModel = require("../models/standup.model");

module.exports = {
  name: "view",
  usage: "@<optional_serverId>",
  description: "View your standup response",
  execute(message, args) {
    if (message.channel.type === "dm") {
      if (args.length == 1 && !args[0].startsWith("@")) {
        return message.reply(
          "Ruh Roh! Thats an invalid command call, try `!help view` for more information."
        );
      } else if (args.length && args[0].startsWith("@")) {
        standupModel
          .findById(args[0].slice(1))
          .then((standup) => {
            if (standup.members.indexOf(message.author.id) !== -1) {
              if (standup.responses.has(message.author.id)) {
                message.reply(
                  "Here is your response:\n" +
                    standup.responses.get(message.author.id)
                );
              } else {
                message.reply(
                  "Ruh Roh! Looks like you do not have a response yet! Add one using the command `!reply @<optional_serverId> [your-message-here]`."
                );
              }
            } else {
              message.channel.send(
                "Ruh Roh! You must be a team member in this server standup!"
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
        standupModel
          .find()
          .then((standups) => {
            const userStandupList = standups.filter(
              (standup) => standup.members.indexOf(message.author.id) !== -1
            );

            if (!userStandupList.length) {
              message.channel.send(
                "Ruh Roh! You must be a team member in ***__at least one__*** server standup to view your response!"
              );
            } else if (userStandupList.length > 1) {
              message.channel.send(
                "Ruh Roh! Looks like you're a member in multiple standup servers!\nTry `!view @<serverId>` if you would like to view a response for a *specific* standup server.\n**_Crunchy Hint:_** To get the serverId for *any* server, right-click the server icon and press `Copy ID`.\nNote that you may need Developer options turned on. But like, what kinda developer uses a standup bot **_AND DOESN'T TURN ON DEVELOPPER SETTINGS_** :man_facepalming:"
              );
            } else {
              let [standup] = userStandupList;
              let userscrum = standup.responses.get(message.author.id)
              console.log(userscrum, typeof(userscrum))
              let f = '#f'
              let e = '#e'
              let b = '#b'
              let p = '#p'

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

              console.log(indices_features)
              console.log(indices_enhancements)
              console.log(indices_blockers)

              // Finding enhancements
              let enhancements = []
              for(let i=0; i<indices_enhancements.length; i++)
              {
                let ijk = indices_enhancements[i];
                ijk+=2
                while(ijk < userscrum.length && (userscrum[ijk]!='#' && userscrum[ijk]!='\n')){
                  enhancements.push(userscrum[ijk]);
                  ijk++ ; 
                }
              }
              enhancements.unshift("Enhancements ==> ")
              enhancements = enhancements.join('')

              // Finding blockers
              let blockers = []
              for(let i=0; i<indices_blockers.length; i++)
              {
                let ijk = indices_blockers[i];
                ijk+=2
                while(userscrum[ijk]!='#' && userscrum[ijk]!='\n'){
                  blockers.push(userscrum[ijk]);
                  ijk++ ; 
                }
              }
              blockers.unshift("Blockers ==> ")
              blockers = blockers.join('')

              // Finding features
              let features = []
              for(let i=0; i<indices_features.length; i++)
              {
                let ijk = indices_features[i];
                ijk+=2
                while(userscrum[ijk] != '#' && userscrum[ijk]!='\n'){
                  features.push(userscrum[ijk]);
                  //console.log(userscrum[ijk])
                  ijk++ ; 
                }
              }
              features.unshift("Features ==> ")
              features = features.join('')
              
              if (standup.responses.has(message.author.id)) {
                message.reply(
                  "Here is your response:\n" + project + '\n' + features + '\n' + blockers + '\n' + enhancements
                    //standup.responses.get(message.author.id)
                );
              } else {
                message.reply(
                  "Ruh Roh! Looks like you do not have a response yet! Add one using the command `!reply @<optional_serverId> [your-message-here]`."
                );
              }
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
      return message.reply("private DM me with `!view` :bomb:");
    }
  },
};
