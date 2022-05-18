const Discord = require('discord.js');

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ]
});
const fs = require("fs");
const prefix = 'g?';
client.commands = new Discord.Collection
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for(file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./commands/${commandName}`)
  client.commands.set(commandName, command)
}

config = process.env;
client.on('ready', () => {
  console.log(`Ready! Logged in as GbabsUtilities`);
})
client.on("messageCreate", message => {
  if(message.content.startsWith(prefix)) {
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if(!command) return message.channel.send({content: "That command doesnt exist"})
    command.run(client, message, args)
  }
})
client.login(config.token);
