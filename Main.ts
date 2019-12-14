import {AZ_Online} from "./Services/AZ-Online/AZ-Online";
import {IService} from "./Interfaces/IService";
import {Einsatzberichte} from "./Services/Feuerwehr-Uelzen/Einsatzberichte";
import {UelzenTV} from "./Services/Uelzen-TV/UelzenTV";

// Require constants
const Configuration = require("./Configuration");
const Moment = require("moment");

export class Main {
    Services: IService[] = []; // Beinhaltet alle Services die registriert wurden

    /**
     * Initialisiert den Bootstrapper des Clients
     */
    constructor() {
        console.log("Telegram Service Subscriber - Uelzen Bot");

        if(Main.CheckConfiguration()) {
            // Allgemeine Zeitung - Uelzen
            if(Configuration.Services.AZ_Online.Enabled) {
                this.RegisterService(new AZ_Online());
            }

            // Feuerwehr Uelzen - Einsätze
            if(Configuration.Services.FF_UE_Einsatzberichte.Enabled) {
                this.RegisterService(new Einsatzberichte());
            }

            // Uelzen-TV
            if(Configuration.Services.UelzenTV.Enabled) {
                this.RegisterService(new UelzenTV());
            }
            this.Initial_Load();
        } else {
            console.error(" ! ! ! Die Konfigurationsdatei der Services ist nicht korrekt! (Evtl. Konfigurationsfehler?)");
        }
    }

    /**
     * Überprüft die Konfiguration auf bestehende Fehler
     * @constructor
     */
    private static CheckConfiguration() {
        let CheckPassed: boolean = true;

        if(Configuration.Telegram.Enabled) {
            if(Configuration.Telegram.BotToken.length == 0) {
                CheckPassed = false;
            }
        }

        if(Configuration.Discord.Enabled) {
            if(Configuration.Discord.WebHook.length == 0) {
                CheckPassed = false;
            }
        }

        return CheckPassed;
    }

    /**
     * Lädt den Bootstrapper initial nach der Service-Registrierung
     * @constructor
     */
    private Initial_Load() {
        this.LoadServiceDataStorage();
    }

    /**
     * Registriert einen neuen Service des Typen "IService"
     * @param Service IService
     * @constructor
     */
    private RegisterService(Service: IService) {
        this.Services.push(Service);
    }

    /**
     * Fragt alle Services nach Aktualisierungen ab
     * @constructor
     */
    public UpdateServices() {
        console.info("Neuer Abfragezyklus: " + Moment().toLocaleString());
        for (let i = 0; i < this.Services.length; i++) {
            this.Services[i].UpdateServiceTick();
            console.info(" - Service: " + this.Services[i].name + " wird aktualisiert ("+this.Services[i].GetUpdatedMessages()+")");
            this.Services[i].ClearUpdatedMessages();
        }
        console.info(" | Abfragezyklus beendet")
    }

    /**
     * Lädt den ServiceData-Cache aller Services zur Duplettenvermeidung
     * @constructor
     */
    public LoadServiceDataStorage() {
        console.info("Lade DataStorage: " + Moment().toLocaleString());
        for (let i = 0; i < this.Services.length; i++) {
            this.Services[i].store.LoadPersist();
            console.info(" ! Service: " + this.Services[i].name + " wird geladen");
        }
    }

    /**
     * Speichert den ServiceData-Cache aller Services zur Duplettenvermeidung
     * @constructor
     */
    public SaveServiceDataStorage() {
        console.info("Speichere DataStorage: " + Moment().toLocaleString());
        for (let i = 0; i < this.Services.length; i++) {
            this.Services[i].store.SavePersist();
            console.info(" ! Service: " + this.Services[i].name + " wird gespeichert");
        }
    }
}

let MainService = new Main();

// Start Service Updater
setTimeout(function () {
    MainService.UpdateServices();
    setInterval(function () {
        MainService.UpdateServices();
        MainService.SaveServiceDataStorage();
    }, Configuration.General.UpdateInterval);
}, 2000);
