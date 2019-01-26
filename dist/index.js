"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gettext = require("gettext-parser");
var operators_1 = require("rxjs/operators");
var TranslatePoHttpLoader = (function () {
    function TranslatePoHttpLoader(_http, _prefix, _suffix) {
        if (_prefix === void 0) { _prefix = 'i18n'; }
        if (_suffix === void 0) { _suffix = '.po'; }
        this._http = _http;
        this._prefix = _prefix;
        this._suffix = _suffix;
        this.domain = '';
    }
    TranslatePoHttpLoader.prototype.getTranslation = function (lang) {
        var _this = this;
        return this._http
            .get(this._prefix + "/" + lang + this._suffix, { responseType: 'text' })
            .pipe(operators_1.map(function (contents) { return _this.parse(contents); }));
    };
    TranslatePoHttpLoader.prototype.parse = function (contents) {
        var _this = this;
        var translations = {};
        var po = gettext.po.parse(contents, 'utf-8');
        if (!po.translations.hasOwnProperty(this.domain)) {
            return translations;
        }
        Object.keys(po.translations[this.domain])
            .forEach(function (key) {
            var translation = po.translations[_this.domain][key].msgstr.pop();
            if (key.length > 0 && translation.length > 0) {
                translations[key] = translation;
            }
        });
        return translations;
    };
    return TranslatePoHttpLoader;
}());
exports.TranslatePoHttpLoader = TranslatePoHttpLoader;
//# sourceMappingURL=index.js.map