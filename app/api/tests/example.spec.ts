// app/api/test.ts

import { test, expect } from '@playwright/test';


test('scrape', async ({ page }) => {
    await page.goto('https://www.findwholesalelenders.com/lenders-listing-page');
  
    // const elementsText = await page.$$eval('.card-job-category-text', elements => elements.map(element => element.innerText));
    // const lender = await page.$$eval('.title h6-size card-job-featured', elements => elements.map(element => element.innerText));
  });