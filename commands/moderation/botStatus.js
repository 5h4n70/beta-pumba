const { MessageEmbed, Client } = require("discord.js");
const config = require("../../config.json")

module.exports = {
    name: "play",
    category: "moderation",
    aliases: ["watch"],
    description: "set bot status",
    usage: "set bot status",
    headAdminOnly:"true",
    adminOnly:"true",
    modOnly:"true",

    run: async (client, message, args, cmd) => {
        
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