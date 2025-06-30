import { chromium } from 'playwright';

export async function extract_images(url: string) {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);
    await page.waitForTimeout(3000); // optional delay

    // Get all <img> tags as outer HTML strings
    const imgTags = await page.$$eval('img', imgs =>
        imgs.map(img => img.outerHTML)
    );

    await browser.close();

    return imgTags;
}