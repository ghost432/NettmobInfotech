import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

const apiKey = "918778ac-ad44-4e43-9684-6313a12c4160:fx";
const apiUrl = apiKey.endsWith(':fx') ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate';

async function translateText(text: string, targetLang: string): Promise<string> {
    const payloadData = JSON.stringify({
        text: [text],
        target_lang: targetLang.toUpperCase() === 'EN' ? 'EN-US' : targetLang.toUpperCase(),
        source_lang: 'FR'
    });

    const parsedUrl = new URL(apiUrl);
    const reqOptions = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname,
        method: 'POST',
        family: 4,
        headers: {
            'Authorization': `DeepL-Auth-Key ${apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payloadData)
        }
    };

    return new Promise((resolve, reject) => {
        const request = https.request(reqOptions, (resObj) => {
            let responseData = "";
            resObj.on("data", chunk => responseData += chunk);
            resObj.on("end", () => {
                if (resObj.statusCode && resObj.statusCode >= 400) {
                    reject(new Error(`DeepL API Error (${resObj.statusCode}): ${responseData}`));
                } else {
                    try {
                        const data = JSON.parse(responseData);
                        resolve(data.translations[0].text);
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        });
        request.on("error", reject);
        request.write(payloadData);
        request.end();
    });
}

async function translateObject(obj: any, targetLang: string): Promise<any> {
    if (typeof obj === 'string') {
        // Skip tags like {{current}} or {{count}}
        if (obj.includes('{{')) return obj;
        try {
            return await translateText(obj, targetLang);
        } catch (e) {
            console.error("Failed translating string:", obj, e);
            return obj;
        }
    }
    if (Array.isArray(obj)) {
        return Promise.all(obj.map(item => translateObject(item, targetLang)));
    }
    if (typeof obj === 'object' && obj !== null) {
        const translated: any = {};
        for (const key of Object.keys(obj)) {
            translated[key] = await translateObject(obj[key], targetLang);
        }
        return translated;
    }
    return obj;
}

async function main() {
    const localesPath = path.join(__dirname, 'src/locales');
    const frData = JSON.parse(fs.readFileSync(path.join(localesPath, 'fr.json'), 'utf-8'));

    // Add allArticles to all files
    const updateAllArticles = (langFile: string, text: string) => {
        const p = path.join(localesPath, langFile);
        const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
        if (!data.home.blog.allArticles) {
            data.home.blog.allArticles = text;
            fs.writeFileSync(p, JSON.stringify(data, null, 4));
            console.log(`Added home.blog.allArticles to ${langFile}`);
        }
    };
    updateAllArticles('fr.json', "Voir tous les articles");
    updateAllArticles('en.json', "View all articles");

    const targets = ['es', 'de'];
    const keysToTranslate = ['quote'];

    for (const lang of targets) {
        console.log(`\nTranslating missing keys to ${lang.toUpperCase()}...`);
        const p = path.join(localesPath, `${lang}.json`);
        const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
        let modified = false;

        // Add allArticles translated
        if (!data.home.blog.allArticles) {
            data.home.blog.allArticles = await translateText("Voir tous les articles", lang);
            modified = true;
            console.log(`Translated home.blog.allArticles for ${lang}`);
        }

        for (const key of keysToTranslate) {
            if (!data[key] && frData[key]) {
                console.log(`Translating section '${key}'...`);
                data[key] = await translateObject(frData[key], lang);
                modified = true;
            } else {
                console.log(`Section '${key}' already exists in ${lang}, skipping.`);
            }
        }

        if (modified) {
            fs.writeFileSync(p, JSON.stringify(data, null, 4));
            console.log(`Saved translations for ${lang}.json`);
        }
    }
}

main().catch(console.error);
