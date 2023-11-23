import { Client, Events, GatewayIntentBits } from "discord.js";
import {config} from "dotenv";
import * as test from "./commands/test.js";

config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

function readyDiscord(){
    console.log("deez nuts " + client.user.tag);
}

async function handleInteraction(interaction){
    if(!interaction.isCommand()) return;
    if(interaction.commandName === "test"){
        await test.execute(interaction);
    }
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);