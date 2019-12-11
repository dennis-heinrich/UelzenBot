"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message() {
    }
    Message.prototype.getMessage = function () {
        // Prevent to show links without credit the page owner
        if (this.content_owner === null) {
            return "<b>" + this.title + "</b>\n" + this.message;
        }
        else {
            if (this.link !== null) {
                return '*AZ-Online* | [' + this.title + '](' + this.link + ') | ' + this.message;
            }
            else {
            }
        }
        return "";
    };
    Message.prototype.addContentOwner = function (name) {
        this.content_owner = name;
    };
    return Message;
}());
exports.Message = Message;
