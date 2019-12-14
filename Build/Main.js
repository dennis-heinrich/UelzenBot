"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AZ_Online_1 = require("./Services/AZ-Online/AZ-Online");
var Einsatzberichte_1 = require("./Services/Feuerwehr-Uelzen/Einsatzberichte");
// Require constants
var Configuration = require("./Configuration");
var Moment = require("moment");
var Main = /** @class */ (function () {
    function Main() {
        this.Services = [];
        console.log("Telegram Service Subscriber - Uelzen Bot");
        // Allgemeine Zeitung - Uelzen
        if (Configuration.Services.AZ_Online.Enabled) {
            this.RegisterService(new AZ_Online_1.AZ_Online());
        }
        // Feuerwehr Uelzen - Einsätze
        if (Configuration.Services.FF_UE_Einsatzberichte.Enabled) {
            this.RegisterService(new Einsatzberichte_1.Einsatzberichte());
        }
    }
    Main.prototype.RegisterService = function (Service) {
        this.Services.push(Service);
    };
    Main.prototype.UpdateServices = function () {
        console.info("Neuer Abfragezyklus: " + Moment().toLocaleString());
        for (var i = 0; i < this.Services.length; i++) {
            this.Services[i].UpdateServiceTick();
            console.info(" - Service: " + this.Services[i].name + " wird aktualisiert (" + this.Services[i].GetUpdatedMessages() + ")");
            this.Services[i].ClearUpdatedMessages();
        }
        console.info(" | Abfragezyklus beendet");
    };
    return Main;
}());
exports.Main = Main;
var MainService = new Main();
// Start Service Updater
setTimeout(function () {
    MainService.UpdateServices();
    setInterval(function () {
        MainService.UpdateServices();
    }, Configuration.General.UpdateInterval);
}, 2000);
//# sourceMappingURL=Main.js.map