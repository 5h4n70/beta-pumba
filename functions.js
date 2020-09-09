const config = require("./config.json");
const Discord = require("discord.js");
const botMasters = "752478986122035200";
const ServerManager = "751386467246407730"
const HeadAdmin = "750687771206746118";
const Admin = "750687771206746117";
const HeadModerator = "750687771206746116";
// const Moderator = "750687771206746115";
const Moderator = "752478986122035200"; //test
const TrialModerator = "750687771206746114";

module.exports = {

    is_botMaster: function (messageMember) {
        var temp = 0;
        messageMember.roles.cache.forEach(f => {
            if (f.id === botMasters) {
                // console.log("botmaster = "+botMasters + "  f.id = "+f.id)
                temp = 5;
            }
        });
        if (temp)
            return true;
        else
            return false;
    },
    check_permissions: function (messageMember) {
        var obj = {
            isServerManager: false,
            isHeadAdmin: false,
            isAdmin: false,
            isHeadModerator: false,
            isModerator: false,
            isTrialModerator: false
        };
        messageMember.roles.cache.forEach(f => {
            // console.log(Moderator + "=" + f.id)
            if (f.id === ServerManager)
                obj.isServerManager = true;
            else if (f.id === HeadAdmin)
                obj.isHeadAdmin = true;
            else if (f.id === Moderator)
                obj.isModerator = true;
            else if (f.id === Admin)
                obj.isAdmin = true;
            else if (f.id === TrialModerator)
                obj.isTrialModerator == true;
            else if (f.id === HeadModerator)
                obj.isHeadModerator = true;
        });

        return obj;
    },
    is_allowed: function (local_prms, member_prms) {
        if (local_prms.onlyServerManager && member_prms.isServerManager)
            return true;
        else if (local_prms.onlyHeadAdmin && member_prms.isHeadAdmin)
            return true;
        else if (local_prms.onlyAdmin && member_prms.isAdmin)
            return true;
        else if (local_prms.onlyHeadModerator && member_prms.isHeadModerator)
            return true;
        else if (local_prms.onlyModerator && member_prms.isModerator)
            return true;
        else if (local_prms.onlyTrialModerator && member_prms.isTrialModerator)
            return true;
        return false;
    },
    dm_received: function (client,msg) {
        const mailbox = "753155044500832318";
        const guildId = "752453068171247656";
        const server = client.guilds.cache.get(guildId);
        const boxChannel=server.channels.cache.get(mailbox);
        if(boxChannel){

            // boxChannel.send(msg.content);
            const embed = new Discord.MessageEmbed()
            .setTitle(`Message From:${msg.author.tag}`)
            .addField('Message',`${msg.content}`)
            .setColor('dfee04')
            .setFooter(`Sender ID: ${msg.author.id}`)
            .setTimestamp();
            
           boxChannel.send(embed);
        }
        else{
            console.log("inbox channel not found");
        }
        // console.log(msg.content);
    }

}