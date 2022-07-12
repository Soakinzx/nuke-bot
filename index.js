require('http').createServer((req, res) => res.end('Nuke Bot is alive!')).listen(3000)




const Discord = require("discord.js")
const client = new Discord.Client({
    intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "USER", "REACTION"]
});
const config = require("./json/config")
const fs = require("fs");

client.commands = new Discord.Collection();
module.exports = client





client.once("ready", async () => {
    console.log("Nuke bot ready") 
})

const eventFiles = fs
  .readdirSync("./Events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./Events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});


client.login(config.token)