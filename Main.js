"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AZ_Online_1 = require("./Services/AZ-Online/AZ-Online");
var Main = /** @class */ (function () {
    function Main() {
        this.Services = [];
        console.log("Telegram Service Subscriber - Uelzen Bot");
        this.RegisterService(new AZ_Online_1.AZ_Online());
    }
    Main.prototype.RegisterService = function (Service) {
        this.Services.push(Service);
    };
    Main.prototype.UpdateServices = function () {
        for (var i = 0; i < this.Services.length; i++) {
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
