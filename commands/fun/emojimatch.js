const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require("discord.js");

module.exports = {
    name: "emojimatch",
    aliases: ["eg", "emojiguess", "em"],
    category: "fun",
    permission: [],
    usage: ["$emojiguess <easy/hard>", "$emojiguess easy", "$emojiguess hard"],
    description: "guess the emoji",
    run: async (client, message, args, config) => {
        const mode = args[0]
        if (mode === "easy") {
            const eArray = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"];
            const randEmoji = eArray[Math.floor(Math.random() * eArray.length)];
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("😆")
                .setEmoji("😆")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😅")
                .setEmoji("😅")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😂")
                .setEmoji("😂")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("🤣")
                .setEmoji("🤣")
                .setStyle("SUCCESS")
            );
            const row2 = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("😀")
                .setEmoji("😀")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😃")
                .setEmoji("😃")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😄")
                .setEmoji("😄")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😁")
                .setEmoji("😁")
                .setStyle("SUCCESS")
            );

            message.channel.send({
                content: "Can you guess the emoji?",
                components: [row, row2]
            }).catch({});
            const response = [
                "I guess you cant do it",
                "Maybe next time",
                "Try again smh",
                "I thought you could do it?",
            ];
            const responses = response[Math.floor(Math.random() * response.length)];
            const filter = (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                else return interaction
                    .reply({
                        content: "You cannot use this button",
                        ephemeral: true
                    })
                    .catch({});
            };
            const collector = message.channel.createMessageComponentCollector({
                filter,
                max: 1,
            });
            collector.on("end", async (ButtonInteraction) => {
                const id = ButtonInteraction.first().customId;

                if (id !== randEmoji) {
                    let embed = new MessageEmbed()
                        .setTitle(" ")
                        .setDescription(`**${responses}**`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    ButtonInteraction.first()
                        .update({
                            content: " ",
                            embeds: [embed],
                            components: [],
                        })
                        .catch({});
                } else {
                    let embed = new MessageEmbed()
                        .setTitle(" ")
                        .setDescription(`**Good Job!**`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    ButtonInteraction.first()
                        .update({
                            content: " ",
                            embeds: [embed],
                            components: [],
                        })
                        .catch({});
                }

            });
        } else if (mode === "hard") {
            const hArray = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪"];
            const randEmoji = hArray[Math.floor(Math.random() * hArray.length)];
          //console.log(randEmoji)
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("😆")
                .setEmoji("😆")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😅")
                .setEmoji("😅")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😂")
                .setEmoji("😂")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("🤣")
                .setEmoji("🤣")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😊")
                .setEmoji("😊")
                .setStyle("SUCCESS")
            );
            const row2 = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("😀")
                .setEmoji("😀")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😃")
                .setEmoji("😃")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😄")
                .setEmoji("😄")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😁")
                .setEmoji("😁")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😇")
                .setEmoji("😇")
                .setStyle("SUCCESS")
            );
            const row3 = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("🙂")
                .setEmoji("🙂")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("🙃")
                .setEmoji("🙃")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😉")
                .setEmoji("😉")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😌")
                .setEmoji("😌")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😍")
                .setEmoji("😍")
                .setStyle("SUCCESS")
            );
            const row4 = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("🥰")
                .setEmoji("🥰")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😘")
                .setEmoji("😘")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😗")
                .setEmoji("😗")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😙")
                .setEmoji("😙")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😚")
                .setEmoji("😚")
                .setStyle("SUCCESS")
            );
            const row5 = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("😋")
                .setEmoji("😋")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😛")
                .setEmoji("😛")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😝")
                .setEmoji("😝")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("😜")
                .setEmoji("😜")
                .setStyle("SUCCESS"),
                new MessageButton()
                .setCustomId("🤪")
                .setEmoji("🤪")
                .setStyle("SUCCESS")
            );

            message.channel.send({
                content: "Can you guess the emoji?",
                components: [row, row2, row3, row4, row5]
            }).catch({});
            const response = [
                "I guess you cant do it",
                "Maybe next time",
                "Try again smh",
                "bad guesser lol",
            ];
            const responses = response[Math.floor(Math.random() * response.length)];
            const filter = (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                return interaction
                    .reply({
                        content: "You cannot use this button",
                        ephemeral: true
                    })
                    .catch({});
            };
            const collector = message.channel.createMessageComponentCollector({
                filter,
                max: 1,
            });
            collector.on("end", async (ButtonInteraction) => {
                const id = ButtonInteraction.first().customId;

                if (id !== randEmoji) {
                    let embed = new MessageEmbed()
                        .setTitle(" ")
                        .setDescription(`**${responses}**`)
                        .setColor("DARK_BUT_NOT_BLACK")
                    ButtonInteraction.first()
                        .update({
                            content: " ",
                            embeds: [embed],
                            components: [],
                        })
                        .catch({});

                } else {
                    let embed = new MessageEmbed()
                        .setTitle(" ")
                        .setDescription("**Good Job!**")
                        .setColor("DARK_BUT_NOT_BLACK")
                    ButtonInteraction.first()
                        .update({
                            content: " ",
                            embeds: [embed],
                            components: [],
                        })
                        .catch({});

                }
            });
        } else {
            let embed = new MessageEmbed()
                .setTitle(" ")
                .setDescription("**Please choose easy or hard\nEx: <prefix>emojiguess <easy/hard>**")
                .setColor("DARK_BUT_NOT_BLACK")
            message.channel.send({
                embeds: [embed]
            }).catch({});
        }

    },
}