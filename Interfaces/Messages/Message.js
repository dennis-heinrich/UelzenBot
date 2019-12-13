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
                    return NMessage.getContentOwner() + " | *[" + NMessage.getTitle() + "](" + NMessage.getWebLinkUrl() + ") *\n" + NMessage.getMessage();
                }
                else {
                    return NMessage.getContentOwner() + " | *" + NMessage.getTitle() + "*\n" + NMessage.getMessage();
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
    Message.CreateStaticMessage = function (NMessage) {
        var TelegramC = new Telegram("1012885395:AAGb798lkuGY5hfPXkH0LMxZDa-DxGzNryE");
        if (NMessage.getImageUrl() !== null) {
            TelegramC.sendPhoto(-1001266018619, NMessage.getImageUrl(), { caption: Message.BuildMessageMarkdown(NMessage), parse_mode: "Markdown" }).then(function (r) { return console.log(r); });
        }
        else {
            TelegramC.sendMessage(-1001266018619, Message.BuildMessageMarkdown(NMessage), { parse_mode: "Markdown" }).then(function (r) { return console.log(r); });
        }
        console.info("Neue Nachricht erstellt: Telegram");
    };
    return Message;
}());
exports.Message = Message;
