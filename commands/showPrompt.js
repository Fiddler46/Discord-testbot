module.exports = {
  name: "show",
  description: "Shows standup prompt",
  async execute(message, args) {
    message.channel.send(`
Here is the daily standup prompt:
\`\`\`
1. What have you done since yesterday?
2. What are you planning on doing today?
3. Any impediments or stumbling blocks?
\`\`\`Please make sure you have thought about your response **_very carefully_** as standups are more for *the entire team*.
Once you are ready to respond, simply trigger me with \`!reply @channel_id ...\` where \`...\` represents your response. Also make sure to add in tags #f, #e, #b to denote features, enhancements & blockers worked upon respectively :smile:
    `);
  },
};
