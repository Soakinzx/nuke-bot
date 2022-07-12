const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "unscramble",
  aliases: ["us"],
  permission: [],
  category: "fun",
  usage: ["$unscramble"],
  description: "unscramble the word!",
  run: async (client, message, args) => {
      let words = [
      "Abduction",
      "Mario",
      "Ability",
      "Casual",
      "tourist",
      "amazing",
      "excellent",
      "activity",
      "invite",
      "intresting",
      "unusual",
      "alien",
      "frog",
      "cheetah",
      "bored",
      "boredom",
      "wow",
      "ordinary",
      "batman",
      "superman",
      "awesome",
      "prefix",
      "great",
      "marvel",
      "thanos",
      "spider-man",
      "exquisite",
    ];
    let word = words[parseInt(Math.random() * words.length)];
    let tries = 0;

    const embed4 = new MessageEmbed()
      .setDescription(
        `${message.author} You timed out... The word was \`${word}\`, Respond quicker next time!`
      )
      .setColor("RED");

    let scrambled = word.split("");

    scrambled.sort(() => (Math.random() > 0.5 ? 1 : -1));

    while (scrambled.join("") == word)
      scrambled.sort(() => (Math.random() > 0.5 ? 1 : -1));
    const embed = new MessageEmbed()
      .setDescription(
        `Your word is... \`${scrambled.join("")}\`! Unscramble the given word.`
      )
      .setColor("DARK_BUT_NOT_BLACK");

    message.channel.send({ embeds: [embed] });

    const filter = (msg) => msg.author.id == message.author.id;

    const collector = message.channel.createMessageCollector({
      filter,
      time: 1000 * 60,
    });

    collector.on("collect", async (msg) => {
      if(["stop", "quit", "q"].includes(msg.content.toLowerCase())){
        let embed_ = new MessageEmbed()
        .setDescription(`Game stopped, your word was \`${word}\``)
        message.channel.send({embeds:[embed_]}).then(()=>{
          collector.stop
        })
        
      } else if (msg.content.toLowerCase() == word.toLowerCase()) {
        const embed2 = new MessageEmbed()
          .setDescription(
            `That's correct! Good job!, Took you \`${tries}\` trys`
          )
          .setColor("GREEN");
        message.channel.send({ embeds: [embed2] }).then(() => {
          collector.stop();
        });
      } else {
        tries++;
        const embed3 = new MessageEmbed()
          .setDescription(`That's incorrect. Try again :/`)
          .setColor("RED");
        message.channel.send({ embeds: [embed3] });
      }
    });

    collector.on("end", async (collected) => {
      if (collected.size == 0) message.channel.send({ embeds: [embed4] });
    });
},
}
