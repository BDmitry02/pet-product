import { elementIds } from "@/tools/constants/test/element-ids";
import { test, expect } from "@playwright/test";
import {
    applyFilters,
    clearFilters,
    expectElementCountInPagination,
    expectElementCountInProductList,
    goToThePageByNumber,
    selectOptionById,
    setInputValue,
} from "@test/test.funcs";
import { filterTags } from "@/tools/constants/filters/tags";
import { subscriptionFilters } from "@/tools/constants/filters/subscription";

const baseUrl = "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await clearFilters(page);
});

// 1. WHEN I visit the product collection page I expect to see filters sidebar, a table of products, 12 products in a table, and products pagination

test("Product collection page: sidebar, table, 12 products, pagination", async ({ page }) => {
    // Sidebar
    await expect(page.getByTestId(elementIds.filterSidebar)).toBeVisible();
    // Table

    await expect(page.getByTestId(elementIds.productList)).toBeVisible();
    // 12 products
    await expectElementCountInProductList(page, 12);
    // Pagination
    await expect(page.getByTestId(elementIds.productPagination)).toBeVisible();
});

// 2. WHEN I search for "Dog" in filters sidebar, THEN 11 products

test("Product collection page: filter by tag 'Dog' shows 11 products", async ({ page }) => {
    // Select Dog tag
    await selectOptionById(page, elementIds.filterTagsSelection, filterTags.Dog);

    // Apply filter
    await applyFilters(page);

    // 11 products
    await expectElementCountInProductList(page, 11);
});

// 3. WHEN I filter by Price "30" in the sidebar, THEN 1 product

test("Product collection page: filter by price '30' shows 1 product", async ({ page }) => {
    // Fill price input with 30
    await setInputValue(page, elementIds.filterPriceInput, "30");

    // Apply filter
    await applyFilters(page);

    // 1 product
    await expectElementCountInProductList(page, 1);
});

// 4. WHEN I filter by Subscription 'Yes' and search for 'Cat', THEN 5 products

test("Product collection page: filter by subscription 'Yes' and tag 'Cat' shows 5 products", async ({
    page,
}) => {
    // Sidebar for Subscription
    await selectOptionById(page, elementIds.filterSubscriptionSelection, subscriptionFilters.true);

    // Sidebar for Tags
    await selectOptionById(page, elementIds.filterTagsSelection, filterTags.Cat);

    // Apply filter
    await applyFilters(page);

    // 5 products
    await expectElementCountInProductList(page, 5);
});

// 5. WHEN I type 5 in Items per page input, THEN I expect to see 5 products and 3 pages in pagination

test("Product collection page: set items per page to 5 shows 5 products and 3 pages in pagination", async ({
    page,
}) => {
    // Set items per page to 5
    await setInputValue(page, elementIds.filterItemsPerPageSelection, "5");

    // Apply filter
    await applyFilters(page);

    // 5 products
    await expectElementCountInProductList(page, 5);

    // Check pagination items
    await expectElementCountInPagination(page, 3);
});

// 6. WHEN I type 10 in Items per page input, THEN I expect to see 10 products and 2 pages in pagination and 2 items in next page

test("Product collection page: set items per page to 10 shows 10 products on the first page and two on the second", async ({
    page,
}) => {
    // Set items per page to 10
    await setInputValue(page, elementIds.filterItemsPerPageSelection, "10");

    // Apply filter
    await applyFilters(page);

    // 10 products
    await expectElementCountInProductList(page, 10);

    // Check pagination items
    await expectElementCountInPagination(page, 2);

    //Go to next page
    await goToThePageByNumber(page, 2);

    // Check pagination items
    await expectElementCountInPagination(page, 2);
});
