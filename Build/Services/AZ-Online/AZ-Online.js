"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../../Interfaces/Messages/Message");
var All_1 = require("../../Helper/Messenger/All");
var ServiceDataStore_1 = require("../../Helper/ServiceDataStore");
// Require statements
var Configuration = require("../../Configuration");
var FeedParser = require("feedparser");
var Moment = require("Moment");
var request = require("request");
var JSDOM = require("jsdom").JSDOM;
var AZ_Online = /** @class */ (function () {
    function AZ_Online() {
        this.name = "AZ Online";
        this.store = new ServiceDataStore_1.ServiceDataStore(this.name);
        this.current_count = 0;
        this._request = request;
    }
    AZ_Online.prototype.AddUpdatedMessage = function () {
        this.current_count += 1;
    };
    AZ_Online.prototype.GetUpdatedMessages = function () {
        return this.current_count;
    };
    AZ_Online.prototype.ClearUpdatedMessages = function () {
        this.current_count = 0;
    };
    AZ_Online.prototype.UpdateServiceTick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                that = this;
                this._request(Configuration.Services.AZ_Online.ServiceFeedUrl).pipe(new FeedParser()).on('readable', function () {
                    var stream = this, Post;
                    var _loop_1 = function () {
                        var NewMessage = new Message_1.Message();
                        NewMessage.setCreationTime(Moment(Post.pubdate).toDate());
                        NewMessage.setTitle(Post.title);
                        NewMessage.setMessage(Post.description);
                        NewMessage.setWebLinkUrl(Post.link);
                        NewMessage.setContentOwner("AZ-Online");
                        //console.log(that.store.IsStored(NewMessage));
                        if (!that.store.IsStored(NewMessage)) {
                            console.info(" * " + that.name + ": " + NewMessage.getTitle());
                            that.store.Store(NewMessage);
                            that.AddUpdatedMessage();
                            JSDOM.fromURL(NewMessage.getWebLinkUrl()).then(function (dom) {
                                try {
                                    var image = dom.window.document.querySelector("img");
                                    if (dom.window.document.querySelector("img")) {
                                        NewMessage.setImageUrl(image.src);
                                        All_1.AllMessageSplitter.SplitMessage(NewMessage);
                                    }
                                }
                                catch (e) {
                                    console.error(e);
                                }
                            });
                        }
                    };
                    while (Post = stream.read()) {
                        _loop_1();
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return AZ_Online;
}());
exports.AZ_Online = AZ_Online;
//# sourceMappingURL=AZ-Online.js.map