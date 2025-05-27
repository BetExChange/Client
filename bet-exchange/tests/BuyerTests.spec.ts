import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto(`/login`);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Buyer' }).click();
});

test.afterEach(async ({ page }) => {
  const userIcon = page.getByRole('img', { name: 'user' }).locator('svg');
  if (await userIcon.isVisible()) {
    try {
      await userIcon.hover();
      await page.getByText('Logout').click();
    } catch (e) {
      console.warn('Logout failed in afterEach:', e.message);
    }
  }
});

test('Searching for product a', async ({ page }) => {
  await expect(page.getByText('Product A1.25 €349.1 €')).toBeVisible();
  await expect(page.getByText('Product B1.75 €129.99 €')).toBeVisible();
  await expect(page.getByText('Product CCreate an offer')).toBeVisible();
  await expect(page.getByText('Product D1.95 €179.99 €')).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search for products...' }).click();
  await page.getByRole('searchbox', { name: 'Search for products...' }).fill('Product A');
  await page.getByRole('searchbox', { name: 'Search for products...' }).press('Enter');
  await expect(page.getByText('Product A1.25 €349.1 €')).toBeVisible();
  await expect(page.getByText('Product B1.75 €129.99 €')).not.toBeVisible();
  await expect(page.getByText('Product CCreate an offer')).not.toBeVisible();
  await expect(page.getByText('Product D1.95 €179.99 €')).not.toBeVisible();
  await page.getByRole('searchbox', { name: 'Search for products...' }).click();
  await page.getByRole('searchbox', { name: 'Search for products...' }).fill('');
  await page.getByRole('searchbox', { name: 'Search for products...' }).press('Enter');
  await expect(page.getByText('Product A1.25 €349.1 €')).toBeVisible();
  await expect(page.getByText('Product B1.75 €129.99 €')).toBeVisible();
  await expect(page.getByText('Product CCreate an offer')).toBeVisible();
  await expect(page.getByText('Product D1.95 €179.99 €')).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search for products...' }).click();
  await page.getByRole('searchbox', { name: 'Search for products...' }).fill('asfafsaf');
  await page.getByRole('searchbox', { name: 'Search for products...' }).press('Enter');
  await expect(page.locator('#root')).toContainText('No data');
});

