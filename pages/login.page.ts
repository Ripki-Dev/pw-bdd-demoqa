import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Book Store Application' }).click();
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async fillLogin(username?: string, password?: string) {
    if (username !== undefined)
      await this.page.getByRole('textbox', { name: 'UserName' }).fill(username);

    if (password !== undefined)
      await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async clickNewUser() {
    await this.page.getByRole('button', { name: 'New User' }).click();
  }

  async clickLogout() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }

  async expectLoginSuccess(username: string) {
    await expect(
      this.page.getByText(`User Name : ${username}`, { exact: false }),
    ).toBeVisible();
  }
}