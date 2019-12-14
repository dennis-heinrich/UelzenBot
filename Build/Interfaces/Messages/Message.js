"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Moment = require("moment");
require("moment/locale/de");
var Message = /** @class */ (function () {
    function Message() {
        Moment().locale("de");
    }
    Message.prototype.BuildMessage = function () {
        return Message.BuildMessageMarkdown(this);
    };
    Message.BuildMessageMarkdown = function (NMessage) {
        if (NMessage.getTitle()) {
            if (NMessage.getContentOwner()) {
                if (NMessage.getWebLinkUrl()) {
                    if (NMessage.getMessage() == "") {
                        return "*" + NMessage.getContentOwner() + "*\n[" + NMessage.getTitle() + "](" + NMessage.getWebLinkUrl() + ")\nVom: _" + Moment(NMessage.getCreationTime()).format('lll') + "_";
                    }
                    else {
                        return "*" + NMessage.getContentOwner() + "*\n[" + NMessage.getTitle() + "](" + NMessage.getWebLinkUrl() + ")\n" + Message.EscapeText(NMessage.getMessage()) + "\nVom: _" + Moment(NMessage.getCreationTime()).format('lll') + "_";
                    }
                }
                else {
                    return "*" + NMessage.getContentOwner() + "*\n*" + NMessage.getTitle() + "*\n" + Message.EscapeText(NMessage.getMessage());
                }
            }
            else {
                return "*" + NMessage.getTitle() + "*\n" + Message.EscapeText(NMessage.getMessage());
            }
        }
        else {
            return "*" + Message.EscapeText(NMessage.getMessage()) + "*";
        }
    };
    Message.prototype.getContentOwner = function () {
        return this.content_owner;
    };
    Message.prototype.getCreationTime = function () {
        return this.date_time;
    };
    Message.prototype.getImageUrl = function () {
        return this.image_url;
    };
    Message.prototype.getMessage = function () {
        return this.message;
    };
    Message.EscapeText = function (Message) {
        return Message
            .replace("_", "\\_")
            .replace("*", "\\*")
            .replace("[", "\\[")
            .replace("`", "\\`");
    };
    Message.prototype.getTitle = function () {
        return this.title;
    };
    Message.prototype.getWebLinkUrl = function () {
        return this.link;
    };
    Message.prototype.setContentOwner = function (Owner) {
        this.content_owner = Owner;
    };
    Message.prototype.setCreationTime = function (Datetime) {
        this.date_time = Datetime;
    };
    Message.prototype.setImageUrl = function (Url) {
        this.image_url = Url;
    };
    Message.prototype.setMessage = function (Message) {
        this.message = Message;
    };
    Message.prototype.setTitle = function (Title) {
        this.title = Title;
    };
    Message.prototype.setWebLinkUrl = function (Url) {
        this.link = Url;
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=Message.js.map