const standupModel = require("../models/standup.model");
const weeklyreportsModel = require("../models/weeklyreports.model");
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');

module.exports = {
  name: "reply",
  usage: "[your-message-here]",
  description: "Reply to standup prompt",
  async execute(message, args) {
    if (message.channel.type === "text") {
      if (!args.length)
        return message.reply(
          "Ruh Roh! You must provide a response as a message. No one likes a :ghost: as a team member :exclamation: :anger:"
        );
            if (message.author.id !== -1) {
              let userscrum = args.splice(1).join(" ");

              let [f, e, b, o] = ["#f", "#e", "#b", "#o"];

              let indices_features = [];
              let indices_enhancements = [];
              let indices_bugs = [];
              let indices_others = [];

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

              //Find all occurances for bugs
              idx = userscrum.indexOf(b);
              while (idx != -1) {
                indices_bugs.push(idx);
                idx = userscrum.indexOf(b, idx + 1);
              }

              //Find all occurances for Others
              idx = userscrum.indexOf(o);
              while (idx != -1) {
                indices_others.push(idx);
                idx = userscrum.indexOf(o, idx + 1);
              }

              // Finding others
              let others = [];
              for (let i = 0; i < indices_others.length; i++) {
                others.push(i + 1, ". ");
                let ijk = indices_others[i];
                ijk += 2;
                while (
                  ijk < userscrum.length &&
                  userscrum[ijk] != "#" &&
                  userscrum[ijk] != "\n"
                ) {
                  others.push(userscrum[ijk]);
                  ijk++;
                }
                if(i < indices_others.length -1 ) others.push("\n")
              }
              others = others.join("");

              // Finding enhancements
              let enhancements = [];
              for (let i = 0; i < indices_enhancements.length; i++) {
                enhancements.push(i + 1, ". ");
                let ijk = indices_enhancements[i];
                ijk += 2;
                while (
                  ijk < userscrum.length &&
                  userscrum[ijk] != "#" &&
                  userscrum[ijk] != "\n"
                ) {
                  enhancements.push(userscrum[ijk]);
                  ijk++;
                }
                if(i < indices_enhancements.length -1 ) enhancements.push("\n")
              }
              enhancements = enhancements.join("");

              // Finding bugs
              let bugs = [];
              for (let i = 0; i < indices_bugs.length; i++) {
                bugs.push(i + 1, ". ");
                let ijk = indices_bugs[i];
                ijk += 2;
                while (
                  ijk < userscrum.length &&
                  userscrum[ijk] != "#" &&
                  userscrum[ijk] != "\n"
                ) {
                  bugs.push(userscrum[ijk]);
                  ijk++;
                }
                if(i < indices_bugs.length -1 ) bugs.push("\n")
              }
              bugs = bugs.join("");

              // Finding features
              let features = [];
              for (let i = 0; i < indices_features.length; i++) {
                features.push(i + 1, ". ");
                let ijk = indices_features[i];
                ijk += 2;
                while (
                  ijk < userscrum.length &&
                  userscrum[ijk] != "#" &&
                  userscrum[ijk] != "\n"
                ) {
                  features.push(userscrum[ijk]);
                  //console.log(userscrum[ijk])
                  ijk++;
                }
                if(i < indices_features.length -1 ) features.push("\n")
              }
              features = features.join("");

              const d = new Date()

              const newweeklyReports = new weeklyreportsModel({
                m_id: message.author.id,
                m_name: message.author.username,
                project: message.channel.name,
                content: {
                  timeOfCreation: new Date().toISOString(),
                  //timeOfCreation: new Date().toDateString(),
                  //timeofCreation: new Date().toUTCString(),
                  others: others.split("\n"),
                  features: features.split("\n"),
                  enhancements: enhancements.split("\n"),
                  bugs: bugs.split("\n")
                }
              })

              // const weeklyReports = await standupModel.findOne({
              //   m_id: message.author.id, 
              //   project: message.channel.name, 
              //   reportTime: {
              //     $gte: startOfDay(new Date()),
              //     $lte: endOfDay(new Date())
              //   } 
              // });

              const newStandup = new standupModel({
                m_id: message.author.id,
                member: message.author.username,
                reportTime: d,
                project: message.channel.name,
                scrum: userscrum,
                features: features.split("\n"),
                enhancements: enhancements.split("\n"),
                bugs: bugs.split("\n"),
                others: others.split("\n")
              });

              const standup = await standupModel.findOne({
                m_id: message.author.id, 
                project: message.channel.name, 
                reportTime: {
                 $gte: startOfDay(new Date()),
                 $lte: endOfDay(new Date())
               } 
             });
             if(standup){
                await standup.updateOne({
                  scrum: userscrum,
                  features: features.split("\n"),
                  enhancements: enhancements.split("\n"),
                  bugs: bugs.split("\n"),
                  others: others.split("\n")
              });
              // await weeklyReports.updateOne({
              //   content: {
              //     timeOfCreation: new Date().toISOString(),
              //     //timeOfCreation: new Date().toDateString(),
              //     //timeofCreation: new Date().toUTCString(),
              //     others: others.split("\n"),
              //     features: features.split("\n"),
              //     enhancements: enhancements.split("\n"),
              //     bugs: bugs.split("\n")
              //   }
              // });
              return message.channel.send(
                "Scrum Updated! :tada:"
              );
             }else {
              newStandup.save();
              return message.channel.send(
                "New Scrum added :tada:"
              );  
            }              
            } else {
              message.channel.send(
                "Ruh Roh! You must be a team member in this server standup to reply to the response!"
              );
            }
      }
    }
  }
