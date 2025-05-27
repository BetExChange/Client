import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto(`/login`);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Seller' }).click();
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

test('View product details', async ({ page }) => {
  await page.getByRole('row', { name: 'Product D 325994746 Brand 4' }).getByRole('button').click();
  await expect(page.locator('#root')).toContainText('Product Details');
  await expect(page.locator('#root')).toContainText('Name');
  await expect(page.locator('#root')).toContainText('Barcode');
  await expect(page.locator('#root')).toContainText('Brand');
  await expect(page.locator('#root')).toContainText('Description');
  await expect(page.locator('#root')).toContainText('Prices');
  await expect(page.locator('#root')).toContainText('Marketplace Price');
  await expect(page.locator('#root')).toContainText('Total Inventory');
  await expect(page.locator('#root')).toContainText('Available');
  await expect(page.locator('#root')).toContainText('Positions');
  await expect(page.getByRole('button', { name: 'Add Position' })).toBeVisible();
  await expect(page.locator('thead')).toContainText('Pieces');
  await expect(page.locator('thead')).toContainText('Price');
  await expect(page.locator('thead')).toContainText('Expiration');
  await expect(page.locator('#root')).toContainText('Exchange Activity');
  await expect(page.locator('#root')).toContainText('From (date)');
  await expect(page.getByRole('textbox', { name: 'Select date' }).first()).toBeVisible();
  await expect(page.locator('#root')).toContainText('To (date)');
  await expect(page.getByRole('textbox', { name: 'Select date' }).nth(1)).toBeVisible();
  await expect(page.locator('#root')).toContainText('Last price matched');
  await expect(page.locator('#root')).toContainText('Minimum bid price');
  await expect(page.locator('#root')).toContainText('Market depth (pieces)');
  await expect(page.locator('#root')).toContainText('Current Market State');
  await expect(page.getByText('7.5 €4011.22 €3012 €71.95 €')).toBeVisible();
});

