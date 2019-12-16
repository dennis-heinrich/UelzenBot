module.exports = {
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
    },
    Verkehrsmeldungen: {
        Enabled: true,
        ServiceFeedUrl: "https://www.verkehrsinfo.de/httpsmobil/index.php?c=staulist&lat=53&lon=10"
    },
    DWD_Warnwetter: {
        Enabled: true,
        ServiceFeedUrl: "https://www.dwd.de/DWD/warnungen/warnapp/json/warnings.json",
        /**
         * Zur Feststellung der Region-IDs
         * http://www.dwd.de/DE/leistungen/gds/help/warnungen/cap_warncellids_csv.csv?__blob=publicationFile&v=4
         */
        CellWarningIds: [103360000]
    }
};
