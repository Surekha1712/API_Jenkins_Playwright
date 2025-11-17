// features/step_definitions/carts_step.js
const { When, Then } = require('@cucumber/cucumber');   // <-- add this

When('I send a GET request to retrieve all carts', async function () {
  this.response = await global.apiContext.get('/carts');
});

When('I send a GET request to retrieve cart with id {int}', async function (id) {
  this.response = await global.apiContext.get(`/carts/${id}`);
});

// optional short print for carts
Then('I print only first {int} carts', async function (count) {
  const body = await this.response.json();
  const slice = Array.isArray(body) ? body.slice(0, count) : [body];
  console.log(`🛒 Showing ${slice.length}${Array.isArray(body) ? ` of ${body.length}` : ''} carts:`);
  console.log(JSON.stringify(slice, null, 2));
});
