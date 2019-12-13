"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Telegram = require('telegraf/telegram');
var Message = /** @class */ (function () {
    function Message() {
    }
    Message.prototype.BuildMessage = function () {
        return Message.BuildMessageMarkdown(this);
    };
    Message.BuildMessageMarkdown = function (NMessage) {
        if (NMessage.getTitle()) {
            if (NMessage.getContentOwner()) {
                if (NMessage.getWebLinkUrl()) {
                    return "*" + NMessage.getContentOwner() + "*\n[" + NMessage.getTitle() + "](" + NMessage.getWebLinkUrl() + ")\n" + NMessage.getMessage();
                }
                else {
                    return "*" + NMessage.getContentOwner() + "*\n*" + NMessage.getTitle() + "*\n" + NMessage.getMessage();
                }
            }
            else {
                return "*" + NMessage.getTitle() + "*\n" + NMessage.getMessage();
            }
        }
        else {
            return "*" + NMessage.getMessage() + "*";
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
