"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AZ_Online_1 = require("./Services/AZ-Online/AZ-Online");
var Einsatzberichte_1 = require("./Services/Feuerwehr-Uelzen/Einsatzberichte");
var Moment = require("moment");
var Main = /** @class */ (function () {
    function Main() {
        this.Services = [];
        console.log("Telegram Service Subscriber - Uelzen Bot");
        this.RegisterService(new AZ_Online_1.AZ_Online());
        this.RegisterService(new Einsatzberichte_1.Einsatzberichte());
    }
    Main.prototype.RegisterService = function (Service) {
        this.Services.push(Service);
    };
    Main.prototype.UpdateServices = function () {
        console.info("Neuer Abfragezyklus: " + Moment().toLocaleString());
        for (var i = 0; i < this.Services.length; i++) {
            console.info(" - Service: " + this.Services[i].name + " wird aktualisiert");
            this.Services[i].UpdateServiceTick();
        }
    };
    return Main;
}());
exports.Main = Main;
var MainService = new Main();
setInterval(function () {
    MainService.UpdateServices();
}, 2000);
