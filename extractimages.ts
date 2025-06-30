import { chromium } from 'playwright';

async function extract_images() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.pinterest.com/search/pins/?q=ui%20design');
    await page.waitForTimeout(3000); // optional delay

    // Get all <img> tags as outer HTML strings
    const imgTags = await page.$$eval('img', imgs =>
        imgs.map(img => img.outerHTML)
    );

    console.log(imgTags); // prints an array of <img> tag HTML strings

    await browser.close();
}

main();
