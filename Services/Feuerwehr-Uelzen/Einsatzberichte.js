"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Einsatzberichte = /** @class */ (function () {
    function Einsatzberichte() {
        this.name = "Feuerwehr Uelzen";
        this.current_count = 0;
    }
    Einsatzberichte.prototype.AddUpdatedMessage = function () {
        this.current_count += 1;
    };
    Einsatzberichte.prototype.ClearUpdatedMessages = function () {
        this.current_count = 0;
    };
    Einsatzberichte.prototype.GetUpdatedMessages = function () {
        return this.current_count;
    };
    Einsatzberichte.prototype.UpdateServiceTick = function () {
        // https://feuerwehr-uelzen.de/einsaetze/feed/
    };
    return Einsatzberichte;
}());
exports.Einsatzberichte = Einsatzberichte;
