const { Random } = require("something-random-on-discord")
const random = require("something-random-on-discord").Random
const discord = require("discord.js")

module.exports = {
  name: "advice",
  aliases: [],
  category: "fun",
  permission: [],
  usage: ["$advice"],
  description: "Get some advice",
  run: async (client, message, args, config) => {
    
    let data = await random.getAdvice()
    data['embed'].color = "DARK_BUT_NOT_BLACK"
    let text = data['embed'].description.toLowerCase()
    let letters = {
      "a": "𝐚",
      "b": "𝐛",
      "c": "𝐜",
      "d": "𝐝",
      "e": "𝐞",
      "f": "𝐟",
      "g": "𝐠",
      "h": "𝐡",
      "i": "𝐢",
      "j": "𝐣",
      "k": "𝐤",
      "l": "𝐥",
      "m": "𝐦",
      "n": "𝐧",
      "o": "𝐨",
      "p": "𝐩",
      "q": "𝐪",
      "r": "𝐫",
      "s": "𝐬",
      "t": "𝐭",
      "u": "𝐮",
      "v": "𝐯",
      "w": "𝐰",
      "x": "𝐱",
      "y": "𝐲",
      "z": "𝐳",
    }
    let list_text = [...text]
    for(let i=0;i<list_text.length;i++){
      if(!["'", "+", " ", "-", ",", "."].includes(list_text[i])) {
        list_text[i] = letters[text[i]]
      } else {
        continue
      }
    }
    
    let embed = new discord.MessageEmbed
    embed.setColor("DARK_BUT_NOT_BLACK")
    embed.setDescription(list_text.join(""))
    message.channel.send({embeds:[embed]})
    
  }
}