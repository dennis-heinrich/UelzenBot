"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../Interfaces/Messages/Message");
var FS = require('fs');
var Moment = require("moment");
var ServiceDataStore = /** @class */ (function () {
    function ServiceDataStore(Name) {
        this.Name = "default";
        this.MessageStore = [];
        this.SetName(Name);
    }
    ServiceDataStore.prototype.SetName = function (Name) {
        this.Name = Name;
    };
    ServiceDataStore.prototype.GetName = function () {
        return this.Name;
    };
    ServiceDataStore.prototype.Store = function (Message) {
        this.MessageStore.push(Message);
    };
    ServiceDataStore.prototype.IsStored = function (Message) {
        var Stored = false;
        for (var i = 0; i < this.MessageStore.length; i++) {
            if (this.MessageStore[i].getTitle() === Message.getTitle()) {
                Stored = true;
            }
        }
        return Stored;
    };
    ServiceDataStore.prototype.SavePersist = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var Path = __dirname + "/../Data/Store/" + _this.GetName() + ".json";
            FS.writeFile(Path, JSON.stringify(_this.MessageStore), 'utf8', function (err) {
                if (err) {
                    console.log(" ! * ! Fehler beim schreiben des Data-Stores ! * !");
                    return console.log(err);
                }
            });
        });
    };
    ServiceDataStore.prototype.LoadPersist = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var that = _this;
            var Path = __dirname + "/../Data/Store/" + _this.GetName() + ".json";
            if (FS.existsSync(Path)) {
                FS.readFile(Path, 'utf8', function (err, Data) {
                    if (err) {
                        console.log(" ! * ! Fehler beim lesen des Data-Stores ! * !");
                        return console.log(err);
                    }
                    var Object = JSON.parse(Data);
                    for (var i = 0; i < Object.length; i++) {
                        var NMessage = new Message_1.Message();
                        NMessage.setTitle(Object[i].title);
                        NMessage.setImageUrl(Object[i].image_url);
                        NMessage.setMessage(Object[i].message);
                        NMessage.setWebLinkUrl(Object[i].link);
                        NMessage.setContentOwner(Object[i].content_owner);
                        NMessage.setCreationTime(Moment(Object[i].date_time));
                        that.MessageStore.push(NMessage);
                    }
                });
            }
        });
    };
    return ServiceDataStore;
}());
exports.ServiceDataStore = ServiceDataStore;
//# sourceMappingURL=ServiceDataStore.js.map