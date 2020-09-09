const { MessageEmbed, Client } = require("discord.js");
const config = require("../../config.json")
const myFunctions = require('../../functions.js');
const { is_allowed } = require("../../functions.js");



module.exports = {
    name: "dm",
    category: "moderation",
    aliases: ["private"],
    description: "set bot status",
    usage: `${config.prefix}play with me \n ${config.prefix}watch pumba's Video`,

    run: async (client, message, args, cmd) => {
        var local_prm = {
            onlyServerManager: true,
            onlyHeadAdmin: true,
            onlyAdmin: false,
            onlyHeadModerator: false,
            onlyModerator: true,
            onlyTrialModerator: false
        }

        var go = is_allowed(local_prm, myFunctions.check_permissions(message.member));
        if (go) {
            args.shift();
            var d = args.join(" ");
            const fm=message.mentions.members.first();
            if(!fm)
              fm = message.author;
            if(cmd=="dm" || cmd=="private" ){
                if(d.length)
                  fm.send(d);
                else
                  message.reply(`make sure your typed the command correctly: ${config.prefix}dm @user your_text`);
            }
            message.react('✅').catch(console.error);
        }
        else{
            message.react('❌').catch(console.error);
        }
    }
}