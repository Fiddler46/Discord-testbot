const standupModel = require("../models/standup.model");

module.exports = {
  name: "scrums",
  description: "View all standup responses",
  execute(message, args) {
    if (message.channel.type === "text") {
        console.log(message.channel.name, standupModel.find({project: message.channel.name}))
        standupModel
          .find({project: message.channel.name})
          .then((standup) => {
              console.log(typeof(standup))
              message.channel.send('hello');   
              message.channel.send(standup)
          })
          .catch((err) => {
            console.error(err);
            message.channel.send(
              "Oh no :scream:! An error occured somewhere in the matrix!"
            );
          });
      }
} }
