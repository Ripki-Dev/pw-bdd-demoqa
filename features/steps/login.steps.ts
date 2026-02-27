import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { RegisterPage } from '../../pages/register.page';

const { Given, When, Then } = createBdd();

const VALID_USER = 'testuser';
const VALID_PASS = 'Testing@123';

// ============================
// BACKGROUND
// ============================

Given('user navigates to Login page', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
});

// ============================
// CRITICAL - VALID LOGIN
// ============================

When('user submits valid login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.fillLogin(VALID_USER, VALID_PASS);
  await login.clickLogin();
});

Then('user should be logged in successfully', async ({ page }) => {
  await expect(
    page.getByText(`User Name : ${VALID_USER}`, { exact: false })
  ).toBeVisible();
});

// ============================
// CRITICAL - INVALID PASSWORD
// ============================

When('user submits invalid password', async ({ page }) => {
  const login = new LoginPage(page);

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Invalid username or password');
    await dialog.accept();
  });

  await login.fillLogin(VALID_USER, 'wrongpassword');
  await login.clickLogin();
});

// ============================
// CRITICAL - UNREGISTERED USER
// ============================

When('user submits unregistered username', async ({ page }) => {
  const login = new LoginPage(page);

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Invalid username or password');
    await dialog.accept();
  });

  await login.fillLogin('unknown_user', VALID_PASS);
  await login.clickLogin();
});

Then('user should see invalid credential alert', async () => {
  // Assertion already handled inside dialog listener
});

// ============================
// HIGH - EMPTY USERNAME
// ============================

When('user submits empty username', async ({ page }) => {
  const register = new RegisterPage(page);

  await register.goto(); // ✅ IMPORTANT

  await register.fillForm({
    firstName: 'Rifky',
    lastName: 'QA',
    userName: '',
    password: 'Testing@123',
  });

  await register.clickRegister();
});

// ============================
// HIGH - EMPTY PASSWORD
// ============================

When('user submits empty password', async ({ page }) => {
  const login = new LoginPage(page);
  await login.fillLogin(VALID_USER, '');
  await login.clickLogin();
});

// ============================
// HIGH - EMPTY FORM
// ============================

When('user submits empty login form', async ({ page }) => {
  const login = new LoginPage(page);
  await login.clickLogin();
});

Then('user should see login required field validation', async ({ page }) => {
  const usernameField = page.getByRole('textbox', { name: 'UserName' });
  const passwordField = page.getByRole('textbox', { name: 'Password' });

  if (await usernameField.inputValue() === '') {
    const message = await usernameField.evaluate(
      el => (el as HTMLInputElement).validationMessage
    );
    expect(message.length).toBeGreaterThan(0);
  }

  if (await passwordField.inputValue() === '') {
    const message = await passwordField.evaluate(
      el => (el as HTMLInputElement).validationMessage
    );
    expect(message.length).toBeGreaterThan(0);
  }
});

// ============================
// MEDIUM - PASSWORD MASKED
// ============================

Then('password field should be masked', async ({ page }) => {
  const type = await page
    .getByRole('textbox', { name: 'Password' })
    .getAttribute('type');

  expect(type).toBe('password');
});

// ============================
// MEDIUM - SUBMIT USING ENTER
// ============================

When('user submits valid login using Enter key', async ({ page }) => {
  const login = new LoginPage(page);

  await login.fillLogin(VALID_USER, VALID_PASS);
  await page.keyboard.press('Enter');
});

// ============================
// LOW - NAVIGATE TO REGISTER
// ============================

When('user clicks New User', async ({ page }) => {
  const login = new LoginPage(page);
  await login.clickNewUser();
});

Then('user should navigate to Register page', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});

// ============================
// LOW - LOGOUT FLOW
// ============================

Given('user is logged in', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.fillLogin(VALID_USER, VALID_PASS);
  await login.clickLogin();
});

When('user clicks Logout', async ({ page }) => {
  const login = new LoginPage(page);
  await login.clickLogout();
});

Then('user should navigate to Login page', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});