test('Create an offer for a product', async ({ page }) => {
  await expect(page.getByText('Product CCreate an offer')).toBeVisible();
  await page.getByRole('button', { name: 'Create an offer' }).click();
  await expect(page.locator('div').filter({ hasText: /^Unit Price \(€\)$/ }).nth(2)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Quantity$/ }).nth(2)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Duration Until$/ }).nth(2)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Payment Method$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Location$/ })).toBeVisible();
  await page.getByRole('spinbutton', { name: '* Unit Price (€)' }).click();
  await page.getByRole('spinbutton', { name: '* Unit Price (€)' }).fill('10');
  await page.getByRole('spinbutton', { name: '* Unit Price (€)' }).press('Tab');
  await page.getByRole('spinbutton', { name: '* Quantity' }).fill('5');
  await page.getByRole('textbox', { name: '* Duration Until' }).click();
  await page.getByText('Today').click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByTitle('-08-30').locator('div').click();
  await page.getByRole('combobox', { name: '* Payment Method' }).click();
  await page.getByTitle('Card A').locator('div').click();
  await page.getByRole('combobox', { name: '* Location' }).click();
  await page.getByTitle('Store').click();
  await page.getByRole('button', { name: 'Place Offer' }).click();
  const successMessage = page.getByText('Offer added successfully');
  await expect(successMessage).toBeVisible();
  await page.getByRole('img', { name: 'user' }).locator('svg').hover();
  await expect(page.getByRole('menuitem', { name: 'Balance: 9950 €' })).toBeVisible();
  await page.getByRole('button', { name: 'Create an offer' }).click();
  // await page.getByRole('textbox', { name: '* Duration Until' }).click();
  // await page.getByRole('button', { name: 'Previous month (PageUp)' }).click();
  // await page.getByRole('button', { name: 'Previous month (PageUp)' }).click();
  // await page.getByRole('button', { name: 'Previous month (PageUp)' }).click();
  // await page.getByTitle('-03-01').locator('div').click();

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format parts
  const yyyy = yesterday.getFullYear();
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const dd = String(yesterday.getDate()).padStart(2, '0');

  // Click the date picker to open the calendar
  await page.getByRole('textbox', { name: '* Duration Until' }).click();

  // If month is different, use getByTitle
  if (yesterday.getMonth() !== today.getMonth()) {
    // Format: '-MM-DD', e.g. '-03-01'
    const title = `-${mm}-${dd}`;
    await page.getByTitle(title).locator('div').click();
  } else {
    // Use exact text (day number)
    await page.getByText(dd.replace(/^0/, ''), { exact: true }).click();
  }


  await page.getByRole('button', { name: 'Place Offer' }).click();
  const failureMessage = page.getByText('Failed to add offer');
  await expect(failureMessage).toBeVisible();
  await page.getByRole('button', { name: 'Create an offer' }).click();
  await page.getByRole('spinbutton', { name: '* Unit Price (€)' }).click();
  await page.getByRole('spinbutton', { name: '* Unit Price (€)' }).fill('-5');
  await page.getByRole('spinbutton', { name: '* Unit Price (€)' }).press('Enter');
  await expect(page.getByRole('spinbutton', { name: '* Unit Price (€)' })).toHaveValue('0');
  await page.getByRole('spinbutton', { name: '* Quantity' }).click();
  await page.getByRole('spinbutton', { name: '* Quantity' }).fill('0');
  await page.getByRole('spinbutton', { name: '* Quantity' }).press('Enter');
  await expect(page.getByRole('spinbutton', { name: '* Quantity' })).toHaveValue('1');
  await page.getByRole('button', { name: 'Place Offer' }).click();
  await expect(failureMessage.nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'Create an offer' }).click();
  await page.getByRole('spinbutton', { name: '* Unit Price (€)' }).click();
  await page.getByRole('spinbutton', { name: '* Unit Price (€)' }).fill('10000');
  await page.getByRole('spinbutton', { name: '* Quantity' }).click();
  await page.getByRole('spinbutton', { name: '* Quantity' }).fill('10');
  await page.getByRole('button', { name: 'Place Offer' }).click();
  await expect(failureMessage.nth(2)).toBeVisible();
});

test('Matching an existing position', async ({ page }) => {
  await expect(page.getByText('Product A1.25 €349.1 €')).toBeVisible();
  await page.getByRole('button', { name: '1.25 €' }).click();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Availability and' })).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: '1.25 €' }).click();
  await expect(page.getByRole('spinbutton', { name: '* Unit Price (€)' })).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: '* Unit Price (€)' })).toHaveValue('1.25');
  await expect(page.getByRole('spinbutton', { name: '* Quantity' })).toHaveValue('34');
  await page.getByRole('textbox', { name: '* Duration Until' }).click();
  await page.getByText('Today').click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByTitle('-08-30').locator('div').click();
  await page.getByRole('combobox', { name: '* Payment Method' }).click();
  await page.getByTitle('Card A').locator('div').click();
  await page.getByRole('combobox', { name: '* Location' }).click();
  await page.getByTitle('Store').locator('div').click();
  await page.getByRole('button', { name: 'Place Offer' }).click();
  const successMessage = page.getByText('Offer added successfully');
  await expect(successMessage).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: '2.75 €' }).press('Escape');
  await page.getByRole('img', { name: 'bell' }).locator('svg').click();
  await page.getByText('Your offer for product: Product A has been matched!').click();
  await page.getByRole('img', { name: 'user' }).locator('svg').hover();
  await expect(page.getByRole('menuitem', { name: 'Balance: 9907.5 €' })).toBeVisible();
});