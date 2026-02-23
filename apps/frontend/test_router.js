import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Visit english about page
    await page.goto('http://localhost:5173/en/a-propos', {waitUntil: 'networkidle2'});
    const enHtml = await page.evaluate(() => document.body.innerHTML);
    const hasAbout = enHtml.includes('about.title') || enHtml.includes('Notre Mission') || enHtml.includes('Our Mission');
    const isEnNotFound = enHtml.includes('Page Non Trouvée') || enHtml.includes('Page Not Found');
    
    // Visit invalid lang prefix
    await page.goto('http://localhost:5173/n/a-propos', {waitUntil: 'networkidle2'});
    const nHtml = await page.evaluate(() => document.body.innerHTML);
    const hasHome = nHtml.includes('NettmobInfotech lo acompaña') || nHtml.includes('NettmobInfotech vous accompagne') || nHtml.includes('NettmobInfotech begleitet Sie');
    const isNNotFound = nHtml.includes('Page Non Trouvée') || nHtml.includes('Page Not Found');
    
    console.log("English About Page rendered About Component:", hasAbout, "Rendered NotFound:", isEnNotFound);
    console.log("Invalid n/a-propos rendered Home:", hasHome, "Rendered NotFound:", isNNotFound);
    
    await browser.close();
})();
