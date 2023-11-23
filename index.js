//import classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

//create new client
//NB: guilds is what discord refers to as servers
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

//when the client is ready run this code once
//use c for the event parameter to keep it seperate from the defined "client"

client.once(Events.ClientReady, c => {
    console.log('Ready! Logged in as ' + c.user.tag);
});

//log in to discord with your client's token
client.login(process.env.TOKEN);