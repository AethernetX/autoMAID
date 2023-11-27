const {Events} = require("discord.js");
const schedule = require("node-schedule");

module.exports = {
    name: Events.ClientReady,
    once:true,
    async execute(client){
        await schedule.scheduleJob('37 * * * *', function(){
            console.log("iubuibwiubw");
        });
    },
};

