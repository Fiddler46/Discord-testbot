/* ============ BLOCKER =========== */
/*
DiscordAPIError: Invalid Form Body
content: Must be 2000 or fewer in length.
    at RequestHandler.execute (/Users/driganka/Documents/NightHack/Scrum Bot/navn-r/standup-bot/node_modules/discord.js/src/rest/RequestHandler.js:170:25)
    at processTicksAndRejections (node:internal/process/task_queues:96:5) {
  method: 'post',
  path: '/channels/998516166559543337/messages',
  code: 50035,
  httpStatus: 400
}
*/ 


const standupModel = require("../models/standup.model");

module.exports = {
  name: "scrums",
  description: "View all standup responses",
  async execute(message, args) {
    if (message.channel.type === "text") {
        // console.log(message.channel.name, standupModel.find({project: message.channel.name}))
        standup = await standupModel.find({project: message.channel.name});
        // standupModel
        //   .find({project: message.channel.name})
        //   .then((standup) => {
        //       console.log(typeof(standup))
        //       message.channel.send('hello');   
        //       message.channel.send(standup)
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     message.channel.send(
        //       "Oh no :scream:! An error occured somewhere in the matrix!"
        //     );
        //   });
        if (message.channel.type === "text") {
          if(standup) {
            message.channel.send(
              "Whatever\n" + standup
            );
            console.log(standup, typeof(standup))
          }
          else {
            message.channel.send(
                      "Oh no :scream:! An error occured somewhere in the matrix!"
            );
          }
          
        }
         
      }
} }


  
