import { elementIds } from "@/tools/constants/test/element-ids";
import { Page } from "playwright";
import { expect } from "playwright/test";

export async function selectOptionById(page: Page, selectId: string, optionId: string) {
    const select = page.getByTestId(selectId);
    await select.click();
    const option = page.getByTestId(`${selectId}-${optionId}`);
    await option.click();

    await page.mouse.click(0, 0);
}

export async function setInputValue(page: Page, inputId: string, value: string) {
    const input = page.locator(`#${inputId}`);
    await input.fill(value);
}

export async function expectElementCountInProductList(page: Page, count: number) {
    await expect(
        page.getByTestId(elementIds.productList).locator(`[data-testid=${elementIds.productCard}]`),
    ).toHaveCount(count);
}

export async function expectElementCountInPagination(page: Page, count: number) {
    await expect(
        page
            .getByTestId(elementIds.productPagination)
            .locator(`[data-testid=${elementIds.productPaginationItem}]`),
    ).toHaveCount(count + 2); // +2 for "Previous" and "Next" buttons
}

export async function goToThePageByNumber(page: Page, pageNumber: number) {
    const pageItem = page.locator(`#page-${pageNumber}`);

    await pageItem.click();
}

export async function clearFilters(page: Page) {
    const clearButton = page.getByTestId(elementIds.filterResetButton);
    if (await clearButton.isVisible()) {
        await clearButton.click();
    }
}

export async function applyFilters(page: Page) {
    const applyButton = page.getByTestId(elementIds.filterApplyButton);
    if (await applyButton.isVisible()) {
        await applyButton.click();
    }
}
