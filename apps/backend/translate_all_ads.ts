import { DatabaseService } from "./src/services/DatabaseService";
import * as https from "https";

function httpsGet(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(url, { family: 4 }, (res) => { // Force IPv4
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on("error", reject);
    });
}

async function translateText(text: string, targetLang: string) {
    if (!text) return "";
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const data = await httpsGet(url);

        if (data && data[0]) {
            return data[0].map((segment: any) => segment[0]).join('');
        }
        return "";
    } catch (err) {
        console.error(`Error translating to ${targetLang}:`, err);
        return "";
    }
}

async function run() {
    const db = new DatabaseService();
    console.log("Fetching ads...");
    const ads = await db.query("SELECT * FROM ads");

    for (const ad of ads) {
        console.log(`Translating ad ID ${ad.id}: ${ad.title}`);

        let updateQuery = "UPDATE ads SET ";
        let updateParams: any[] = [];

        for (const lang of ['en', 'es', 'de']) {
            if (!ad[`title_${lang}`]) {
                const translatedTitle = await translateText(ad.title, lang);
                updateQuery += `title_${lang} = ?, `;
                updateParams.push(translatedTitle);
            }
            if (ad.description && !ad[`description_${lang}`]) {
                const translatedDesc = await translateText(ad.description, lang);
                updateQuery += `description_${lang} = ?, `;
                updateParams.push(translatedDesc);
            }
            if (ad.buttonText && !ad[`buttonText_${lang}`]) {
                const translatedBtn = await translateText(ad.buttonText, lang);
                updateQuery += `buttonText_${lang} = ?, `;
                updateParams.push(translatedBtn);
            }
        }

        if (updateParams.length > 0) {
            updateQuery = updateQuery.slice(0, -2); // remove last comma and space
            updateQuery += " WHERE id = ?";
            updateParams.push(ad.id);

            await db.query(updateQuery, updateParams);
            console.log(`Updated ad ID ${ad.id} with translations.`);
        } else {
            console.log(`Ad ID ${ad.id} already translated.`);
        }
    }

    console.log("Translation complete!");
    process.exit(0);
}

run().catch(console.error);
