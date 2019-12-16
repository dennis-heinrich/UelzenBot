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
        WebHook: "XXXXXXXXX",
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
        Hansestadt_Uelzen: {
            Enabled: true,
            ServiceFeedUrl: "https://www.hansestadt-uelzen.de/contentxxl/services/export/getcontent.aspx?mid=341&mdefid=71&eid=1",
        },
        FF_UE_Einsatzberichte: {
            Enabled: true,
            ServiceFeedUrl: "https://feuerwehr-uelzen.de/einsaetze/feed/",
        }
    }
};
