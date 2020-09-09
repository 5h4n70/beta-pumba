const redis = require("../../redis.js")
const {
    MessageEmbed,
    Client
} = require("discord.js");
const myFunctions = require('../../functions.js');
const {
    is_allowed
} = require("../../functions.js");
const guildId = "752453068171247656";
const muteRoleId = "753101233702699029";

module.exports = {
    name: "mute",
    category: "moderation",
    aliases: ["stop", "unmute"],
    run: async function (client, message, args, cmd) {
        var local_prm = {
            onlyServerManager: true,
            onlyHeadAdmin: true,
            onlyAdmin: false,
            onlyHeadModerator: false,
            onlyModerator: true,
            onlyTrialModerator: false
        };
        const redisKeyPrefix = 'muted-';

        var go = is_allowed(local_prm, myFunctions.check_permissions(message.member));
        if (go) {
            message.delete();
            var muteValue, mutyType = "",
                totalMuteTime = -1;
            var txt = "";
            muteValue = Number(args[args.length - 1]);

            if (muteValue > 0) {
                totalMuteTime = muteValue * 3600;
            }
            //
            // console.log(args.length)

            var targeted_users = message.mentions.members;
            const server = client.guilds.cache.get(guildId);
            const muteRole = server.roles.cache.find((role) => role.id === muteRoleId);
            if (!targeted_users)
                message.reply("Mention atleast One member!");
            else if (!muteRole)
                message.reply("Mute Role not found!");
            else if (targeted_users && muteRole) {
                var ml = [];
                targeted_users.forEach(element => {
                    if (cmd == "mute" || cmd == "stop") {
                        element.roles.add(muteRole)
                    } else if (cmd == "unmute") {

                        element.roles.remove(muteRole);
                    }
                    ml.push(element.user.tag);
                });

                if (ml.length == 1)
                    txt = "was";
                // message.channel.send(ml[0] + "  " + cmd + "d!");
                else
                    txt = "were";
                // message.channel.send( + "  " + cmd + "d!");
                const embed = new MessageEmbed()
                    .setTitle(`Mute log : command used by ${message.author.tag}`)
                    .setDescription(`${ml.join(" , ")} ${txt} ${cmd}d!`)
                    .setColor('f30e0e')
                    .setTimestamp();

                message.channel.send(embed);
                if (totalMuteTime) {
                    var p = setInterval(function () {
                        targeted_users.forEach(element => {
                            element.roles.remove(muteRole);
                            message.channel.send(`${ml.join(" , ")} ${txt} unmuted now!`);
                        });
                        clearInterval(p);
                    }, totalMuteTime * 1000);
                }
            }

        } else {
            message.react("❌");
        }

        // const embed = new MessageEmbed()
        //     .setTitle(`From /r/${random}`)
        //     .setDescription()


        // message.channel.send("user has been muted")
    }
}