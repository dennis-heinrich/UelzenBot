module.exports = {
    General: {
        UpdateInterval: 10000,
    },
    Telegram: {
        Enabled: true,
        ChatId: -1001266018619,
        BotToken: "1012885395:AAGb798lkuGY5hfPXkH0LMxZDa-DxGzNryE",
    },
    Discord: {
        Enabled: false,
        WebHook: "XXXXXXXXX",
    },
    Services: {
        AZ_Online: {
            Enabled: false,
            ServiceFeedUrl: "https://www.az-online.de/uelzen/rssfeed.rdf",
        },
        UelzenTV: {
            Enabled: false,
            ServiceFeedUrl: "https://www.uelzen-tv.com/nachrichten-aktuelles-uelzen?format=feed&type=rss",
        },
        Hansestadt_Uelzen: {
            Enabled: false,
            ServiceFeedUrl: "https://www.hansestadt-uelzen.de/contentxxl/services/export/getcontent.aspx?mid=341&mdefid=71&eid=1",
        },
        FF_UE_Einsatzberichte: {
            Enabled: false,
            ServiceFeedUrl: "https://feuerwehr-uelzen.de/einsaetze/feed/",
        },
        Verkehrsmeldungen: {
            Enabled: true,
            ServiceFeedUrl: "https://www.verkehrsinfo.de/httpsmobil/index.php?c=staulist&lat=53&lon=10"
        }
    }
};
