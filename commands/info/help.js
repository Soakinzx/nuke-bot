const Discord = require("discord.js")
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require("discord.js");


module.exports = {
  name: "help",
  category: "info",
  aliases: ["h"],
  permission: [],
  usage: ["$help"],
  description: "get some help...with commands",
  run: async (client, message, args, config) => {
    const directories = [...new Set(client.commands.map(cmd => cmd.category))]
    const formateStr = (str) => `${str[0].toUpperCase()}${str.substr(1)}`

    const categories = directories.map(dir => {
      const getCmds = client.commands.filter(cmd => cmd.category == dir && cmd.name !== "nuke").map(cmd => {
        return {
          name: cmd.name || "No name",
          description: cmd.description || "No description",
          
          
        }
      })
      return {
        directory: formateStr(dir),
        commands: getCmds
      }
    })
    
       const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("list of command options")
        .addOptions(
          categories.map(cmd => {
            return {
              label: cmd.directory + `(${cmd.commands.length})`,
              value: cmd.directory.toLowerCase(),
              description: `displays ${cmd.directory.toLowerCase()} commands`
            }
          })
        )
    );
    let embed = new MessageEmbed()
      .setTitle("Category select menu options")
      .setColor("DARK_BUT_NOT_BLACK")
      .setDescription(
        "Choose a category option to see the commands in each category"
      );

    const sendmsg = await message.channel.send({
      embeds: [embed],
      components: [row],
    });
    let prefix = config.prefix
    
 try {
      const filter = (interaction) =>{ return interaction.user.id === message.author.id}
    const collector = await message.channel.createMessageComponentCollector({
      filter,
      componentType: "SELECT_MENU",
      time: 60000*5,
    });

    collector.on("collect", async (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(x => x.directory.toLowerCase() == directory)
      const category_embed = new MessageEmbed()
      .setTitle(`${directory.toUpperCase()} COMMANDS`)
      .setColor("DARK_BUT_NOT_BLACK")
      .addFields(
        category.commands.map(cmd => {
          
          return {
            name: `__${cmd.name}__`,
            value: `**${prefix+cmd.name}:** ${cmd.description}`,
            inline: false
        }
        }
        )
      )
      
      interaction.update({embeds: [category_embed]})
      
      
    });
    collector.on("end", async () => {
      return
    });
 } catch {}
  },
};

