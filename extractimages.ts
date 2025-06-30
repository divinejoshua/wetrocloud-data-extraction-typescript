import { chromium } from 'playwright';

export async function extract_images(url: string) {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);
    await page.waitForTimeout(3000); // optional delay

    // Select all <img> tags inside the <div data-test-id="max-width-container">
    const imgTags = await page.$$eval(
        'div[data-test-id="max-width-container"] img',
        // @ts-ignore
        imgs => imgs.map(img => img.src)
    );

    console.log(imgTags);
    await browser.close();

    return imgTags;
}