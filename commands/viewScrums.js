const standupModel = require("../models/standup.model");

module.exports = {
  name: "scrums",
  description: "View all standup responses",
  execute(message, args) {
    console.log("yo");
    if (message.channel.type === "text") {
        console.log(message.channel.name, typeof(message.channel.name))
        standupModel
          .find({'project': message.channel.name})
          .then((standup) => {
              message.channel.send(
                console.log(standup)
              );   
          })
          .catch((err) => {
            console.error(err);
            message.channel.send(
              "Oh no :scream:! An error occured somewhere in the matrix!"
            );
          });
      }
} }
