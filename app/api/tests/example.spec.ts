import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test('fill form', async ({  }) => {
    const browser = await chromium.launch({ headless: false });
  
    // Create a new browser context
    const context = await browser.newContext();
  
    // Create a new page within the context
    const page = await context.newPage();
  
    // Navigate to the URL of the page containing the form
    await page.goto('https://domusnow.com/dashboard/loan-application');
  
    // Wait for the iframe to be available
    await page.waitForSelector('iframe');

    // Get the iframe element
    const iframeElement = await page.$('iframe');

    // Connect to the iframe
    const iframe = await iframeElement.contentFrame();

    // Now you can interact with elements inside the iframe
    await iframe.fill('textarea#fillable-field--1-3', 'Ivory Tang');
  
  
    // Close the browser
    await browser.close();
});

