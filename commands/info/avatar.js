
const Discord = require("discord.js")
module.exports = {
  name: "avatar",
  aliases: ["av"],
  permission: [],
  category: "info",
  description: "show users avatar",
  usage: ["$avatar <optional: user>"],
  run: async (client, message, args, config) => {
    
    const user = message.mentions.users.first() || message.author
    
    let embed = new Discord.MessageEmbed()
    .setTitle(user.username + "'s Avatar")
    .setColor("DARK_BUT_NOT_BLACK")
    .setImage(user.displayAvatarURL({size: 4096, dynamic: true}))
    .setURL(user.displayAvatarURL())
    
    message.channel.send({embeds:[embed]})
},
}