test('Create a position for a product', async ({ page }) => {
  await page.getByRole('row', { name: 'Product D 325994746 Brand 4' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Add Position' }).click();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Add positionMin Price€' }).nth(1)).toBeVisible();
  await expect(page.locator('form')).toContainText('Min Price');
  await expect(page.locator('form')).toContainText('Pieces');
  await expect(page.locator('form')).toContainText('Expiration');
  await page.getByRole('spinbutton', { name: '* Min Price :' }).click();
  await page.getByRole('spinbutton', { name: '* Min Price :' }).fill('20');
  await page.getByRole('spinbutton', { name: '* Min Price :' }).press('Enter');
  await page.getByRole('spinbutton', { name: '* Min Price :' }).press('Enter');
  await page.getByRole('spinbutton', { name: '* Min Price :' }).press('Tab');
  await page.getByRole('spinbutton', { name: '* Pieces :' }).fill('38');
  await page.getByRole('textbox', { name: '* Expiration :' }).click();
  await page.getByText('Today').click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByTitle('-08-30').locator('div').click();
  await page.getByRole('button', { name: 'OK' }).click();
  const successMessage = page.getByText('Position added successfully');
  await expect(successMessage).toBeVisible();
  await expect(page.locator('#root')).toContainText('38');
  await expect(page.locator('#root')).toContainText('20€');
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().slice(-2)}`;
  await expect(page.locator('#root')).toContainText(formattedDate);
  // await expect(page.locator('#root')).toContainText('30/8/25');
  await page.getByRole('button', { name: 'Add Position' }).click();
  await page.getByRole('spinbutton', { name: '* Min Price :' }).click();
  await page.getByRole('spinbutton', { name: '* Min Price :' }).fill('-5');
  await page.getByRole('spinbutton', { name: '* Min Price :' }).press('Enter');
  await page.getByRole('spinbutton', { name: '* Pieces :' }).click();
  await page.getByRole('spinbutton', { name: '* Pieces :' }).fill('0');
  await page.getByRole('spinbutton', { name: '* Pieces :' }).press('Enter');
  await page.getByRole('textbox', { name: '* Expiration :' }).click();
  await page.getByText('Today').click();
  await page.getByRole('button', { name: 'OK' }).click();
  const failureMessage = page.getByText('Failed to add position');
  await expect(failureMessage).toBeVisible();
  await page.getByRole('button', { name: 'Add Position' }).click();
  await page.getByRole('spinbutton', { name: '* Min Price :' }).click();
  await page.getByRole('spinbutton', { name: '* Min Price :' }).press('ArrowLeft');
  await page.getByRole('spinbutton', { name: '* Min Price :' }).fill('100');
  await page.getByRole('spinbutton', { name: '* Pieces :' }).click();
  await page.getByRole('spinbutton', { name: '* Pieces :' }).fill('2');
  await page.getByRole('spinbutton', { name: '* Pieces :' }).press('Enter');
  // await page.getByRole('textbox', { name: '* Expiration :' }).click();
  // await page.getByRole('button', { name: 'Previous month (PageUp)' }).click();
  // await page.getByRole('button', { name: 'Previous month (PageUp)' }).click();
  // await page.getByTitle('-03-01').locator('div').click();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format parts
  const yyyy = yesterday.getFullYear();
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const dd = String(yesterday.getDate()).padStart(2, '0');

  // Click the date picker to open the calendar
  await page.getByRole('textbox', { name: '* Expiration :' }).click();

  // If month is different, use getByTitle
  if (yesterday.getMonth() !== today.getMonth()) {
    // Format: '-MM-DD', e.g. '-03-01'
    const title = `-${mm}-${dd}`;
    await page.getByTitle(title).locator('div').click();
  } else {
    // Use exact text (day number)
    await page.getByText(dd.replace(/^0/, ''), { exact: true }).click();
  }

  await page.getByRole('button', { name: 'OK' }).click();
  await expect(failureMessage.nth(1)).toBeVisible();
});

test('Match an existing offer for a product', async ({ page }) => {
  await page.getByRole('row', { name: 'Product D 325994746 Brand 4' }).getByRole('button').click();
  await expect(page.getByRole('button', { name: '12 €' })).toBeVisible();
  await page.getByRole('button', { name: '12 €' }).click();
  await expect(page.getByRole('dialog').locator('div').filter({ hasText: 'Add positionMin Price€' }).nth(1)).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: '* Min Price :' })).toHaveValue('12');
  await expect(page.getByRole('spinbutton', { name: '* Pieces :' })).toHaveValue('7');
  await page.getByRole('textbox', { name: '* Expiration :' }).click();
  await page.getByText('Today').click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByRole('button', { name: 'Next month (PageDown)' }).click();
  // await page.getByTitle('-08-30').locator('div').click();
  await page.getByRole('button', { name: 'OK' }).click();
  const successMessage = page.getByText('Position added successfully');
  await expect(successMessage).toBeVisible();
  await page.getByRole('img', { name: 'bell' }).locator('svg').click();
  await page.getByText('Your position for product Product D has been matched!').click();
  await page.getByRole('img', { name: 'user' }).locator('svg').hover();
  await expect(page.getByRole('menuitem', { name: 'Balance: 126.5 €' })).toBeVisible();
});

test('Delete a position for a product', async ({ page }) => {
  await page.getByRole('row', { name: 'Product D 325994746 Brand 4' }).getByRole('button').click();
  await expect(page.getByRole('row', { name: '6.75€ 3/12/25 Delete' }).getByRole('button')).toBeVisible();
  await page.getByRole('row', { name: '6.75€ 3/12/25 Delete' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Yes' }).click();
  const successMessage = page.getByText('Position deleted successfully!');
  await expect(successMessage).toBeVisible();
  await expect(page.getByRole('row', { name: '6.75€ 3/12/25 Delete' }).getByRole('button')).not.toBeVisible();
});