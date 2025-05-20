import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Buyer' }).click();
});

test('Searching for product a', async ({ page }) => {
  await expect(page.locator('html')).toMatchAriaSnapshot(`
    - document:
      - banner:
        - heading "Bet Exchange" [level=3]
        - img "bell"
        - text: buyer123
        - img "user"
      - searchbox "Search for products..."
      - button "Search"
      - heading "Product A" [level=3]
      - separator
      - img "Product A"
      - separator
      - button /\\d+\\.\\d+ €/
      - superscript: 3 4
      - button "9.1 €"
      - superscript: 8 9
      - button "more":
        - img "more"
      - heading "Product B" [level=3]
      - separator
      - img "Product B"
      - separator
      - button /\\d+\\.\\d+ €/
      - superscript: 1 2
      - button /\\d+\\.\\d+ €/
      - superscript: 9 5
      - button "more":
        - img "more"
      - heading "Product C" [level=3]
      - separator
      - img "Product C"
      - separator
      - button "Create an offer"
      - heading "Product D" [level=3]
      - separator
      - img "Product D"
      - separator
      - button /\\d+\\.\\d+ €/
      - superscript: 1 7
      - button /\\d+\\.\\d+ €/
      - superscript: 9 9
      - button "more":
        - img "more"
    `);
  await page.getByRole('searchbox', { name: 'Search for products...' }).click();
  await page.getByRole('searchbox', { name: 'Search for products...' }).fill('a');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('html')).toMatchAriaSnapshot(`
    - document:
      - banner:
        - heading "Bet Exchange" [level=3]
        - img "bell"
        - text: buyer123
        - img "user"
      - searchbox "Search for products..."
      - button "Search"
      - heading "Product A" [level=3]
      - separator
      - img "Product A"
      - separator
      - button /\\d+\\.\\d+ €/
      - superscript: 3 4
      - button "9.1 €"
      - superscript: 8 9
      - button "more":
        - img "more"
    `);
  await page.getByRole('searchbox', { name: 'Search for products...' }).click();
  await page.getByRole('searchbox', { name: 'Search for products...' }).fill('');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('html')).toMatchAriaSnapshot(`
    - document:
      - banner:
        - heading "Bet Exchange" [level=3]
        - img "bell"
        - text: buyer123
        - img "user"
      - searchbox "Search for products..."
      - button "Search"
      - heading "Product A" [level=3]
      - separator
      - img "Product A"
      - separator
      - button /\\d+\\.\\d+ €/
      - superscript: 3 4
      - button "9.1 €"
      - superscript: 8 9
      - button "more":
        - img "more"
      - heading "Product B" [level=3]
      - separator
      - img "Product B"
      - separator
      - button /\\d+\\.\\d+ €/
      - superscript: 1 2
      - button /\\d+\\.\\d+ €/
      - superscript: 9 5
      - button "more":
        - img "more"
      - heading "Product C" [level=3]
      - separator
      - img "Product C"
      - separator
      - button "Create an offer"
      - heading "Product D" [level=3]
      - separator
      - img "Product D"
      - separator
      - button /\\d+\\.\\d+ €/
      - superscript: 1 7
      - button /\\d+\\.\\d+ €/
      - superscript: 9 9
      - button "more":
        - img "more"
    `);
});

test('Matching an existing position', async ({ page }) => {
  await page.getByRole('button', { name: '1.25 €' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '1.25 €' }).click();
  await page.getByRole('textbox', { name: '* Duration Until' }).click();
  await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  await page.getByTitle('-07-04').click();
  await page.getByRole('combobox', { name: '* Payment Method' }).click();
  await page.getByTitle('Card A').locator('div').click();
  await page.getByRole('combobox', { name: '* Location' }).click();
  await page.getByTitle('Store').locator('div').click();
  await page.getByRole('button', { name: 'Place Offer' }).click();
  await page.getByRole('dialog').getByRole('button', { name: '2.75 €' }).press('Escape');
  await page.getByRole('img', { name: 'bell' }).locator('svg').click();
  await page.getByText('Your offer for product:').click();
});