const { MessageEmbed, Client } = require("discord.js");
const config = require("../../config.json")
const myFunctions= require('../../functions.js');

module.exports = {
    name: "say",
    category: "chat",
    aliases: ["csay"],
    description: "",
    usage: "To send messages by the bot",
    headAdminOnly:"true",
    adminOnly:"true",
    modOnly:"true",
    thanos:"true",
  
    run: async function (client, message, args, cmd)  {
      var local_prm={
        
      }
        var go=false;
        var prms = myFunctions.check_permissions(message.member);
        if(this.modOnly && ( prms.isModerator || prms.isTrialModerator) ){
                  go=true;
        }

        message.delete();
        if (cmd == "say") {
            message.channel.send(args.join(" "));
        }
        else if (cmd == "csay") {
            var tp = args[0].slice(2, -1);
            var tp1 = message.guild.channels.cache.find(ch => ch.id === tp);
            if (!tp1)
                message.reply(`Where to send ? \n **usage:**${config.prefix}${cmd} #channel_name Your_message`);
            else
                tp1.send(args.slice(1).join(" "));
        }
    }
}