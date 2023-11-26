const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Gives more information about user with more fancy"),
    async execute(interaction){
        embedData.setTitle(interaction.user.username);
        embedData.setThumbnail(interaction.user.avatarURL("yes"));
        await interaction.reply({embeds: [embedData]});
    },    
};

const embedData = new EmbedBuilder()
    .setColor(0x00ffff)
    .setDescription("Lorem ipsum deez nuts");