const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("returnid")
        .setDescription("Returns the user ID"),
    async execute(interaction){
        await interaction.reply("Your user ID is: " + interaction.user.id);
    },    
};