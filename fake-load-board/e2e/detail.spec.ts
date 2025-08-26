import { test, expect } from "@playwright/test";

test.describe("Load Detail Page", () => {
  test("should display all required labels in definition list format", async ({ page }) => {
    // Navigate to first load detail page
    await page.goto("/load/LOAD-2025-001");

    // Check page has proper load title
    await expect(page).toHaveTitle(/Load:/);

    // Verify the posting article with data-source attribute
    const posting = page.locator("article.posting[data-source='dummy']");
    await expect(posting).toBeAttached();

    // Check that we have a definition list (dl)
    const definitionList = posting.locator("dl");
    await expect(definitionList).toBeAttached();

    // Required labels to check for in the definition list
    const requiredLabels = [
      "Origin",
      "Destination", 
      "Pickup",
      "Delivery",
      "Equipment",
      "Weight",
      "Rate",
      "Broker Name",
    ];

    // Check each required label exists as a dt (definition term)
    for (const label of requiredLabels) {
      const dtElement = definitionList.locator(`dt:has-text("${label}")`);
      await expect(dtElement).toBeAttached();
      
      // Also verify the corresponding dd (definition description) exists
      const ddElement = dtElement.locator("+ dd, ~ dd").first();
      await expect(ddElement).toBeAttached();
    }

    // Check optional fields that may exist
    const optionalLabels = [
      "Distance",
      "Reference", 
      "Broker Phone",
      "Broker Email",
      "MC Number",
      "Notes",
    ];

    for (const label of optionalLabels) {
      const dtElement = definitionList.locator(`dt:has-text("${label}")`);
      const isPresent = await dtElement.count() > 0;
      
      if (isPresent) {
        // If the label exists, verify it has corresponding data
        const ddElement = dtElement.locator("+ dd, ~ dd").first();
        await expect(ddElement).toBeAttached();
      }
    }
  });

  test("should include JSON-LD structured data", async ({ page }) => {
    await page.goto("/load/LOAD-2025-001");

    // Check for JSON-LD script tag
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();

    // Verify JSON-LD contains expected schema.org structure
    const jsonLdContent = await jsonLdScript.textContent();
    expect(jsonLdContent).toBeTruthy();
    
    const jsonLd = JSON.parse(jsonLdContent!);
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("JobPosting");
    expect(jsonLd.identifier).toBeTruthy();
    expect(jsonLd.title).toBeTruthy();
    expect(jsonLd.hiringOrganization).toBeTruthy();
    expect(jsonLd.baseSalary).toBeTruthy();
  });

  test("should have working back button", async ({ page }) => {
    await page.goto("/load/LOAD-2025-001");

    // Click back button
    await page.click("text=Back to Load Board");

    // Should return to board page
    await expect(page).toHaveURL("/board");
  });

  test("should handle non-existent load IDs", async ({ page }) => {
    // Try to navigate to a non-existent load
    await page.goto("/load/NON-EXISTENT-ID");

    // Should show 404 page
    await expect(page.locator("h1")).toContainText("404");
  });
});