import { Page, expect } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Book Store Application' }).click();
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.getByRole('button', { name: 'New User' }).click();
  }

  async fillForm(data: {
    firstName?: string;
    lastName?: string;
    userName?: string;
    password?: string;
  }) {
    if (data.firstName !== undefined)
      await this.page.getByRole('textbox', { name: 'First Name' }).fill(data.firstName);

    if (data.lastName !== undefined)
      await this.page.getByRole('textbox', { name: 'Last Name' }).fill(data.lastName);

    if (data.userName !== undefined)
      await this.page.getByRole('textbox', { name: 'UserName' }).fill(data.userName);

    if (data.password !== undefined)
      await this.page.getByRole('textbox', { name: 'Password' }).fill(data.password);
  }

  async clickRegister() {
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async clickBackToLogin() {
    await this.page.getByRole('button', { name: 'Back to Login' }).click();
  }

  async expectPasswordValidation() {
    await expect(this.page.getByText('Please verify reCaptcha to')).toBeVisible();
  }
}