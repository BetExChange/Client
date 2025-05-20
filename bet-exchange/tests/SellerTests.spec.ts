import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Seller' }).click();
});

test('View product details', async ({ page }) => {
  await expect(page.locator('html')).toMatchAriaSnapshot(`
    - document:
      - banner:
        - heading "Bet Exchange" [level=3]
        - img "bell"
        - text: seller456
        - img "user"
      - heading "Product Management" [level=1]
      - table:
        - rowgroup:
          - row "Name Barcode Brand Photo Edit":
            - columnheader "Name"
            - columnheader "Barcode"
            - columnheader "Brand"
            - columnheader "Photo"
            - columnheader "Edit"
        - rowgroup:
          - row /Product A \\d+ Brand 1 product eye Preview View Details/:
            - cell "Product A"
            - cell /\\d+/
            - cell "Brand 1"
            - cell "product eye Preview":
              - img "product"
              - img "eye"
            - cell "View Details":
              - button "View Details"
          - row /Product B \\d+ Brand 2 product eye Preview View Details/:
            - cell "Product B"
            - cell /\\d+/
            - cell "Brand 2"
            - cell "product eye Preview":
              - img "product"
              - img "eye"
            - cell "View Details":
              - button "View Details"
          - row /Product C \\d+ Brand 3 product eye Preview View Details/:
            - cell "Product C"
            - cell /\\d+/
            - cell "Brand 3"
            - cell "product eye Preview":
              - img "product"
              - img "eye"
            - cell "View Details":
              - button "View Details"
          - row /Product D \\d+ Brand 4 product eye Preview View Details/:
            - cell "Product D"
            - cell /\\d+/
            - cell "Brand 4"
            - cell "product eye Preview":
              - img "product"
              - img "eye"
            - cell "View Details":
              - button "View Details"
    `);
  await page.getByRole('row', { name: 'Product B 123454545 Brand 2' }).getByRole('button').click();
  await expect(page.locator('div').filter({ hasText: 'Product DetailsNameProduct' }).nth(2)).toBeVisible();
  await expect(page.locator('#root')).toContainText('Prices');
  await expect(page.locator('#root')).toContainText('Positions');
  await expect(page.locator('#root')).toContainText('Exchange Activity');
  await expect(page.locator('#root')).toContainText('Current Market State');
});

test('Create a position for a product', async ({ page }) => {
  await page.getByRole('row', { name: 'Product B 123454545 Brand 2' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Add Position' }).click();
  await page.getByRole('spinbutton', { name: '* Min Price :' }).click();
  await page.getByRole('spinbutton', { name: '* Min Price :' }).fill('100');
  await page.getByRole('spinbutton', { name: '* Pieces :' }).click();
  await page.getByRole('spinbutton', { name: '* Pieces :' }).fill('2');
  await page.getByRole('textbox', { name: '* Expiration :' }).click();
  await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  await page.getByTitle('-08-30').locator('div').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.locator('#root')).toContainText('2');
  await page.getByRole('cell', { name: '100€' }).click();
  await expect(page.locator('#root')).toContainText('100€');
  await expect(page.locator('#root')).toContainText('30/8/25');
  await expect(page.getByRole('row', { name: '100€ 30/8/25 Delete' }).getByRole('button')).toBeVisible();
});

test('Match an existing offer for a product', async ({ page }) => {
  await page.getByRole('row', { name: 'Product B 123454545 Brand 2' }).getByRole('button').click();
  await page.getByRole('button', { name: '12 €' }).click();
  await page.getByRole('textbox', { name: '* Expiration :' }).click();
  await page.getByRole('button', { name: 'Next month (PageDown)' }).dblclick();
  await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  await page.getByTitle('-08-30').locator('div').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('img', { name: 'bell' }).locator('svg').click();
  await page.getByText('Your position for product').click();
  await page.getByRole('img', { name: 'user' }).locator('svg').hover();
  await expect(page.getByRole('menu')).toContainText(/Balance:\s*(?:(?:8[5-9]|9\d|\d{3,})(?:\.\d+)?|84\.(?:[1-9]\d*))\s*€/);
});

test('Delete a position for a product', async ({ page }) => {
  await expect(page.getByRole('banner')).toContainText('seller456');
  await expect(page.locator('h1')).toContainText('Product Management');
  await expect(page.locator('tbody')).toContainText('Product D');
  await page.getByRole('row', { name: 'Product D 325994746 Brand 4' }).getByRole('button').click();
  await page.locator('html').click();
  await page.getByText('Product Details').click();
  await expect(page.locator('#root')).toContainText('Prices');
  await expect(page.locator('#root')).toContainText('Positions');
  await expect(page.locator('#root')).toContainText('Add Position');
  await expect(page.getByRole('cell', { name: '47', exact: true })).toBeVisible();
  await page.getByRole('row', { name: '5.6€ 8/12/25 Delete' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.getByRole('cell', { name: '47', exact: true })).not.toBeVisible();
});