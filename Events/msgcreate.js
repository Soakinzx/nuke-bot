const client = require("../index.js");
const fs = require("fs");
const Discord = require("discord.js")
const {
    Client,
    Intents,
    MessageEmbed,
    Collection,
    MessageButton,
    MessageActionRow,
    ButtonInteraction,
    MessageAttachment,
} = require("discord.js");
const config = require("../json/config.json")
const prefix = config.prefix
const categories = fs.readdirSync("./commands/");

for (const category of categories) {
    const commandFiles = fs
        .readdirSync(`./commands/${category}`)
        .filter((File) => File.endsWith(".js"));
    //We now enter every sub-folder one by one and filter the files to include .js only, readdirSync() returns an array including the items/files in that directory

    //We create an intended for loop (notice how the for loops are inside eachother)
    for (const file of commandFiles) {
        const command = require(`../commands/${category}/${file}`);
        //We grab that command-file and it's values, and we push it into the commands collection
        
        if(command.name){
          client.commands.set(command.name, command);
        }
    }
}
module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g)
            const commandName = args.shift()
            const command = client.commands.get(commandName) ||
              client.commands.find((cmd) => cmd.aliases &&
                cmd.aliases.includes(commandName))
            if (!command) return message.channel.send({
                content: "That command doesnt exist"
            })
            command.run(client, message, args, config)
        } 
    },
}