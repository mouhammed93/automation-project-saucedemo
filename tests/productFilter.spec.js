import { test, expect } from '@playwright/test';
import * as data from '../data/testData.json';

test.describe('SauceDemo - Product Filter Project', () => {
    let page;

    // 1. Hook beforeAll: Connection avec l'utilisateur standard
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(data.url);
        await page.fill(data.selectors.userInput, data.user.username);
        await page.fill(data.selectors.passInput, data.user.password);
        await page.click(data.selectors.loginBtn);
        await page.waitForURL('**/inventory.html');
    });

    test.afterAll(async () => { await page.close(); });

    test('Step 2-8: Filtering Logic', async () => {
        // 2. Vérifier filtre par défaut "Name (A to Z)"
        await expect(page.locator(data.selectors.activeFilter)).toHaveText('Name (A to Z)');

        // 3. Changer le filtre à "Price (low to high)"
        await page.selectOption(data.selectors.filterLogo, data.values.lowToHigh);

        // 4. Vérifier tri croissant (Helper function for cleaner code)
        const getPrices = async () => {
            const list = await page.locator(data.selectors.itemPrice).allInnerTexts();
            return list.map(p => parseFloat(p.replace('$', '')));
        };

        const pricesLowHigh = await getPrices();
        for (let i = 0; i < pricesLowHigh.length - 1; i++) {
            expect(pricesLowHigh[i]).toBeLessThanOrEqual(pricesLowHigh[i + 1]);
        }

        // 5. Capturer une screenshot après le tri
        await page.screenshot({ path: 'screenshots/filter-low-high.png' });

        // 6. Changer le filtre à "Price (high to low)"
        await page.selectOption(data.selectors.filterLogo, data.values.highToLow);

        // 7. Vérifier que le premier produit est le plus cher (Max)
        const pricesHighLow = await getPrices();
        expect(pricesHighLow[0]).toBe(Math.max(...pricesHighLow));

        // 8. Vérifier que le dernier produit est le moins cher (Min)
        expect(pricesHighLow[pricesHighLow.length - 1]).toBe(Math.min(...pricesHighLow));
    });
});