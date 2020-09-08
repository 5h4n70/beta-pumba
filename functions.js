const config = require("./config.json");
const Discord = require("discord.js");
const botMasters = "752478986122035200";
const ServerManager = "751386467246407730"
const HeadAdmin = "750687771206746118";
const Admin = "750687771206746117";
const HeadModerator = "750687771206746116";
// const Moderator = "750687771206746115";
const Moderator = "752478986122035200";//test
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
          console.log(Moderator+"="+f.id)
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
    }

}