import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await expect(page.getByRole('searchbox', { name: 'Search Wikipedia' })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('playwright');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('#firstHeading')).toContainText('Playwright');
});