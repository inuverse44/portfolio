import { test, expect } from '@playwright/test';

test.describe('Smoke Test', () => {
  test('Top page loads and has correct title', async ({ page }) => {
    await page.goto('/');
    // Update expected title to match actual site title
    await expect(page).toHaveTitle(/Inuverse Sci\. X Tech\. Blog/);
    
    // Check if hero section exists
    await expect(page.locator('h2', { hasText: 'Hello' })).toBeVisible();
  });

  test('Blog page shows posts', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { name: 'All Posts' })).toBeVisible();
    
    // Check if at least one article is listed
    await expect(page.locator('article').first()).toBeVisible();
  });

  test('Navigation works (Desktop)', async ({ page, isMobile }) => {
    if (isMobile) return; // Skip on mobile for now as it requires menu interaction
    
    await page.goto('/');
    
    // Click 'blog' link in nav
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'blog' }).click();
    
    await expect(page).toHaveURL(/\/blog/);
  });
});
