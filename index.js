"use strict"; 

const express = require("express");
const ISODate = require("isodate");
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const { Client, MessageEmbed, Collection } = require("discord.js");
const schedule = require("node-schedule");
const serverModel = require("./models/servers.model");
const {connectToDB, getDB} = require('./server/db/connection')
const PREFIX = "!";

const standupIntroMessage = new MessageEmbed()
  .setColor("#ff9900")
  .setTitle("Daily Standup")
  .addFields(
    {
      name: "Introduction",
      value: `Hi! I'm Nighthack's Scrumbot. I will be facilitating your daily standups from now on.\nTo view all available commands, try \`${PREFIX}help\`.`,
    }
  )
  .setTimestamp();

const dailyStandupSummary = new MessageEmbed()
  .setColor("#ff9900")
  .setTitle("Daily Standup")
  .setTimestamp();

// lists .js files in commands dir
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// init bot client with a collection of commands
const bot = new Client();
bot.commands = new Collection();

// Imports the command file + adds the command to the bot commands collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}
//console.log(bot.commands) ==> For checking list of commands on console

// mongodb setup with mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((e) => console.error(e));

mongoose.connection.once("open", () => console.log("mongoDB connected"));

bot.once("ready", () => console.log("Discord Bot Ready"));

// when a user enters a command
bot.on("message", async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!bot.commands.has(commandName)) return;

  if (message.mentions.users.has(bot.user.id))
    return message.channel.send(":robot:");

  const command = bot.commands.get(commandName);

  if (command.guildOnly && message.channel.type === "dm") {
    return message.channel.send("Hmm, that command cannot be used in a dm!");
  }

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send(`Error 8008135: Something went wrong!`);
  }
});

const app = express();

connectToDB((err)=>{
  if(!err){
    app.listen(8000, () => {
      console.log("Listening on PORT 8000..") ; 
    })
    db = getDB();
  }
})

let db ;

//Weekly Routes
app.get('/weeklyreports', (req, res) => {
  let reports = []
  db.collection('standups')
    .find({reportTime:{$gte:ISODate("2021-01-01"),$lt:ISODate("2022-09-02")}}) // returns cursor 
    .forEach(report => {
      reports.push(report)
    })
    .then(() => {
      res.status(200).json(reports)
    })
    .catch(() => {
      res.status(500).json({"Error": "Could not fetch standups"})
    })
})

/**
 * Cron Job: 10:00:00 AM EST - Go through each standup and output the responses to the channel
 */
let cron = schedule.scheduleJob(
  { hour: 19, minute: 45, dayOfWeek: new schedule.Range(1, 5) },
  (time) => {
    console.log(`[${time}] - CRON JOB START`);
    projectModel
      .find()
      .then((standups) => {
        standups.forEach((standup) => {
          let memberResponses = [];
          let missingMembers = [];
          standup.members.forEach((id) => {
            if (standup.responses.has(id)) {
              memberResponses.push({
                name: `-`,
                value: `<@${id}>\n${standup.responses.get(id)}`,
              });
              standup.responses.delete(id);
            } else {
              missingMembers.push(id);
            }
          });
          //Check to see which members did not post out scrums yet
          let missingString = "Hooligans: ";
          if (!missingMembers.length) missingString += ":man_shrugging:";
          else missingMembers.forEach((id) => (missingString += `<@${id}> `));
          bot.channels.cache
            .get(standup.projectId)
            .send(
              new MessageEmbed(dailyStandupSummary)
                .setDescription(missingString)
                .addFields(memberResponses)
            );
          standup
            .save()
            .then(() =>
              console.log(`[${new Date()}] - ${standup._id} RESPONSES CLEARED`)
            )
            .catch((err) => console.error(err));
        });
      })
      .catch((err) => console.error(err));
  }
);

bot.login(process.env.DISCORD_TOKEN);
