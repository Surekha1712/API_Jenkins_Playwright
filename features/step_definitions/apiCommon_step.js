const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('the response status should be {int}', async function (expected) {
  const actual = this.response?.status();
  console.log(`✅ Status: ${actual}`);
  expect(actual).toBe(expected);
});

Then('I print the response', async function () {
  const body = await this.response.json();
  if (Array.isArray(body)) {
    const slice = body.slice(0, 2);
    console.log(`🧾 Showing ${slice.length} of ${body.length} items:`);
    console.log(JSON.stringify(slice, null, 2));
  } else {
    console.log('🧾 Response:', JSON.stringify(body, null, 2));
  }
});
