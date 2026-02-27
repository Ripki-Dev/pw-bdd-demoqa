import { createBdd } from 'playwright-bdd';
import { BookStorePage } from '../../pages/BookStorePage';

const { Given, When, Then } = createBdd();

let bookStorePage: BookStorePage;

Given('user is on Book Store page', async ({ page }) => {
  bookStorePage = new BookStorePage(page);
  await bookStorePage.navigate();
});

When('user searches book with keyword {string}', async ({}, keyword: string) => {
  await bookStorePage.search(keyword.trim());
});

When('user clears search input', async () => {
  await bookStorePage.clearSearch();
});

Then('user should see book titled {string}', async ({}, title: string) => {
  await bookStorePage.expectBookVisible(title);
});

Then('user should see related books containing {string}', async ({}, keyword: string) => {
  await bookStorePage.expectRelatedBooks(keyword);
});

Then('user should see books written by {string}', async ({}, author: string) => {
  await bookStorePage.expectBooksByAuthor(author);
});

Then('user should see no search results', async () => {
  await bookStorePage.expectNoResults();
});

Then('user should see all available books', async () => {
  await bookStorePage.expectAllBooksVisible();
});