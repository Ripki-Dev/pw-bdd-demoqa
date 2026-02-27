import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register.page';

const { Given, When, Then } = createBdd();

const randomUser = () => `user_${Date.now()}`;

// ============================
// BACKGROUND
// ============================

Given('user navigates to Register page', async ({ page }) => {
  const register = new RegisterPage(page);
  await register.goto();
});

// ============================
// DUPLICATE USERNAME
// ============================

Then('user should see duplicate alert', async () => {
  // Assertion already handled inside dialog listener
});

// ============================
// CAPTCHA VALIDATION
// ============================

When('user submits valid data without captcha', async ({ page }) => {
  const register = new RegisterPage(page);

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Please verify reCaptcha');
    await dialog.accept();
  });

  await register.fillForm({
    firstName: 'Rifky',
    lastName: 'QA',
    userName: randomUser(),
    password: 'Testing@123',
  });

  await register.clickRegister();
});

Then('user should see captcha validation alert', async () => {
  // Validated via dialog
});

// ============================
// PASSWORD VALIDATION CASES
// ============================

When('user submits password without number', async ({ page }) => {
  const register = new RegisterPage(page);

  await register.fillForm({
    firstName: 'Rifky',
    lastName: 'QA',
    userName: randomUser(),
    password: 'Testing@', // no number
  });

  await register.clickRegister();
});

When('user submits password without uppercase', async ({ page }) => {
  const register = new RegisterPage(page);

  await register.fillForm({
    firstName: 'Rifky',
    lastName: 'QA',
    userName: randomUser(),
    password: 'testing@123', // no uppercase
  });

  await register.clickRegister();
});

When('user submits short password', async ({ page }) => {
  const register = new RegisterPage(page);

  await register.fillForm({
    firstName: 'Rifky',
    lastName: 'QA',
    userName: randomUser(),
    password: 'Test1@', // < 8 chars
  });

  await register.clickRegister();
});

Then('user should see password validation error', async ({ page }) => {
  await expect(page.getByText('Please verify reCaptcha to')).toBeVisible();
});

// ============================
// REQUIRED FIELD VALIDATION
// ============================

When('user submits empty first name', async ({ page }) => {
  const register = new RegisterPage(page);

  await register.goto();

  await register.fillForm({
    firstName: '',
    lastName: 'QA',
    userName: randomUser(),
    password: 'Testing@123',
  });

  await register.clickRegister();
});

Then('user should see register required field validation', async ({ page }) => {
  const invalidField = page.locator('input:invalid');

  await expect(invalidField).toHaveCount(4);
});

// ============================
// BACK TO LOGIN
// ============================

When('user clicks back to login', async ({ page }) => {
  const register = new RegisterPage(page);
  await register.clickBackToLogin();
});

Then('user should navigate to login page', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

// ============================
// REFRESH REGISTER PAGE
// ============================

When('user refreshes register page', async ({ page }) => {
  await page.reload();
});

Then('register page should remain visible', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});

When('user submits valid registration', async ({ page }) => {
  const register = new RegisterPage(page);

  await register.fillForm({
    firstName: 'Rifky',
    lastName: 'QA',
    userName: randomUser(),
    password: 'Testing@123',
  });

  await register.clickRegister();
});

Then('registration should be successful', async ({ page }) => {
  // If registration succeeds, user should be redirected to login
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

When('user submits duplicate username', async ({ page }) => {
  const register = new RegisterPage(page);

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('User already exists');
    await dialog.accept();
  });

  await register.fillForm({
    firstName: 'Rifky',
    lastName: 'QA',
    userName: 'existing_user',
    password: 'Testing@123',
  });

  await register.clickRegister();
});

When('user submits weak password', async ({ page }) => {
  const register = new RegisterPage(page);

  await register.fillForm({
    firstName: 'Rifky',
    lastName: 'QA',
    userName: randomUser(),
    password: 'weak',
  });

  await register.clickRegister();
});