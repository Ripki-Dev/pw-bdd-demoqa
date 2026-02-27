import { Page, Locator, expect } from '@playwright/test';

export class BookStorePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly bookRows: Locator;
  readonly bookTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Type to search' });
    this.bookRows = page.locator('table tbody tr');
    this.bookTitles = page.locator('table tbody tr td:nth-child(2) a');
  }

  async navigate() {
    await this.page.goto('/books');
    await expect(this.searchInput).toBeVisible();
  }

  async search(keyword: string) {
    await this.searchInput.fill('');
    await this.searchInput.fill(keyword);
  }

  async clearSearch() {
  await this.searchInput.fill('');
  await this.searchInput.blur(); // trigger update
}

  async getBookCount() {
    return await this.bookRows.count();
  }

  async expectBookVisible(title: string) {
    await expect(
      this.page.getByRole('link', { name: title })
    ).toBeVisible();
  }

  async expectRelatedBooks(keyword: string) {
  await expect(this.bookTitles).toContainText(keyword, {
    ignoreCase: true,
  });
}

  async expectBooksByAuthor(author: string) {
  const authorCells = this.page.locator(
    'table tbody tr td:nth-child(3)'
  );

  await expect(authorCells).toContainText(author);
}

  async expectNoResults() {
    await expect(this.bookRows).toHaveCount(0);
  }

  async expectAllBooksVisible() {
    await expect(this.bookRows.first()).toBeVisible();
  }
}