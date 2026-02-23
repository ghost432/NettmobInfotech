import * as https from "https";

const apiKey = "918778ac-ad44-4e43-9684-6313a12c4160:fx";
const targetLangUpper = "EN-US";
const text = "Bonjour";

const apiUrl = apiKey.endsWith(':fx')
    ? 'https://api-free.deepl.com/v2/translate'
    : 'https://api.deepl.com/v2/translate';

const payloadData = JSON.stringify({
    text: [text],
    target_lang: targetLangUpper,
    source_lang: 'FR'
});

const parsedUrl = new URL(apiUrl);

const reqOptions = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.pathname,
    method: 'POST',
    family: 4, // force IPv4 to avoid ETIMEDOUT bugs
    headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payloadData)
    }
};

new Promise<any>((resolve, reject) => {
    const request = https.request(reqOptions, (resObj) => {
        let responseData = "";
        resObj.on("data", chunk => responseData += chunk);
        resObj.on("end", () => {
            console.log("Status Code:", resObj.statusCode);
            console.log("Response Body:", responseData);
            if (resObj.statusCode && resObj.statusCode >= 400) {
                reject(new Error(`DeepL API Error (${resObj.statusCode}): ${responseData}`));
            } else {
                try {
                    resolve(JSON.parse(responseData));
                } catch (e) {
                    reject(e);
                }
            }
        });
    });
    request.on("error", reject);
    request.write(payloadData);
    request.end();
}).then(console.log).catch(console.error);
