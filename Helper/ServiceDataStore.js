"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return ServiceDataStore;
}());
exports.ServiceDataStore = ServiceDataStore;
