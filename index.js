const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("Don\'t hack me pls"));

app.listen(port, () => console.log(`Bot listening at http://localhost:${port}`));

// ================= START BOT CODE ===================





const {
  Client,
  Collection
} = require("discord.js")

const fs = require("fs")
const client = new Client({
  disableEveryone: "true" // This makes sure that the bot does not mention everyone
});
require('dotenv').config();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/")
const config = require("./config.json"); // enter your bot prefix in the config.json file
const {
  settings
} = require("cluster");
const {
  eventNames
} = require("process");

var fromDBLbot = new Set();
var fromProofChannel = new Set();

const prefix = config.prefix;
const myFunctions = require('./functions.js');
const monitor_channel = ["750687772813033541"];

['command'].forEach(handler => {
  require(`./handler/${handler}`)(client);
})



client.on("ready", async () => {
  console.log(`${client.user.tag} is online`);
  client.user.setActivity('PUMBA\'s New Video!', {
    type: 'WATCHING',
    url: "https://discord.gg/asdfa"
  }).catch(console.error);
});



client.on("message", async message => {


  if (message.content == "test!" && message.author.id == "521330948382654487") {
    message.delete();
    message.author.send("set of DBL BOT:" + [...fromDBLbot]);
    message.author.send("set of DBL BOT:" + [...fromProofChannel]);
  }

  /*
    Server UpVotes thingy goes here
  */
  if (message.channel.id == "756165504556859484" && !message.author.bot) { //DBLbot channel

    const vid = myFunctions.get_voter_id(message.embeds[0].description);
    const pd = myFunctions.getServerMemberByID(client, '750687770904887659', vid);
    if (pd) {
      fromDBLbot.add(pd.id);
    }
  } else if (message.channel.id == "756198759855292576" && !message.author.bot) { //proof channel
    if (message.attachments.size > 0) {
      message.react('756222468401791057');
      fromProofChannel.add(message.author.id);
    }

  }

  //
  if (fromDBLbot.size && fromProofChannel.size) {
    let Tem_set_value;
    for (let i of fromDBLbot) {
      if (fromProofChannel.has(i)) {
        fromDBLbot.delete(i);
        fromProofChannel.delete(i);
        const server_here = client.guilds.cache.get('750687770904887659');
        const proofChannel = server_here.channels.cache.get(mailbox);
        proofChannel.send(`<@${i}, Thanks for voting! Remember, the more you vote, the higher chance you win! You can vote every **12** hours! 😍`)
        break;
      }
    }
  }








  if (message.channel.type == "dm" && !message.author.bot) {
    if (message.content.startsWith(config.prefix))
      return;
    else {
      myFunctions.dm_received(client, message);
    }
  }
  monitor_channel.forEach(item => {
    if (item == message.channel.id)
      channel_monitor(message);

  });


  client.prefix = prefix;
  if (message.author.bot) return; // This line makes sure that the bot does not respond to other bots
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return; // This line makes sure that the bot does not respond to other messages with the bots prefix
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command)
    command.run(client, message, args, cmd);
});

function channel_monitor(message) {
  if (message.channel.id == "750687772813033541") {
    const args = message.content.split(/ +/g);
    var fl = [];
    args.forEach(function (item) {
      if (item.length)
        fl.push(item)
    });
    if (fl.length > 1) {
      var p = setInterval(function () {
        message.delete();
        clearInterval(p);
      }, 3000);

    }
  }
}

client.login(process.env.token) //Enter your bot token here