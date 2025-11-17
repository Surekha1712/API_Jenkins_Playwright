const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I send a GET request to retrieve user with id {int}', async function (id) {
  console.log(`Getting user details for ID: ${id}`);
  this.response = await global.apiContext.get(`/users/${id}`);
});

Then('I print the user details', async function () {
  const body = await this.response.json();
  console.log("User Details:", JSON.stringify(body, null, 2)); // Pretty print single user
});
