const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("Don\'t hack me pls"));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================





const { Client,Collection } = require("discord.js")

const fs = require("fs")
const client = new Client ({ 
    disableEveryone:"true" // This makes sure that the bot does not mention everyone
});
require('dotenv').config();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/")
const config = require("./config.json"); // enter your bot prefix in the config.json file
const { settings } = require("cluster");
const { eventNames } = require("process");
const prefix = config.prefix;
const myFunctions= require('./functions.js');

['command'].forEach(handler=>{
    require(`./handler/${handler}`)(client);
})



client.on("ready", async () => {
  console.log(`${client.user.tag} is online`);
  client.user.setActivity('a game with Boka',{type:'PLAYING' ,url:"https://discord.gg/asdfa" }).catch(console.error);
});
  


client.on("message",async message =>{
  
    if(message.channel.type=="dm" && !message.author.bot  ) {
        if(message.content.startsWith(config.prefix))
          return ;
        else{
             myFunctions.dm_received(client,message);
        }
    }
    

    client.prefix = prefix;
    if(message.author.bot) return; // This line makes sure that the bot does not respond to other bots
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return; // This line makes sure that the bot does not respond to other messages with the bots prefix
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length ===0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command)
    command.run(client,message,args,cmd);
})

client.login(process.env.token)//Enter your bot token here
