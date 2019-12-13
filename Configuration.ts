let Configuration = {
    General: {
        UpdateInterval: 2000,
    },
    Telegram: {
        BotToken: "1012885395:AAGb798lkuGY5hfPXkH0LMxZDa-DxGzNryE",
    },
    Discord: {
        WebHook: "https://discordapp.com/api/webhooks/654893162157965352/k7n-BMCwBbn1dnQuWOtOvbyU7Z6sFVNNCrE68kKKCvnQQbK-Q-zDAmEpvVim3K2wGAWJ",
    },
    Services: {
        AZ_Online: {
            Enabled: true,
            ServiceFeedUrl: "https://www.az-online.de/uelzen/rssfeed.rdf",
        },
        Einsatzberichte: {
            Enabled: true,
            ServiceFeedUrl: "https://feuerwehr-uelzen.de/einsaetze/feed/",
        }
    }
};

module.exports = Configuration;
