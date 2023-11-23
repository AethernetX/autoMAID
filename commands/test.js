import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder();
data.setName("test");
data.setDescription("this is a test");

export async function execute(interaction){
    await interaction.reply("hello");
}