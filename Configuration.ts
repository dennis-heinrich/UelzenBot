module.exports = {
    General: {
        UpdateInterval: 10000,
    },
    Telegram: {
        Enabled: true,
        ChatId: -100000000,
        BotToken: "",
    },
    Discord: {
        Enabled: false,
        WebHook: "",
    },
    Services: {
        AZ_Online: {
            Enabled: true,
            ServiceFeedUrl: "https://www.az-online.de/uelzen/rssfeed.rdf",
        },
        UelzenTV: {
            Enabled: true,
            ServiceFeedUrl: "https://www.uelzen-tv.com/nachrichten-aktuelles-uelzen?format=feed&type=rss",
        },
        FF_UE_Einsatzberichte: {
            Enabled: true,
            ServiceFeedUrl: "https://feuerwehr-uelzen.de/einsaetze/feed/",
        }
    }
};
