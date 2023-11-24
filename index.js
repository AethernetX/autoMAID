//import classes
import * as fs from "fs";
import * as path from "path";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

//create new client
//NB: guilds is what discord refers to as servers
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();

//console.log(__dirname);

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//when the client is ready run this code once
//use c for the event parameter to keep it seperate from the defined "client"

client.once(Events.ClientReady, c => {
    console.log('Ready! Logged in as ' + c.user.tag);
});

//log in to discord with your client's token
client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    
    if(!command){
        console.error("No command matching" + interaction.commandName + "was found.");
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({content: "There was an error whilst executing this command!", ephemeral: true});
        } else {
            await interaction.reply({content: "There was an error while exectuting this command!", ephemeral: true});
        }
    }
})