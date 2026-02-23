"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var https = __importStar(require("https"));
var apiKey = "918778ac-ad44-4e43-9684-6313a12c4160:fx";
var apiUrl = apiKey.endsWith(':fx') ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate';
function translateText(text, targetLang) {
    return __awaiter(this, void 0, void 0, function () {
        var payloadData, parsedUrl, reqOptions;
        return __generator(this, function (_a) {
            payloadData = JSON.stringify({
                text: [text],
                target_lang: targetLang.toUpperCase() === 'EN' ? 'EN-US' : targetLang.toUpperCase(),
                source_lang: 'FR'
            });
            parsedUrl = new URL(apiUrl);
            reqOptions = {
                hostname: parsedUrl.hostname,
                path: parsedUrl.pathname,
                method: 'POST',
                family: 4,
                headers: {
                    'Authorization': "DeepL-Auth-Key ".concat(apiKey),
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payloadData)
                }
            };
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var request = https.request(reqOptions, function (resObj) {
                        var responseData = "";
                        resObj.on("data", function (chunk) { return responseData += chunk; });
                        resObj.on("end", function () {
                            if (resObj.statusCode && resObj.statusCode >= 400) {
                                reject(new Error("DeepL API Error (".concat(resObj.statusCode, "): ").concat(responseData)));
                            }
                            else {
                                try {
                                    var data = JSON.parse(responseData);
                                    resolve(data.translations[0].text);
                                }
                                catch (e) {
                                    reject(e);
                                }
                            }
                        });
                    });
                    request.on("error", reject);
                    request.write(payloadData);
                    request.end();
                })];
        });
    });
}
function translateObject(obj, targetLang) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, translated, _i, _a, key, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(typeof obj === 'string')) return [3 /*break*/, 4];
                    // Skip tags like {{current}} or {{count}}
                    if (obj.includes('{{'))
                        return [2 /*return*/, obj];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, translateText(obj, targetLang)];
                case 2: return [2 /*return*/, _d.sent()];
                case 3:
                    e_1 = _d.sent();
                    console.error("Failed translating string:", obj, e_1);
                    return [2 /*return*/, obj];
                case 4:
                    if (Array.isArray(obj)) {
                        return [2 /*return*/, Promise.all(obj.map(function (item) { return translateObject(item, targetLang); }))];
                    }
                    if (!(typeof obj === 'object' && obj !== null)) return [3 /*break*/, 9];
                    translated = {};
                    _i = 0, _a = Object.keys(obj);
                    _d.label = 5;
                case 5:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    key = _a[_i];
                    _b = translated;
                    _c = key;
                    return [4 /*yield*/, translateObject(obj[key], targetLang)];
                case 6:
                    _b[_c] = _d.sent();
                    _d.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/, translated];
                case 9: return [2 /*return*/, obj];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var localesPath, frData, updateAllArticles, targets, keysToTranslate, _i, targets_1, lang, p, data, modified, _a, _b, keysToTranslate_1, key, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    localesPath = path.join(__dirname, 'src/locales');
                    frData = JSON.parse(fs.readFileSync(path.join(localesPath, 'fr.json'), 'utf-8'));
                    updateAllArticles = function (langFile, text) {
                        var p = path.join(localesPath, langFile);
                        var data = JSON.parse(fs.readFileSync(p, 'utf-8'));
                        if (!data.home.blog.allArticles) {
                            data.home.blog.allArticles = text;
                            fs.writeFileSync(p, JSON.stringify(data, null, 4));
                            console.log("Added home.blog.allArticles to ".concat(langFile));
                        }
                    };
                    updateAllArticles('fr.json', "Voir tous les articles");
                    updateAllArticles('en.json', "View all articles");
                    targets = ['es', 'de'];
                    keysToTranslate = ['quote'];
                    _i = 0, targets_1 = targets;
                    _e.label = 1;
                case 1:
                    if (!(_i < targets_1.length)) return [3 /*break*/, 10];
                    lang = targets_1[_i];
                    console.log("\nTranslating missing keys to ".concat(lang.toUpperCase(), "..."));
                    p = path.join(localesPath, "".concat(lang, ".json"));
                    data = JSON.parse(fs.readFileSync(p, 'utf-8'));
                    modified = false;
                    if (!!data.home.blog.allArticles) return [3 /*break*/, 3];
                    _a = data.home.blog;
                    return [4 /*yield*/, translateText("Voir tous les articles", lang)];
                case 2:
                    _a.allArticles = _e.sent();
                    modified = true;
                    console.log("Translated home.blog.allArticles for ".concat(lang));
                    _e.label = 3;
                case 3:
                    _b = 0, keysToTranslate_1 = keysToTranslate;
                    _e.label = 4;
                case 4:
                    if (!(_b < keysToTranslate_1.length)) return [3 /*break*/, 8];
                    key = keysToTranslate_1[_b];
                    if (!(!data[key] && frData[key])) return [3 /*break*/, 6];
                    console.log("Translating section '".concat(key, "'..."));
                    _c = data;
                    _d = key;
                    return [4 /*yield*/, translateObject(frData[key], lang)];
                case 5:
                    _c[_d] = _e.sent();
                    modified = true;
                    return [3 /*break*/, 7];
                case 6:
                    console.log("Section '".concat(key, "' already exists in ").concat(lang, ", skipping."));
                    _e.label = 7;
                case 7:
                    _b++;
                    return [3 /*break*/, 4];
                case 8:
                    if (modified) {
                        fs.writeFileSync(p, JSON.stringify(data, null, 4));
                        console.log("Saved translations for ".concat(lang, ".json"));
                    }
                    _e.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
