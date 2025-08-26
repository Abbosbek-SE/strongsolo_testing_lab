import { test, expect } from "@playwright/test";

test.describe("Load Board", () => {
  test("should display load postings with proper extraction-friendly markup", async ({ page }) => {
    await page.goto("/board");

    // Check page title and structure
    await expect(page).toHaveTitle(/Load Board/);
    await expect(page.locator("h1")).toContainText("Load Board");

    // Check that we have posting articles with data-source attribute
    const postings = page.locator("article.posting[data-source='dummy']");
    await expect(postings).toHaveCount(10); // First page should show 10 items

    // Verify each posting has the required labels
    const firstPosting = postings.first();
    
    // Check for Origin (should be visible text or screen reader text)
    await expect(
      firstPosting.locator(":has-text('Origin'), .sr-only:has-text('Origin')")
    ).toBeAttached();
    
    // Check for Destination (should be visible text or screen reader text)
    await expect(
      firstPosting.locator(":has-text('Destination'), .sr-only:has-text('Destination')")
    ).toBeAttached();
    
    // Check for Pickup (should be visible text or screen reader text)
    await expect(
      firstPosting.locator(":has-text('Pickup'), .sr-only:has-text('Pickup')")
    ).toBeAttached();
    
    // Check for Equipment badge
    await expect(firstPosting.locator("[data-testid='equipment'], .badge")).toBeAttached();
    
    // Check for Rate (should be visible text or screen reader text)
    await expect(
      firstPosting.locator(":has-text('Rate'), .sr-only:has-text('Rate')")
    ).toBeAttached();
    
    // Check for Broker Name (should be visible text or screen reader text)  
    await expect(
      firstPosting.locator(":has-text('Broker Name'), .sr-only:has-text('Broker Name')")
    ).toBeAttached();
  });

  test("should navigate to load detail when clicking on a posting", async ({ page }) => {
    await page.goto("/board");

    // Click on the first posting
    const firstPosting = page.locator("article.posting").first();
    await firstPosting.click();

    // Should navigate to load detail page
    await expect(page).toHaveURL(/\/load\/LOAD-2025-\d+/);
  });

  test("should filter loads by equipment type", async ({ page }) => {
    await page.goto("/board");

    // Select Reefer from equipment dropdown
    await page.selectOption("select[name='equipment'], #equipment", "Reefer");

    // Wait for URL to update (debounced)
    await page.waitForURL(/equipment=Reefer/);

    // Verify only Reefer loads are shown
    const postings = page.locator("article.posting");
    const postingCount = await postings.count();
    expect(postingCount).toBeGreaterThanOrEqual(1);
    
    // Check that all visible postings have Reefer badge
    const equipmentBadges = page.locator("article.posting").locator(":has-text('Reefer')");
    await expect(equipmentBadges).toHaveCount(postingCount);
  });
});