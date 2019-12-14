module.exports = {
    General: {
        UpdateInterval: 10000,
    },
    Telegram: {
        Enabled: true,
        ChatId: -1001266018619,
        BotToken: "863244396:AAGZdZ3dZmk5-SZJ0TlLO0vdLuYyYt42mfw",
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
