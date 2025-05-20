import { test, expect } from '@playwright/test';

test('Delete a position as a seller', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('button', { name: 'Seller' }).click();
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