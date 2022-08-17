# Standup Bot 🤖
> Discord bot for Scrum daily standups

## How-To:

#### *Disclaimer:* 

This bot is meant to help with your daily standups & keep a track of tasks accomplished. The bot could be triggered using commands which can be used to update the bot with the scrum(s) for that particular day. The scrums of every team member are stored in a database.

### Initial Setup [required only to run the server]

[Click Here](https://discord.com/oauth2/authorize?client_id=BOTS_CLIENT_ID&scope=bot&permissions=355408) to add the bot to the discord server. 
> Note that the above requires you to have the **Manage Server** permission in this server  


### Commands
> The prefix for this bot is `!`

| Name    | Description                                        | Usage                                   | Server or DM |                                             |
| ------- | -------------------------------------------------- | --------------------------------------- | ------------ | ------------------------------------------- |
| `help`  | *Shows all commands*                               | `!help [optional command name]`         | **_both_**   |                                             |
| `list`  | *List of all members participating in the standup* | `!list`                                 | Server       |                                             |
| `am`    | *Adds a new member to the standup*                 | `!am @<user> @<optional_user> ...`      | Server       |                                             |
| `rm`    | *Removes a member from the standup*                | `!rm @<user> @<optional_user> ...`      | Server       |                                             |
| `reset` | *Resets the standup*                               | `!reset`                                | Server       | Use with caution, resets everything         |
| `show`  | *Shows standup prompt*                             | `!show`                                 | **_both_**   |                                             |
| `reply` | *Reply to standup prompt*                          | `!reply @<optional_serverId> [message]` | DM           | `optional_server_id`: for multiple standups |
| `view`  | *View your standup response*                       | `!view @<optional_serverId>`            | DM           | `optional_server_id`: for multiple standups |


### Usage
> Standup time is set to `10:30:00 PM EST` every weekday

Anytime before the standup time, added members must trigger the bot with the `reply` followed by their message in the projects channel. The bot will then upload this response to the database.    


After the message has been posted, the bot will delete all member responses, thus members will have to DM for the next standup.

#### Backend made with

- `Discord.js` and `node-schedule` for cron jobs
- `MongoDB` with `mongoose`
- :heart:


### Screenshots 📸
<br />

<h5 align="center">
  <img src="screenshots/sscrum-bot-1.png" />
</h5>
<h5 align="center"> 

 *Bot commands list*  

</h5>
<br />

<h5 align="center">
  <img src="screenshots/sscrum-bot-2.png" />
</h5>
<h5 align="center"> 

 *Private messaging bot with commands (1920x1080)*  

</h5>
<br />

<h5 align="center">
  <img src="screenshots/sscrum-bot-3.png" />
</h5>
<h5 align="center"> 

 *Daily standup message example with hooligans (1920x1080)*  

</h5>
