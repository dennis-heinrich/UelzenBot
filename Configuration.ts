module.exports = {
    General: {
        UpdateInterval: 10000,
    },
    Telegram: {
        Enabled: true,
        ChatId: -0,
        BotToken: "",
    },
    Discord: {
        Enabled: false,
        WebHook: "",
    },
    Services: require("./Services")
};
