import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage correctly', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/SlavkoKernel/);
    
    // Check that the main heading is visible
    const heading = page.getByRole('heading', { name: /SlavkoKernel/i });
    await expect(heading).toBeVisible();
    
    // Check that the navigation menu is visible
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
  });
  
  test('should navigate to different sections', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Click on the "Features" link
    await page.getByRole('link', { name: /Features/i }).click();
    
    // Check that the URL contains the features section
    await expect(page).toHaveURL(/#features/);
    
    // Click on the "Pricing" link
    await page.getByRole('link', { name: /Pricing/i }).click();
    
    // Check that the URL contains the pricing section
    await expect(page).toHaveURL(/#pricing/);
  });
});

test.describe('Authentication', () => {
  test('should show login form', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');
    
    // Check that the login form is visible
    const loginForm = page.getByRole('form');
    await expect(loginForm).toBeVisible();
    
    // Check that the email and password fields are visible
    const emailField = page.getByLabel(/Email/i);
    const passwordField = page.getByLabel(/Password/i);
    
    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();
    
    // Check that the login button is visible
    const loginButton = page.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeVisible();
  });
  
  test('should show validation errors for invalid input', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');
    
    // Submit the form without entering any data
    await page.getByRole('button', { name: /Log in/i }).click();
    
    // Check that validation errors are shown
    const errorMessages = page.getByText(/required|invalid/i);
    await expect(errorMessages).toBeVisible();
  });
});

test.describe('Translation Suggestions', () => {
  test('should require authentication for suggestions page', async ({ page }) => {
    // Navigate to the suggestions page
    await page.goto('/suggestions');
    
    // Check that we're redirected to the login page
    await expect(page).toHaveURL(/login/);
  });
});