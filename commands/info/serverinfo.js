const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
  name: "serverinfo",
  aliases: ["si", "server"],
  category: "info",
  permission: [],
  usage: ["$serverinfo"],
  description: "fetches info about the server",
  run:async (client, message, args, config) => {
    const mct = message.guild.memberCount;
    const name = message.guild.name;
    let ServerLogo = message.guild.iconURL();
    const member = message.guild.members.cache.get(message.guild.id);
    let arr = [];
     let emoji;
    if(message.guild.emojis.cache.size >= 1) {
    message.guild.emojis.cache.map((e) => {
      arr.push(e.toString());
    })
    if (arr.join(" ").length > 1024) {
      emoji = "||Too many emojis to display||";
    } else {
      emoji = arr.join("ㅤ");
    }
  } else {
    emoji = "ㅤ";
  }
     let arr2 = [];
    message.guild.roles.cache.map((r) => {
      arr2.push(r.toString());
    });
    let roles;
    if (arr2.join(" ").length > 1024) {
      roles = "||Too many roles to display||";
    } else {
      roles = arr2.join(" ");
    }
    if(ServerLogo === null) {
      ServerLogo =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUx6eob1dJoeLmmCNqWjNw-khBZSmGWa5MFg&usqp=CAU";
    }

    const embed = new MessageEmbed()
      .setTitle("Server info")
      .setColor("DARK_BUT_NOT_BLACK")
      .setImage(ServerLogo)
      .addFields(
        {
          name: "Guild",
          value: `__${name}__\n\n🌐*Server created on* - ${message.guild.createdAt.toLocaleDateString()}\n\n#️⃣*Channels count* - ${
            message.guild.channels.cache.size
          }\n\n👥*Total member count* - ${mct}\n\n👤*User count* - ${
            message.guild.members.cache.filter((m) => !m.user.bot).size
          }\n\n🤖*Bot count* - ${
            message.guild.members.cache.filter((m) => m.user.bot).size
          }`,
        },
        {
          name: `Roles(${message.guild.roles.cache.size - 1})`,
          value: `${roles}`,
        },
        {
          name: `Emojis(${message.guild.emojis.cache.size})`,
          value: `${emoji}`,
        },
        { name: "\u200B", value: `[Click me!](${ServerLogo})` }
      )
      .setFooter(`${message.guild.id}`, ServerLogo)
      .setTimestamp(Date.now());
    message.channel.send({ embeds: [embed] });
},
}




